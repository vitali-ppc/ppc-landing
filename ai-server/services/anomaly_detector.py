"""Pure-Python anomaly detection over per-campaign daily metrics.

Vigil 🦇 uses this to find candidate anomalies *before* invoking the LLM. Math
is deterministic (ratios + thresholds), so we don't pay tokens for accounts
where nothing's wrong. The LLM's job downstream is severity calibration in
context + human-readable phrasing + dedupe against recent alerts.

Detection rules (Sprint 8 Phase 1):
    1. spend_spike       today's spend > 1.5x baseline avg AND > $10 absolute
    2. conversion_drop   today's conversions < 0.5x baseline avg AND baseline avg >= 1
    3. ctr_collapse      today's CTR < 0.5x baseline AND today's impressions > 500
    4. roas_drop         today's ROAS < 0.7x baseline AND today's conversions > 0
    5. zero_conversions  today: conv=0, spend >= $20, baseline avg conv >= 1

`budget_exhausted_streak` is deferred — needs per-day budget cap data which
isn't in the daily-metrics GAQL response (would require a second query).
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Literal, Optional

Severity = Literal["info", "warning", "critical"]
AnomalyType = Literal[
    "spend_spike",
    "conversion_drop",
    "ctr_collapse",
    "roas_drop",
    "zero_conversions",
]


@dataclass
class Anomaly:
    type: AnomalyType
    severity: Severity
    campaign_id: str
    campaign_name: str
    metric_name: str
    today_value: float
    baseline_value: float
    ratio: float
    days_window: int
    today_date: Optional[str] = None
    extras: dict[str, Any] = field(default_factory=dict)

    @property
    def summary(self) -> str:
        if self.type == "spend_spike":
            return (
                f"Spend ${self.today_value:.0f} today vs ${self.baseline_value:.0f} "
                f"avg ({self.ratio:.1f}x)"
            )
        if self.type == "conversion_drop":
            pct = self.ratio * 100
            return (
                f"Conversions {self.today_value:.1f} today vs {self.baseline_value:.1f} "
                f"avg ({pct:.0f}%)"
            )
        if self.type == "ctr_collapse":
            pct = self.ratio * 100
            return (
                f"CTR {self.today_value * 100:.2f}% today vs "
                f"{self.baseline_value * 100:.2f}% avg ({pct:.0f}%)"
            )
        if self.type == "roas_drop":
            pct = self.ratio * 100
            return (
                f"ROAS {self.today_value:.2f}x today vs {self.baseline_value:.2f}x "
                f"avg ({pct:.0f}%)"
            )
        if self.type == "zero_conversions":
            spend = self.extras.get("today_spend_usd", 0)
            return (
                f"0 conversions with ${spend:.0f} spend today "
                f"(baseline avg {self.baseline_value:.1f}/day)"
            )
        return f"{self.type}: {self.today_value} vs baseline {self.baseline_value}"

    def as_dict(self) -> dict[str, Any]:
        return {
            "type": self.type,
            "severity": self.severity,
            "campaign_id": self.campaign_id,
            "campaign_name": self.campaign_name,
            "metric_name": self.metric_name,
            "today_value": round(float(self.today_value), 4),
            "baseline_value": round(float(self.baseline_value), 4),
            "ratio": round(float(self.ratio), 3),
            "days_window": self.days_window,
            "today_date": self.today_date,
            "summary": self.summary,
            "extras": self.extras,
        }


# Detection thresholds — keep at module level so they're tunable per-deploy
# via env or constant overrides without touching the detect() callsites.
SPEND_SPIKE_RATIO = 1.5
SPEND_SPIKE_CRITICAL_RATIO = 2.5
SPEND_SPIKE_MIN_ABS_USD = 10.0

CONVERSION_DROP_RATIO = 0.5
CONVERSION_DROP_MIN_BASELINE = 1.0

CTR_COLLAPSE_RATIO = 0.5
CTR_COLLAPSE_CRITICAL_RATIO = 0.3
CTR_COLLAPSE_MIN_IMPRESSIONS = 500

ROAS_DROP_RATIO = 0.7
ROAS_DROP_CRITICAL_RATIO = 0.4

ZERO_CONV_MIN_SPEND_USD = 20.0
ZERO_CONV_MIN_BASELINE = 1.0


def _safe_div(a: float, b: float) -> float:
    return a / b if b else 0.0


def detect_anomalies(
    campaigns: list[dict[str, Any]],
    *,
    baseline_days: int = 7,
) -> list[Anomaly]:
    """Detect anomalies across a list of campaigns with daily metrics.

    Input shape (one per campaign):
        {
          "campaign_id": "100001",
          "campaign_name": "Winter Shoes",
          "status": "ENABLED",
          "bid_strategy": "TARGET_ROAS",
          "daily": [
            {"date": "2026-05-19", "impressions": 1500, "clicks": 30,
             "cost_micros": 5_000_000, "conversions": 2.0, "conversion_value": 60.0},
            ... (most recent or any order — sorted internally)
          ],
        }

    Returns a flat list of Anomaly objects across all campaigns.
    """
    out: list[Anomaly] = []
    for camp in campaigns:
        out.extend(_detect_one_campaign(camp, baseline_days=baseline_days))
    return out


def _detect_one_campaign(camp: dict[str, Any], *, baseline_days: int) -> list[Anomaly]:
    daily = camp.get("daily") or []
    if len(daily) < 2:
        return []

    # Most recent day first
    daily_sorted = sorted(daily, key=lambda d: d.get("date") or "", reverse=True)
    today = daily_sorted[0]
    baseline = daily_sorted[1 : 1 + baseline_days]
    if not baseline:
        return []

    today_spend_usd = float(today.get("cost_micros", 0)) / 1_000_000
    today_conv = float(today.get("conversions", 0))
    today_imp = int(today.get("impressions", 0))
    today_clicks = int(today.get("clicks", 0))
    today_value = float(today.get("conversion_value", 0))
    today_ctr = _safe_div(today_clicks, today_imp)
    today_roas = _safe_div(today_value, today_spend_usd)

    bs_spend = [float(d.get("cost_micros", 0)) / 1_000_000 for d in baseline]
    bs_conv = [float(d.get("conversions", 0)) for d in baseline]
    bs_imp = [int(d.get("impressions", 0)) for d in baseline]
    bs_clicks = [int(d.get("clicks", 0)) for d in baseline]
    bs_value = [float(d.get("conversion_value", 0)) for d in baseline]

    avg_spend = sum(bs_spend) / len(bs_spend)
    avg_conv = sum(bs_conv) / len(bs_conv)
    sum_imp = sum(bs_imp)
    sum_clicks = sum(bs_clicks)
    avg_ctr = _safe_div(sum_clicks, sum_imp)
    sum_spend_w = sum(bs_spend)
    sum_value_w = sum(bs_value)
    avg_roas = _safe_div(sum_value_w, sum_spend_w)

    cid = str(camp.get("campaign_id") or "")
    cname = camp.get("campaign_name") or "Unknown"
    today_date = today.get("date")
    window = len(baseline)

    anomalies: list[Anomaly] = []

    # 1. Spend spike
    if avg_spend > 0 and today_spend_usd > SPEND_SPIKE_MIN_ABS_USD:
        ratio = today_spend_usd / avg_spend
        if ratio > SPEND_SPIKE_RATIO:
            sev: Severity = "critical" if ratio >= SPEND_SPIKE_CRITICAL_RATIO else "warning"
            anomalies.append(
                Anomaly(
                    type="spend_spike",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="spend_usd",
                    today_value=today_spend_usd,
                    baseline_value=avg_spend,
                    ratio=ratio,
                    days_window=window,
                    today_date=today_date,
                )
            )

    # 2. Conversion drop
    if avg_conv >= CONVERSION_DROP_MIN_BASELINE and today_conv < CONVERSION_DROP_RATIO * avg_conv:
        ratio = _safe_div(today_conv, avg_conv)
        sev = "critical" if (today_conv == 0 and avg_conv >= 3) else "warning"
        anomalies.append(
            Anomaly(
                type="conversion_drop",
                severity=sev,
                campaign_id=cid,
                campaign_name=cname,
                metric_name="conversions",
                today_value=today_conv,
                baseline_value=avg_conv,
                ratio=ratio,
                days_window=window,
                today_date=today_date,
            )
        )

    # 3. CTR collapse
    if avg_ctr > 0 and today_imp > CTR_COLLAPSE_MIN_IMPRESSIONS:
        ratio = _safe_div(today_ctr, avg_ctr)
        if ratio < CTR_COLLAPSE_RATIO:
            sev = "critical" if ratio < CTR_COLLAPSE_CRITICAL_RATIO else "warning"
            anomalies.append(
                Anomaly(
                    type="ctr_collapse",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="ctr",
                    today_value=today_ctr,
                    baseline_value=avg_ctr,
                    ratio=ratio,
                    days_window=window,
                    today_date=today_date,
                    extras={"today_impressions": today_imp},
                )
            )

    # 4. ROAS drop
    if avg_roas > 0 and today_conv > 0:
        ratio = _safe_div(today_roas, avg_roas)
        if ratio < ROAS_DROP_RATIO:
            sev = "critical" if ratio < ROAS_DROP_CRITICAL_RATIO else "warning"
            anomalies.append(
                Anomaly(
                    type="roas_drop",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="roas",
                    today_value=today_roas,
                    baseline_value=avg_roas,
                    ratio=ratio,
                    days_window=window,
                    today_date=today_date,
                )
            )

    # 5. Zero conversions with significant spend
    if (
        today_conv == 0
        and today_spend_usd >= ZERO_CONV_MIN_SPEND_USD
        and avg_conv >= ZERO_CONV_MIN_BASELINE
    ):
        anomalies.append(
            Anomaly(
                type="zero_conversions",
                severity="critical",
                campaign_id=cid,
                campaign_name=cname,
                metric_name="conversions",
                today_value=0.0,
                baseline_value=avg_conv,
                ratio=0.0,
                days_window=window,
                today_date=today_date,
                extras={"today_spend_usd": today_spend_usd},
            )
        )

    return anomalies
