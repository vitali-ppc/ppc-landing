"""Mira 🎨 — Creative Agent.

Generates ad creatives for one campaign. Output is **type-aware**:

- **Search campaigns** → full RSA asset pack: 15 headlines (30 chars) + 4
  descriptions (90 chars), 3 angle variants. No image prompts (Search ads
  don't show images).
- **Performance Max** → asset group: 5 short headlines (30) + 5 long
  headlines (90) + 5 descriptions (90) + 5 image prompts, 3 angle variants.
- **Display** → 5 short + 5 long + 5 descriptions + 5 image prompts.
- **Shopping** → Mira refuses (creatives auto-generated from product feed).
- **Video** → Mira refuses (needs video, not text+image).

Mira also reads the campaign's `final_url` from Google Ads so the LLM knows
what's actually being sold — otherwise it hallucinates from the campaign
name only (e.g. "Brand / FI" → "financial advice").
"""
from __future__ import annotations

import logging
from typing import Any, Optional

from .base import BaseAgent, ToolSpec
from services import google_ads_client as gads
from services import image_gen
from services import audit

logger = logging.getLogger(__name__)


# Spec for each campaign type — drives both the LLM prompt and the tool schema.
# Source of truth: Google Ads RSA + Performance Max + Responsive Display Ad specs.
CHANNEL_SPECS: dict[str, dict[str, Any]] = {
    "SEARCH": {
        "label": "Search RSA (Responsive Search Ad)",
        "needs_images": False,
        "short_headlines_count": 15,
        "long_headlines_count": 0,
        "descriptions_count": 4,
        "headline_max_chars": 30,
        "long_headline_max_chars": 0,
        "description_max_chars": 90,
        "guidance": (
            "Search ads must lead with the product/service category and a "
            "concrete benefit. Mix promotional (sale/offer), feature ('Free "
            "delivery', 'EU warranty'), urgency ('Today only'), and brand "
            "trust ('Official store') angles across the 15 headlines so "
            "Google's auto-mixer has options for every search intent."
        ),
    },
    "PERFORMANCE_MAX": {
        "label": "Performance Max Asset Group",
        "needs_images": True,
        "short_headlines_count": 5,
        "long_headlines_count": 5,
        "descriptions_count": 5,
        "headline_max_chars": 30,
        "long_headline_max_chars": 90,
        "description_max_chars": 90,
        "guidance": (
            "PMax serves across Search, Display, YouTube, Gmail, Discover, "
            "Maps, Shopping. Short headlines (30) work in Search-style slots; "
            "long headlines (90) work in Display/YouTube slots. Image prompts "
            "should cover product-hero, lifestyle, and brand contexts so "
            "Google has visual options for each placement."
        ),
    },
    "DISPLAY": {
        "label": "Responsive Display Ad",
        "needs_images": True,
        "short_headlines_count": 5,
        "long_headlines_count": 1,
        "descriptions_count": 5,
        "headline_max_chars": 30,
        "long_headline_max_chars": 90,
        "description_max_chars": 90,
        "guidance": (
            "Display ads compete for attention on partner sites — open with a "
            "hook, not a feature dump. Image prompts should be visually bold "
            "and recognisable at small sizes."
        ),
    },
}

# Channel types Mira refuses (no useful ad-copy output).
# Sprint 8.9 — Mira self-validates her own output. If the LLM proposes
# descriptions over the 90-char Google Ads limit, we refuse and ask her
# to rewrite in-loop. Cap the retries so a stuck LLM doesn't eat all 8
# agent iterations (leaving none for normal tool work).
MAX_VALIDATION_RETRIES = 2


UNSUPPORTED_CHANNELS = {
    "SHOPPING": (
        "Shopping ads are auto-generated from the Merchant Center product "
        "feed — Mira can't add value here. Optimise the product feed instead."
    ),
    "VIDEO": (
        "Video campaigns need video assets, not text+image. Mira doesn't "
        "generate video."
    ),
    "SMART": (
        "Smart campaigns are fully Google-managed and don't accept custom "
        "creatives."
    ),
}


def _spec_for(channel_type: Optional[str]) -> dict[str, Any]:
    """Return the spec for this channel type, or SEARCH as a safe default."""
    if not channel_type:
        return CHANNEL_SPECS["SEARCH"]
    return CHANNEL_SPECS.get(channel_type.upper(), CHANNEL_SPECS["SEARCH"])


