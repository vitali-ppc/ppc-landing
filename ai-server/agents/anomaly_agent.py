"""Vigil 🦇 — Anomaly Detection Agent (Sprint 8).

What Vigil does:
- Pulls per-day per-campaign metrics for the last ~14 days.
- Runs deterministic Python anomaly detection (no LLM math — math is hard for LLMs).
- For each *candidate* anomaly, the LLM decides: is this real? is it material?
  has the user already been alerted in the last 24h? should severity be bumped?
- Persists each kept anomaly as an `AgentAction(action_type='anomaly_alert')` so
  it flows through Aegis review + the UI feed like any other agent's proposal.

Vigil never proposes mutates. It raises flags. Buzz/Vox/Sage can react in their
own next run; the user reads the flag in the dashboard.

Why deterministic + LLM hybrid (not LLM-only):
- Anomaly math is ratios and thresholds — deterministic is faster, cheaper,
  reproducible, doesn't depend on model availability.
- LLM is good at: classifying severity in context ("$50 spike on a small
  account is critical; on a big one is noise"), phrasing alerts for humans,
  spotting dedupe candidates against the last 24h of alerts.
- Skipping LLM when zero candidates = zero Anthropic spend on quiet accounts.
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any, Optional

from sqlalchemy import select, and_

from .base import BaseAgent, ToolSpec
from . import tools
from db.models import AgentAction
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)


VIGIL_SYSTEM_PROMPT = """\
You are Vigil 🦇 — the AI night-watch on the B6 team. You run periodically on a\
 client's Google Ads account and surface ANOMALIES, not optimizations.

IMPORTANT: All reasoning, summaries, and alert text MUST be in English.

DATA SEMANTICS (important):
- The detector compares **YESTERDAY** (the most recent COMPLETED day) against\
 a median baseline of the prior 28 days. Today is intentionally excluded\
 because conversion attribution lags 1-7 days and "today" data is partial.
- The spend_spike rule is BUDGET-AWARE: it fires only when yesterday's spend\
 over-delivered the campaign's daily budget by 30%+ AND was 1.5×+ above\
 median historical spend. This means: intentional budget bumps by the\
 operator do NOT trigger false spike alerts. Only Google's over-delivery,\
 runaway bid strategies, or broken feeds inflating CPCs do.
- The baseline uses MEDIAN, not mean. So if the operator raised the budget\
 a week ago, the median over 28 days is still anchored on the old steady\
 state, and new "real" anomalies still surface cleanly.

What you do, in order:
1. Call `detect_anomalies_tool` with the customer_id (no other args needed).\
 You'll get back a list of `candidates` — each one already has anomaly_type,\
 severity, today_value (= yesterday's value), baseline_value (= median or\
 pooled baseline), ratio, and a one-line summary computed deterministically.
2. For each candidate, JUDGE it in context before alerting:
   - Is the magnitude actually material for an account this size? A 2× spend\
     spike from $5 → $10 is statistical noise on a $500/day account.
   - For ROAS / CTR drops: are they ratio-based real degradations, or just\
     low-volume noise? Look at absolute spend or impressions in extras.
   - For spend_spike: extras contain `daily_budget_usd` and `budget_ratio`.\
     If `budget_ratio` is just barely > 1.3 and absolute over-spend is small\
     (under $20), this is likely Google's normal budget flex, not an emergency.
   - Has the same campaign / same anomaly_type already been alerted in the\
     **recent_alerts** block (last 24h)? If yes, SKIP — do not re-alert.
