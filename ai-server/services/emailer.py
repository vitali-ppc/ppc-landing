"""Email sender через Resend API.

Используется для:
- Welcome email при waitlist signup
- Weekly digest от Echo (Reporting Agent)
- Alerts при ошибках / срабатываниях

Без RESEND_API_KEY → mock-режим (только логируем, не шлём).
"""
from __future__ import annotations

import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

RESEND_API_BASE = "https://api.resend.com"
FROM_EMAIL = os.getenv("EMAIL_FROM", "B6 <noreply@kampaio.com>")

# Локальный архив отправленных писем (dev mock + история)
SENT_LOG = Path(__file__).resolve().parent.parent / "sent_emails.jsonl"


def is_configured() -> bool:
    """True если установлен реальный API key (не placeholder).

    Реальные Resend keys начинаются с `re_` и длиннее 20 символов.
    """
    key = os.getenv("RESEND_API_KEY", "").strip()
    if not key or len(key) < 20:
        return False
    if not key.startswith("re_"):
        return False
    if key.endswith("...") or "your_" in key or "placeholder" in key.lower():
        return False
    return True


async def send_email(
    to: str,
    subject: str,
    html: str,
    *,
    text: Optional[str] = None,
    tag: Optional[str] = None,
    attachments: Optional[list[dict]] = None,
) -> dict:
    """Отправить email через Resend (или log в mock-режиме).

    attachments format (Resend spec):
        [{"filename": "report.pdf", "content": "<base64>", "type": "application/pdf"}]

    Returns: {success, id?, mock?, message?}
    """
    payload = {
        "from": FROM_EMAIL,
        "to": [to],
        "subject": subject,
        "html": html,
    }
    if text:
        payload["text"] = text
    if tag:
        payload["tags"] = [{"name": "type", "value": tag}]
    if attachments:
        payload["attachments"] = attachments

    if not is_configured():
        # Mock: пишем в файл вместо реальной отправки
        return _mock_send(payload)
    api_key = os.getenv("RESEND_API_KEY")

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.post(
                f"{RESEND_API_BASE}/emails",
                json=payload,
                headers={"Authorization": f"Bearer {api_key}"},
            )
            if r.status_code >= 400:
                logger.error("Resend error %s: %s", r.status_code, r.text[:300])
                return {"success": False, "status": r.status_code, "message": r.text[:300]}
            data = r.json()
            _log_sent(payload, real_id=data.get("id"))
            logger.info("Email sent to %s (id=%s)", to, data.get("id"))
            return {"success": True, "id": data.get("id"), "mock": False}
    except Exception as e:
        logger.exception("Failed to send email to %s", to)
        return {"success": False, "message": str(e)}


def _mock_send(payload: dict) -> dict:
    _log_sent(payload, mock=True)
    logger.info("[MOCK] Email to %s: %s", payload["to"], payload["subject"])
    return {
        "success": True,
        "mock": True,
        "message": "RESEND_API_KEY not set → email logged to sent_emails.jsonl (dev mode)",
    }


def _log_sent(payload: dict, real_id: Optional[str] = None, mock: bool = False) -> None:
    entry = {
        "ts": datetime.utcnow().isoformat(),
        "to": payload["to"],
        "subject": payload["subject"],
        "html_preview": (payload.get("html", "") or "")[:200],
        "real_id": real_id,
        "mock": mock,
    }
    try:
        with open(SENT_LOG, "a") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except Exception:
        logger.exception("Failed to log sent email")


# ---------------------------------------------------------------------------
# Pre-baked templates
# ---------------------------------------------------------------------------

