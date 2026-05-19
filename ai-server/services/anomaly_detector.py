"""Pure-Python anomaly detection over per-campaign daily metrics.

Vigil 🦇 uses this to find candidate anomalies *before* invoking the LLM. Math
is deterministic (ratios + thresholds), so we don't pay tokens for accounts
where nothing's wrong. The LLM's job downstream is severity calibration in
context + human-readable phrasing + dedupe against recent alerts.

Detection rules (Sprint 8.5 — baseline rewrite):

    1. spend_spike       yesterday's spend > 1.3× current daily_budget
                         AND > 1.5× median(prior baseline)
                         AND > $10 absolute
    2. conversion_drop   yesterday's conversions < 0.5× median baseline
                         AND median baseline >= 1/day
    3. ctr_collapse      yesterday's CTR < 0.5× pooled baseline CTR
                         AND yesterday's impressions > 500
    4. roas_drop         yesterday's ROAS < 0.7× pooled baseline ROAS
                         AND yesterday's conversions > 0
    5. zero_conversions  yesterday: 0 conv AND >= $20 spend
                         AND median baseline conv >= 1/day

WHY "YESTERDAY" not "TODAY":
- Google Ads conversion attribution lags 1-7 days, especially for PMax/Shopping
  with 7-day click attribution windows.
- "Today" data is partial — last few hours of conversions haven't been
  registered yet, especially in the evening.
- "Yesterday" is the most recent COMPLETED day with stable numbers.
- Using "today" caused a deluge of false zero_conversions / conversion_drop
  alerts every evening on the first prod tick.

WHY MEDIAN not MEAN:
- Mean is sensitive to manual budget changes ("user raised budget yesterday
  from $77 to $400" → average gets pulled high, future days look "normal").
- Median is robust to that — one outlier day doesn't shift the baseline.
- For ROAS/CTR we still pool clicks/imps/spend/value across baseline days
  (more accurate than median-of-ratios on small samples).

WHY BUDGET-AWARE SPEND_SPIKE:
- Old rule "spend > 1.5× mean" fired on any campaign where the operator
  raised the daily budget. Not a problem — it's intent.
- New rule requires: Google over-delivered the daily budget by 30%+,
  AND yesterday's spend is significantly above the median historical spend.
- This catches real "Google went crazy" / "feed broke and CPCs exploded"
  scenarios while ignoring intentional budget bumps.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Iterable, Literal, Optional

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
    today_value: float           # value on the reference day (yesterday)
    baseline_value: float        # median (or pooled) baseline
    ratio: float                 # today_value / baseline_value
    days_window: int             # how many baseline days were used
    today_date: Optional[str] = None  # YYYY-MM-DD of the reference day
    extras: dict[str, Any] = field(default_factory=dict)

    @property
    def summary(self) -> str:
        if self.type == "spend_spike":
            budget = self.extras.get("daily_budget_usd")
            budget_str = f" (budget ${budget:.0f})" if budget else ""
            return (
                f"Spend ${self.today_value:.0f} yesterday vs ${self.baseline_value:.0f} "
                f"median ({self.ratio:.1f}x){budget_str}"
            )
        if self.type == "conversion_drop":
            pct = self.ratio * 100
            return (
                f"Conversions {self.today_value:.1f} yesterday vs {self.baseline_value:.1f} "
                f"median ({pct:.0f}%)"
            )
        if self.type == "ctr_collapse":
            pct = self.ratio * 100
            return (
                f"CTR {self.today_value * 100:.2f}% yesterday vs "
                f"{self.baseline_value * 100:.2f}% baseline ({pct:.0f}%)"
            )
        if self.type == "roas_drop":
            pct = self.ratio * 100
            return (
                f"ROAS {self.today_value:.2f}x yesterday vs {self.baseline_value:.2f}x "
                f"baseline ({pct:.0f}%)"
            )
        if self.type == "zero_conversions":
            spend = self.extras.get("today_spend_usd", 0)
            return (
                f"0 conversions with ${spend:.0f} spend yesterday "
                f"(baseline median {self.baseline_value:.1f}/day)"
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


# Detection thresholds — module-level so they're tunable without touching
# the detect() callsites. Adjust based on observed false-positive / false-
# negative rates on real prod data.
SPEND_SPIKE_BUDGET_RATIO = 1.3       # Google over-delivered by 30%+
SPEND_SPIKE_MEDIAN_RATIO = 1.5       # AND yesterday > 1.5× historical median
SPEND_SPIKE_CRITICAL_BUDGET_RATIO = 2.0
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


def _median(values: Iterable[float]) -> float:
    """Median (or 0 on empty). Robust to outliers vs mean — important
    because operators routinely bump budgets, which would pull a mean baseline
    up and mask future real anomalies."""
    sorted_v = sorted(values)
    n = len(sorted_v)
    if n == 0:
        return 0.0
    if n % 2 == 1:
        return float(sorted_v[n // 2])
    return float((sorted_v[n // 2 - 1] + sorted_v[n // 2]) / 2)


def detect_anomalies(
    campaigns: list[dict[str, Any]],
    *,
    baseline_days: int = 28,
) -> list[Anomaly]:
    """Detect anomalies across a list of campaigns with daily metrics.

    Input shape (one per campaign):
        {
          "campaign_id": "100001",
          "campaign_name": "Winter Shoes",
          "status": "ENABLED",
          "bid_strategy": "TARGET_ROAS",
          "daily_budget_micros": 50_000_000,    # current daily budget cap
          "daily": [
            {"date": "2026-05-19", "impressions": 1500, "clicks": 30,
             "cost_micros": 5_000_000, "conversions": 2.0, "conversion_value": 60.0},
            ... (most recent or any order — sorted internally; expect 30+ days
                 to fully populate baseline; works with fewer but less robust)
          ],
        }

    The detector uses **yesterday** (second-most-recent day) as the reference
    point, NOT today. This avoids false positives from partial conversion
    attribution. Baseline = median of days [-3, -baseline_days-2].

    Returns a flat list of Anomaly objects across all campaigns.
    """
    out: list[Anomaly] = []
    for camp in campaigns:
        out.extend(_detect_one_campaign(camp, baseline_days=baseline_days))
    return out


def _detect_one_campaign(camp: dict[str, Any], *, baseline_days: int) -> list[Anomaly]:
    daily = camp.get("daily") or []
    if len(daily) < 3:
        # Need at least: today + yesterday + 1 baseline day. Anything less is
        # too noisy to detect anything meaningful.
        return []

    # Sort most-recent first. Drop "today" (daily_sorted[0]) — it's partial
    # data with unsettled conversion attribution. Reference day = yesterday.
    daily_sorted = sorted(daily, key=lambda d: d.get("date") or "", reverse=True)
    yesterday = daily_sorted[1]
    baseline = daily_sorted[2 : 2 + baseline_days]
    if not baseline:
        return []

    y_spend_usd = float(yesterday.get("cost_micros", 0)) / 1_000_000
    y_conv = float(yesterday.get("conversions", 0))
    y_imp = int(yesterday.get("impressions", 0))
    y_clicks = int(yesterday.get("clicks", 0))
    y_value = float(yesterday.get("conversion_value", 0))
    y_ctr = _safe_div(y_clicks, y_imp)
    y_roas = _safe_div(y_value, y_spend_usd)

    bs_spend = [float(d.get("cost_micros", 0)) / 1_000_000 for d in baseline]
    bs_conv = [float(d.get("conversions", 0)) for d in baseline]
    bs_imp = [int(d.get("impressions", 0)) for d in baseline]
    bs_clicks = [int(d.get("clicks", 0)) for d in baseline]
    bs_value = [float(d.get("conversion_value", 0)) for d in baseline]

    # Median for spend & conversions — robust to budget changes / outlier days.
    median_spend = _median(bs_spend)
    median_conv = _median(bs_conv)
    # Pooled CTR / ROAS — accurate aggregate ratios (avoids median-of-ratios trap).
    sum_imp = sum(bs_imp)
    sum_clicks = sum(bs_clicks)
    pooled_ctr = _safe_div(sum_clicks, sum_imp)
    sum_spend_w = sum(bs_spend)
    sum_value_w = sum(bs_value)
    pooled_roas = _safe_div(sum_value_w, sum_spend_w)

    cid = str(camp.get("campaign_id") or "")
    cname = camp.get("campaign_name") or "Unknown"
    y_date = yesterday.get("date")
    window = len(baseline)

    # Current daily budget — for over-delivery check.
    budget_micros = int(camp.get("daily_budget_micros") or 0)
    daily_budget_usd = budget_micros / 1_000_000 if budget_micros else 0.0

    anomalies: list[Anomaly] = []

    # 1. Spend spike — REQUIRES both budget over-delivery AND median anomaly.
    #
    # Pure "spend > median × X" fires on intentional budget bumps. Pure
    # "spend > budget × X" alone misses cases where operator both bumped the
    # budget AND Google over-delivered on top of that. Combination = real signal.
    if (
        y_spend_usd > SPEND_SPIKE_MIN_ABS_USD
        and daily_budget_usd > 0
        and median_spend > 0
    ):
        budget_ratio = y_spend_usd / daily_budget_usd
        median_ratio = y_spend_usd / median_spend
        if (
            budget_ratio > SPEND_SPIKE_BUDGET_RATIO
            and median_ratio > SPEND_SPIKE_MEDIAN_RATIO
        ):
            sev: Severity = (
                "critical"
                if budget_ratio >= SPEND_SPIKE_CRITICAL_BUDGET_RATIO
                else "warning"
            )
            anomalies.append(
                Anomaly(
                    type="spend_spike",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="spend_usd",
                    today_value=y_spend_usd,
                    baseline_value=median_spend,
                    ratio=median_ratio,
                    days_window=window,
                    today_date=y_date,
                    extras={
                        "daily_budget_usd": daily_budget_usd,
                        "budget_ratio": round(budget_ratio, 2),
                    },
                )
            )

    # 2. Conversion drop — yesterday's conversions vs median.
    if median_conv >= CONVERSION_DROP_MIN_BASELINE and y_conv < CONVERSION_DROP_RATIO * median_conv:
        ratio = _safe_div(y_conv, median_conv)
        sev = "critical" if (y_conv == 0 and median_conv >= 3) else "warning"
        anomalies.append(
            Anomaly(
                type="conversion_drop",
                severity=sev,
                campaign_id=cid,
                campaign_name=cname,
                metric_name="conversions",
                today_value=y_conv,
                baseline_value=median_conv,
                ratio=ratio,
                days_window=window,
                today_date=y_date,
            )
        )

    # 3. CTR collapse — yesterday's CTR vs pooled baseline.
    if pooled_ctr > 0 and y_imp > CTR_COLLAPSE_MIN_IMPRESSIONS:
        ratio = _safe_div(y_ctr, pooled_ctr)
        if ratio < CTR_COLLAPSE_RATIO:
            sev = "critical" if ratio < CTR_COLLAPSE_CRITICAL_RATIO else "warning"
            anomalies.append(
                Anomaly(
                    type="ctr_collapse",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="ctr",
                    today_value=y_ctr,
                    baseline_value=pooled_ctr,
                    ratio=ratio,
                    days_window=window,
                    today_date=y_date,
                    extras={"yesterday_impressions": y_imp},
                )
            )

    # 4. ROAS drop — yesterday's ROAS vs pooled baseline.
    if pooled_roas > 0 and y_conv > 0:
        ratio = _safe_div(y_roas, pooled_roas)
        if ratio < ROAS_DROP_RATIO:
            sev = "critical" if ratio < ROAS_DROP_CRITICAL_RATIO else "warning"
            anomalies.append(
                Anomaly(
                    type="roas_drop",
                    severity=sev,
                    campaign_id=cid,
                    campaign_name=cname,
                    metric_name="roas",
                    today_value=y_roas,
                    baseline_value=pooled_roas,
                    ratio=ratio,
                    days_window=window,
                    today_date=y_date,
                )
            )

    # 5. Zero conversions yesterday with significant spend.
    if (
        y_conv == 0
        and y_spend_usd >= ZERO_CONV_MIN_SPEND_USD
        and median_conv >= ZERO_CONV_MIN_BASELINE
    ):
        anomalies.append(
            Anomaly(
                type="zero_conversions",
                severity="critical",
                campaign_id=cid,
                campaign_name=cname,
                metric_name="conversions",
                today_value=0.0,
                baseline_value=median_conv,
                ratio=0.0,
                days_window=window,
                today_date=y_date,
                extras={"today_spend_usd": y_spend_usd},
            )
        )

    return anomalies