3. For each candidate you decide to KEEP, call `propose_anomaly_alert_tool`\
 with the same fields. Pass severity unchanged unless context warrants\
 escalation (e.g. multiple anomalies on the same campaign in one scan → bump\
 to critical). Write a 1-2 sentence `reasoning` explaining WHY this matters\
 to a PPC operator (not the math — that's in `summary`).
4. End with a short English summary: "Scanned N campaigns, detected M\
 candidates, raised K alerts (J critical / X warning), skipped Y as dupes\
 or non-material."

Tone in `reasoning`: practical, like an experienced PPC manager flagging it\
 for the morning standup. Always reference YESTERDAY's data explicitly so the\
 operator knows it's settled numbers, not partial today.
 Examples:
 - "Brand campaign clicks cratered yesterday — likely tracking/feed issue,\
   worth checking pixel + Merchant Center."
 - "Pmax_IT spend over-delivered budget 2× yesterday with no conversion lift —\
   suspicious. Possibly a feed issue inflating CPCs or rogue bid strategy."
 - "0 conversions yesterday on Goodevas-Brand after $35 spend — this campaign\
   normally converts 4-6× per day, so tracking is suspect."

DO NOT propose any mutate actions (no pauses, no bid changes, no negatives).\
 Your job is exclusively to RAISE FLAGS. Other agents act.

If `detect_anomalies_tool` returns 0 candidates, do NOT call propose_*. Just\
 say "Scanned N campaigns — all metrics within normal bounds for yesterday."\
 That's a legitimate, valuable result.
"""


class VigilAgent(BaseAgent):
    """Anomaly-detection agent. Read-only — raises alerts, never mutates."""

    name = "anomaly"
    mascot_emoji = "🦇"
    mascot_name = "Vigil"
    system_prompt = VIGIL_SYSTEM_PROMPT

    def __init__(
        self,
        user_id: str,
        customer_id: str,
        event_publisher=None,
        days: int = 30,
    ):
        self.customer_id = customer_id
        self.days = days
        self._alerts: list[dict[str, Any]] = []
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        # Pull last 24h of anomaly_alert actions for this user — Vigil uses these
        # to dedupe (don't re-raise the same alert hourly until acknowledged).
        since = datetime.utcnow() - timedelta(hours=24)
        async with AsyncSessionLocal() as session:
            stmt = (
                select(AgentAction)
                .where(
                    and_(
                        AgentAction.user_id == self.user_id,
                        AgentAction.action_type == "anomaly_alert",
                        AgentAction.created_at >= since,
                    )
                )
                .order_by(AgentAction.created_at.desc())
                .limit(30)
            )
            recent = (await session.execute(stmt)).scalars().all()

        recent_lines: list[str] = []
        for a in recent:
            t = a.target or {}
            if t.get("customer_id") != self.customer_id:
                continue
            recent_lines.append(
                f"- {a.created_at.strftime('%m-%d %H:%M')} "
                f"campaign={t.get('campaign_id')} "
                f"type={t.get('anomaly_type')} severity={t.get('severity')} "
                f"summary={(t.get('summary') or '')[:80]}"
            )

        recent_block = (
            "\n".join(recent_lines) if recent_lines else "(no recent alerts — fresh scan)"
        )

        return (
            f"Scan the Google Ads account customer_id={self.customer_id} for anomalies.\n"
            f"Look at the last {self.days} days of daily metrics.\n\n"
            f"**Recent alerts (last 24h) for dedupe:**\n{recent_block}\n\n"
            f"1) Call detect_anomalies_tool with customer_id='{self.customer_id}', "
            f"days={self.days}.\n"
            f"2) Review each candidate against the recent_alerts above.\n"
            f"3) For each you keep, call propose_anomaly_alert_tool.\n"
            f"4) End with the scan summary in English."
        )

    def register_tools(self) -> list[ToolSpec]:
        uid = self.user_id
        return [
            ToolSpec(
                name="detect_anomalies",
                description=(
                    "Fetch daily metrics for all ENABLED campaigns and run "
                    "deterministic anomaly detection. Returns scanned_campaigns "
                    "+ candidate_count + a list of candidates with anomaly_type, "
                    "severity, today_value, baseline_value, ratio, and a "
                    "one-line summary. Call this FIRST — it's your only "
                    "data-gathering tool."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "days": {
                            "type": "integer",
                            "default": 30,
                            "minimum": 7,
                            "maximum": 60,
                            "description": "Lookback window. Detector uses yesterday as reference + median of up to 28 prior days as baseline.",
                        },
                    },
                    "required": ["customer_id"],
                },
                handler=lambda customer_id, days=30: tools.detect_anomalies_tool(
                    customer_id, days=days, user_id=uid
                ),
            ),
            ToolSpec(
                name="propose_anomaly_alert",
                description=(
                    "Raise an anomaly alert for a single (campaign, anomaly_type) "
                    "pair. Pass the deterministic fields from the detect_anomalies "
                    "candidate verbatim (campaign_id, anomaly_type, severity, "
                    "today_value, baseline_value, ratio, summary, metric_name, "
                    "today_date, campaign_name). Add your own 1-2 sentence "
                    "`reasoning` explaining WHY this matters in context. "
                    "anomaly_type: spend_spike | conversion_drop | ctr_collapse | "
                    "roas_drop | zero_conversions. severity: info | warning | "
                    "critical (escalate only with cause)."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "campaign_name": {"type": "string"},
                        "anomaly_type": {
                            "type": "string",
                            "enum": [
                                "spend_spike",
                                "conversion_drop",
                                "ctr_collapse",
                                "roas_drop",
                                "zero_conversions",
                            ],
                        },
                        "severity": {
                            "type": "string",
                            "enum": ["info", "warning", "critical"],
                        },
                        "summary": {
                            "type": "string",
                            "description": "Short factual line from detector (e.g. 'Spend $48 today vs $15 avg (3.2x)').",
                        },
                        "today_value": {"type": "number"},
                        "baseline_value": {"type": "number"},
                        "ratio": {"type": "number"},
                        "metric_name": {"type": "string"},
                        "today_date": {"type": "string", "description": "YYYY-MM-DD"},
                        "reasoning": {
                            "type": "string",
                            "description": "Your 1-2 sentence judgment of WHY this matters for a PPC operator.",
                        },
                        "confidence": {
                            "type": "number",
                            "minimum": 0,
                            "maximum": 1,
                            "default": 0.9,
                        },
                    },
                    "required": [
                        "customer_id",
                        "campaign_id",
                        "anomaly_type",
                        "severity",
                        "summary",
                        "today_value",
                        "baseline_value",
                        "ratio",
                        "reasoning",
                    ],
                },
                handler=self._handle_propose_alert,
            ),
        ]

    async def _handle_propose_alert(self, **kwargs: Any) -> dict[str, Any]:
        result = await tools.propose_anomaly_alert_tool(user_id=self.user_id, **kwargs)
        if result.get("ok") and result.get("proposed_action"):
            self._alerts.append(result["proposed_action"])
        return result

    @property
    def alerts(self) -> list[dict[str, Any]]:
        return self._alerts