MIRA_SYSTEM_PROMPT_TEMPLATE = """\
You are Mira, an AI creative agent on the B6 team. You build production-ready\
 ad creatives for ONE Google Ads campaign at a time.

IMPORTANT: All reasoning, summaries, and creative text MUST be in English\
 (unless the campaign's landing URL is in another language — match it).

You will be told:
- The campaign's **channel_type** (Search / Performance Max / Display) — this\
 determines the output format.
- The campaign's **landing URL** — the actual product or service. ALWAYS\
 derive the offering from this URL, not from the campaign name. If campaign\
 name says "Brand / FI" and landing URL is goodevas.fi → it's a Finnish\
 e-commerce store, NOT financial advice.
- Last 7 days **metrics** (CTR, ROAS, conversions) — adjust tone based on\
 current performance.
- Top **keywords** in the campaign — reflect the search intent in headlines.

═══════════════════════════════════════════════════════════════════════════
OUTPUT FORMAT (varies by channel_type):
═══════════════════════════════════════════════════════════════════════════

Generate exactly **3 angle variants** for this campaign. Suggested angles:
  1. **Urgency / Promotion** — limited time, scarcity, deal-driven
  2. **Trust / Authority** — official, established, quality-guaranteed
  3. **Value / Benefit** — what the customer GAINS

For each variant, produce a COMPLETE asset pack for the specific channel\
 (counts from the spec given in the user prompt). DO NOT repeat headlines or\
 descriptions across variants — they must be distinct.

CHANNEL_TYPE_GUIDANCE (passed in the user prompt) tells you the strategic\
 nuance for this channel; follow it.

═══════════════════════════════════════════════════════════════════════════
CHARACTER LIMITS (CRITICAL — Google Ads HARD REJECTS over-limit copy):
═══════════════════════════════════════════════════════════════════════════
Every short_headline ≤ 30 chars. Every long_headline ≤ 90 chars.\
 **Every description ≤ 88 chars** (Google's limit is 90, write to 88 to be safe).

Before submitting each piece of copy, COUNT THE CHARACTERS including spaces\
 and punctuation. If a description ends up at 92 chars, REWRITE IT shorter —\
 do not submit over-limit text. The schema's maxLength will reject the call.

GOOD description (87 chars, complete thought):
  "At GoodEvas.fi you get premium quality, fair prices and free Finnish delivery."

BAD description (101 chars, gets truncated mid-sentence):
  "Discover GoodEvas.fi's wide selection of premium quality products with fast Finland-wide delivery."

Common over-limit patterns to AVOID:
- Stacking multiple benefits with " — " separators (almost always overshoots)
- Adding " for every purchase " / " on all orders " filler at the end
- Long brand+location mentions: prefer "GoodEvas.fi" over "Visit GoodEvas.fi today"

When you need to fit a constraint, drop filler words ("really", "simply",\
 "everything") before cutting key info. Sharp short copy beats fluffy long copy.

═══════════════════════════════════════════════════════════════════════════
GOOGLE ADS POLICY RULES (HARD):
═══════════════════════════════════════════════════════════════════════════
- No CAPS LOCK on full words (sentence-case or capitalising key words is fine)
- No consecutive exclamation marks ("Sale!!" is rejected)
- No unverifiable claims ("100% guaranteed", "world's best") unless the\
 landing URL explicitly substantiates them
- No emojis in headlines (Google strips them anyway)
- Specifics > generic words (prefer "Free 24h Delivery" over "Fast Service")
- Match the language of the landing URL (Finnish landing → Finnish headlines,\
 etc.) — but reasoning/rationale stays in English

═══════════════════════════════════════════════════════════════════════════
TOOL USE:
═══════════════════════════════════════════════════════════════════════════
Call `propose_creative_set` ONCE with the full result. The tool schema\
 accepts arrays of headlines/descriptions/image prompts — submit the\
 EXACT counts specified for this channel_type.
"""