def welcome_email(email: str, position: int) -> tuple[str, str]:
    """Welcome email при waitlist signup → (subject, html)."""
    subject = f"You're #{position} on the B6 waitlist 🐝"
    html = f"""\
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a;line-height:1.5">
  <div style="text-align:center;font-size:48px;margin-bottom:8px">🐝🛡️</div>
  <h2 style="text-align:center;color:#0F1116;margin:0 0 24px">Welcome to B6, you're #{position}</h2>

  <p>Hey, thanks for joining the waitlist.</p>

  <p>B6 is an AI agency that runs your Google Ads autonomously — bidding, budget, creative,
  reporting. Two AI agents (Buzz the Bidder 🐝 and Aegis the Risk Officer 🛡️) are already
  working in our dev environment. Five more agents come over the next weeks.</p>

  <p><strong>What happens next:</strong></p>
  <ul>
    <li>We're opening private beta to the first 30 SMB owners</li>
    <li>You'll get an early-access email when your turn comes</li>
    <li>Beta is free in exchange for one 30-min feedback call/week</li>
  </ul>

  <p>While you wait, watch the live demo:<br>
  → <a href="https://kampaio.com/b6" style="color:#00BFAE">kampaio.com/b6</a></p>

  <p>If you've got Google Ads questions in the meantime, just reply to this email.<br>
  We're solo founders, real humans.</p>

  <p style="color:#666;font-size:13px;margin-top:32px;border-top:1px solid #eee;padding-top:12px">
    B6 — AI PPC Cabinet · Built solo by an indie founder<br>
    <a href="https://kampaio.com" style="color:#666">kampaio.com</a>
  </p>
</body></html>
"""
    return subject, html


def weekly_digest_email(email: str, summary: dict) -> tuple[str, str]:
    """Weekly digest от Echo → (subject, html).

    summary expected keys: user_id, period, actions_count, blocks, applied,
    top_decisions (list), agent_calls
    """
    subject = "📊 Your B6 weekly digest"
    actions = summary.get("actions_count", 0)
    applied = summary.get("applied", 0)
    blocks = summary.get("blocks", 0)
    top = summary.get("top_decisions", [])
    period = summary.get("period", "last 7 days")

    decisions_html = ""
    for d in top:
        decisions_html += f"""
  <li style="margin-bottom:8px">
    <strong style="color:#00BFAE">{d.get('emoji','')} {d.get('agent','')}</strong>:
    {d.get('summary','')} <span style="color:#888">({d.get('when','')})</span>
  </li>"""

    html = f"""\
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;line-height:1.5">
  <h2 style="margin:0 0 8px">📊 Echo's weekly digest</h2>
  <p style="color:#666;margin:0 0 24px">{period}</p>

  <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
    <tr>
      <td style="padding:14px;background:#f4f7fb;border-radius:8px;text-align:center;width:33%">
        <div style="font-size:28px;font-weight:700;color:#0F1116">{actions}</div>
        <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px">Decisions made</div>
      </td>
      <td style="padding:14px;background:#e7f7f4;border-radius:8px;text-align:center;width:33%">
        <div style="font-size:28px;font-weight:700;color:#0a8e7f">{applied}</div>
        <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px">Applied</div>
      </td>
      <td style="padding:14px;background:#fde9e9;border-radius:8px;text-align:center;width:33%">
        <div style="font-size:28px;font-weight:700;color:#c33">{blocks}</div>
        <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px">🛡️ Aegis blocks</div>
      </td>
    </tr>
  </table>

  <h3 style="margin:24px 0 12px">Top decisions</h3>
  <ul style="padding-left:18px;margin:0">
    {decisions_html or '<li style="color:#888">No decisions this period.</li>'}
  </ul>

  <p style="margin:32px 0 0">
    <a href="https://kampaio.com/b6"
       style="display:inline-block;padding:12px 24px;background:#00BFAE;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">
      Open dashboard →
    </a>
  </p>

  <p style="color:#888;font-size:13px;margin-top:32px;border-top:1px solid #eee;padding-top:12px">
    B6 — your AI PPC cabinet · <a href="https://kampaio.com" style="color:#888">kampaio.com</a><br>
    Sent automatically by 📊 Echo, your weekly reporting agent.
  </p>
</body></html>
"""
    return subject, html