class CreativeAgent(BaseAgent):
    name = "creative"
    mascot_emoji = "🎨"
    mascot_name = "Mira"
    system_prompt = MIRA_SYSTEM_PROMPT_TEMPLATE

    def __init__(
        self,
        user_id: str,
        customer_id: str,
        campaign_id: str,
        event_publisher=None,
        generate_images: bool = True,
    ):
        self.customer_id = customer_id
        self.campaign_id = campaign_id
        self.generate_images = generate_images
        self._proposals: list[dict] = []
        self._spec: dict[str, Any] = CHANNEL_SPECS["SEARCH"]  # default; reset in build_initial_prompt
        # Sprint 8.9 — Mira self-validates char limits and asks itself to
        # rewrite over-limit copy. This counter caps the rewrites so a
        # pathological LLM run can't burn the agent's MAX_AGENT_ITERATIONS
        # cap purely on char-limit retries.
        self._validation_retries: int = 0
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        """Gather campaign context (incl. channel_type + landing URLs) for Mira."""
        if gads.use_mock():
            access_token = "mock-access-token"
        else:
            from agents.tools import _get_access_token_for
            access_token = await _get_access_token_for(self.user_id, self.customer_id)

        campaigns = await gads.list_campaigns(access_token, self.customer_id)
        target = next((c for c in campaigns if str(c["id"]) == str(self.campaign_id)), None)
        if not target:
            return (
                f"Campaign {self.campaign_id} not found. Reply with "
                "'campaign not found' and call no tools."
            )

        channel_type = (target.get("channel_type") or "SEARCH").upper()

        # Refuse unsupported channels early — saves token spend.
        if channel_type in UNSUPPORTED_CHANNELS:
            reason = UNSUPPORTED_CHANNELS[channel_type]
            return (
                f"Campaign '{target['name']}' is channel_type={channel_type}. "
                f"{reason}\n\nDo NOT call propose_creative_set. Reply with a "
                "1-2 sentence English summary explaining why Mira is skipping "
                "this campaign and what the user should do instead."
            )

        self._spec = _spec_for(channel_type)

        # Landing URLs — critical for grounding the LLM
        try:
            landing_urls = await gads.get_campaign_landing_urls(
                access_token, self.customer_id, self.campaign_id
            )
        except Exception:
            logger.exception("Failed to fetch landing URLs")
            landing_urls = []

        # Metrics
        metrics = await gads.get_campaign_metrics(
            access_token, self.customer_id, self.campaign_id, days=7
        )
        try:
            keywords = await gads.get_keyword_metrics(
                access_token, self.customer_id, self.campaign_id
            )
        except Exception:
            keywords = []
        kw_lines = "\n".join(
            f"  - \"{k.get('keyword')}\" ({k.get('match_type')}) "
            f"CTR {k.get('ctr', 0) * 100:.1f}%"
            for k in keywords[:5]
        ) or "  (no keyword data — base creatives on the landing URL)"

        landing_block = (
            "\n".join(f"  - {u}" for u in landing_urls[:3])
            if landing_urls
            else "  (no landing URL found — campaign name only)"
        )

        spec = self._spec
        return f"""\
Build creatives for the following campaign.

**Campaign**: "{target['name']}" (id {target['id']})
- Channel type: **{channel_type}** → format: **{spec['label']}**
- Bid strategy: {target.get('bid_strategy')}
- Daily budget: ${target['budget_micros'] / 1_000_000:.0f}/day

**Landing URL(s)** (what's actually being sold — derive the offering from this):
{landing_block}

**7-day metrics**:
- ROAS: {metrics.get('roas', 0)}
- CTR: {metrics.get('ctr', 0) * 100:.2f}%
- Conversions: {metrics.get('conversions', 0)}
- Cost / conversion: ~${metrics.get('spend_micros', 0) / 1_000_000 / max(metrics.get('conversions', 1), 1):.2f}

**Top-5 keywords** (search intent signal):
{kw_lines}

═══════════════════════════════════════════════════════════════════════════
REQUIRED OUTPUT COUNTS for this channel ({channel_type}):
═══════════════════════════════════════════════════════════════════════════
For EACH of the 3 angle variants, produce EXACTLY:
- **{spec['short_headlines_count']}** short headlines (≤{spec['headline_max_chars']} chars)
{f"- **{spec['long_headlines_count']}** long headlines (≤{spec['long_headline_max_chars']} chars)" if spec['long_headlines_count'] > 0 else ""}
- **{spec['descriptions_count']}** descriptions (≤{spec['description_max_chars']} chars)
{f"- **{spec['descriptions_count']}** image prompts (one per description, single-line)" if spec['needs_images'] else "- NO image prompts (this channel doesn't show images)"}

**Channel guidance**: {spec['guidance']}

Now call `propose_creative_set` ONCE with all 3 variants populated.
All copy in English unless the landing URL is in another language; rationale always in English.
"""

    def register_tools(self) -> list[ToolSpec]:
        spec = self._spec
        # The variant schema is built dynamically per channel so the LLM
        # gets validation feedback if it under-delivers.
        variant_props: dict[str, Any] = {
            "label": {
                "type": "string",
                "description": "Short angle name, e.g. 'Urgency', 'Trust', 'Value'",
            },
            "rationale": {
                "type": "string",
                "description": "1-2 sentence English explanation of why this angle fits the campaign data",
            },
            "short_headlines": {
                "type": "array",
                "items": {"type": "string", "maxLength": spec["headline_max_chars"]},
                "minItems": spec["short_headlines_count"],
                "maxItems": spec["short_headlines_count"],
                "description": (
                    f"Exactly {spec['short_headlines_count']} distinct headlines, "
                    f"each ≤{spec['headline_max_chars']} chars"
                ),
            },
            "descriptions": {
                "type": "array",
                "items": {"type": "string", "maxLength": spec["description_max_chars"]},
                "minItems": spec["descriptions_count"],
                "maxItems": spec["descriptions_count"],
                "description": (
                    f"Exactly {spec['descriptions_count']} distinct descriptions, "
                    f"each ≤{spec['description_max_chars']} chars"
                ),
            },
        }
        required = ["label", "rationale", "short_headlines", "descriptions"]
        if spec["long_headlines_count"] > 0:
            variant_props["long_headlines"] = {
                "type": "array",
                "items": {"type": "string", "maxLength": spec["long_headline_max_chars"]},
                "minItems": spec["long_headlines_count"],
                "maxItems": spec["long_headlines_count"],
                "description": (
                    f"Exactly {spec['long_headlines_count']} distinct long headlines, "
                    f"each ≤{spec['long_headline_max_chars']} chars"
                ),
            }
            required.append("long_headlines")
        if spec["needs_images"]:
            variant_props["image_prompts"] = {
                "type": "array",
                "items": {"type": "string"},
                "minItems": spec["descriptions_count"],
                "maxItems": spec["descriptions_count"],
                "description": (
                    f"Exactly {spec['descriptions_count']} single-line image prompts "
                    "(style + subject + mood). One per description."
                ),
            }
            required.append("image_prompts")

        return [
            ToolSpec(
                name="propose_creative_set",
                description=(
                    f"Submit 3 angle variants of a {spec['label']} asset pack. "
                    "Call ONCE with all 3 variants populated according to the "
                    "channel-specific schema."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "variants": {
                            "type": "array",
                            "minItems": 3,
                            "maxItems": 3,
                            "items": {
                                "type": "object",
                                "properties": variant_props,
                                "required": required,
                            },
                        },
                        "strategy_note": {
                            "type": "string",
                            "description": "Overall A/B test setup recommendation",
                        },
                    },
                    "required": ["variants"],
                },
                handler=self._handle_propose_creative_set,
            ),
        ]

    def _collect_char_violations(
        self, variants: list[dict], spec: dict[str, Any]
    ) -> list[dict]:
        """Walk every text field across all variants, return a list of
        over-limit items so Mira can rewrite them.

        Each violation entry tells Mira exactly which variant, which field,
        which index, the current length, and the limit — enough to surgically
        rewrite only the bad items without regenerating the whole asset pack.
        """
        out: list[dict] = []
        for vi, v in enumerate(variants):
            label = v.get("label", f"variant_{vi+1}")
            for field, limit_key in (
                ("short_headlines", "headline_max_chars"),
                ("long_headlines", "long_headline_max_chars"),
                ("descriptions", "description_max_chars"),
            ):
                limit = int(spec.get(limit_key, 0) or 0)
                if limit <= 0:
                    continue  # channel doesn't use this field
                items = v.get(field, []) or []
                for idx, text in enumerate(items):
                    if not isinstance(text, str):
                        continue
                    n = len(text)
                    if n > limit:
                        out.append(
                            {
                                "variant_label": label,
                                "field": field,
                                "index": idx,
                                "current_length": n,
                                "limit": limit,
                                "over_by": n - limit,
                                "text": text,
                            }
                        )
        return out

    async def _handle_propose_creative_set(
        self,
        variants: list[dict],
        strategy_note: str = "",
    ) -> dict[str, Any]:
        spec = self._spec

        # Step 1 — VALIDATION: walk every text field, collect anything that
        # exceeds the char limit. If anything is over, refuse the proposal
        # and return a structured error. Mira will see this in tool_result
        # and rewrite the offending items in the next iteration of her loop
        # (no separate Claude call, no external retry — same agent run).
        violations = self._collect_char_violations(variants, spec)
        if violations:
            self._validation_retries += 1
            if self._validation_retries <= MAX_VALIDATION_RETRIES:
                return {
                    "ok": False,
                    "error": "char_limit_violation",
                    "message": (
                        f"{len(violations)} text(s) exceed Google Ads char limits. "
                        "Rewrite ONLY the listed items shorter (drop filler words first, "
                        "keep the key benefit/CTA), then call propose_creative_set again "
                        "with the corrected variants."
                    ),
                    "violations": violations,
                    "retries_left": MAX_VALIDATION_RETRIES - self._validation_retries,
                }
            # Safety net: if Mira keeps overshooting after N retries, fall
            # back to hard truncation so we don't burn the run loop.
            logger.warning(
                "Mira hit char-limit retries (%d) — falling back to truncation",
                self._validation_retries,
            )

        result_variants = []
        for v in variants:
            short_headlines = v.get("short_headlines", []) or []
            long_headlines = v.get("long_headlines", []) or []
            descriptions = v.get("descriptions", []) or []
            image_prompts = v.get("image_prompts", []) or []

            # Safety-net truncation (only triggers if validation retries
            # were exhausted above — normal happy path skips this).
            short_headlines = [
                _truncate_to_limit(h, spec["headline_max_chars"]) for h in short_headlines
            ]
            long_headlines = [
                _truncate_to_limit(h, spec["long_headline_max_chars"]) for h in long_headlines
            ]
            descriptions = [
                _truncate_to_limit(d, spec["description_max_chars"]) for d in descriptions
            ]

            # Optional: generate one preview image from the first prompt
            # (only for channels that show images). The other prompts are saved
            # as text only — actual image gen for 5+ images would be expensive
            # and is deferred to Sprint 11+ when we wire pMax asset upload.
            preview_image: Optional[dict[str, Any]] = None
            if spec["needs_images"] and self.generate_images and image_prompts:
                try:
                    preview_image = await image_gen.generate_image(image_prompts[0], num_images=1)
                except Exception:
                    logger.exception("Failed to generate preview image")

            target = {
                "customer_id": self.customer_id,
                "campaign_id": self.campaign_id,
                "channel_type": (spec["label"]),
                "label": v.get("label", ""),
                "short_headlines": short_headlines,
                "long_headlines": long_headlines,
                "descriptions": descriptions,
                "image_prompts": image_prompts,
                "needs_images": spec["needs_images"],
                "preview_image_url": (preview_image or {}).get("urls", [None])[0],
                "preview_image_mock": (preview_image or {}).get("mock"),
            }
            try:
                action_id = await audit.write_proposed_action(
                    user_id=self.user_id,
                    agent_type="creative",
                    action_type="create_ad_variant",
                    target=target,
                    reasoning=v.get("rationale", ""),
                    confidence=0.75,
                )
            except Exception as e:
                logger.exception("Failed to persist creative variant")
                return {"ok": False, "error": str(e)}

            proposal = {
                "action_id": action_id,
                "action_type": "create_ad_variant",
                **target,
                "rationale": v.get("rationale", ""),
                "status": "proposed",
            }
            self._proposals.append(proposal)
            result_variants.append(proposal)

        return {
            "ok": True,
            "variants": result_variants,
            "strategy_note": strategy_note,
            "message": (
                f"Mira proposed {len(result_variants)} {spec['label']} variants "
                f"({spec['short_headlines_count']} headlines + "
                f"{spec['descriptions_count']} descriptions each)"
            ),
        }

    @property
    def proposals(self) -> list[dict]:
        return self._proposals


def _truncate_to_limit(text: str, limit: int) -> str:
    """Trim `text` to at most `limit` characters, preferring the last whole word.

    LLM-generated Google Ads copy frequently overshoots the 90-char description
    limit. Hard-truncating mid-word looks ugly ("...with fast deliv"), so:
    1. If already within limit → return as-is.
    2. Try to cut at the last space before `limit` so we end on a whole word.
    3. If a single token is longer than `limit` (rare — long URLs, hashtags),
       fall back to a hard cut at `limit` chars.

    No ellipsis appended — Google Ads copy reads better without "...".
    """
    if not text or len(text) <= limit:
        return text or ""
    # Look for a space we can break on. text[:limit+1] so we consider the
    # character at position `limit` as well (rfind on the prefix excluding it).
    candidate = text[:limit]
    last_space = candidate.rfind(" ")
    if last_space > 0:
        return candidate[:last_space].rstrip(" ,;.:!?-")
    # No space — hard cut.
    return candidate
