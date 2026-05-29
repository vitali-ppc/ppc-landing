"use client";

import React, { useState, useEffect, useCallback } from "react";
import { runAgent, listActions } from "@/lib/b6-api";
import type { AgentAction, CampaignFromAPI } from "@/lib/b6-api";

type CreativeVariant = {
  action_id: string;
  label: string;
  campaign_id: string;
  channel_type: string;
  needs_images: boolean;
  short_headlines: string[];
  long_headlines: string[];
  descriptions: string[];
  image_prompts: string[];
  preview_image_url: string | null;
  preview_image_mock: boolean;
  rationale: string;
  status: string;
  created_at: string;
};

const asStringArray = (v: unknown): string[] => {
  if (Array.isArray(v)) return v.filter((x) => typeof x === "string") as string[];
  return [];
};

const asBool = (v: unknown): boolean => v === true;

const asString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

export const MiraPanel: React.FC<{
  campaigns: CampaignFromAPI[];
  customerId: string;
  onChange?: () => void;
}> = ({ campaigns, customerId, onChange }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>(campaigns[0]?.id || "");
  const [running, setRunning] = useState(false);
  const [variants, setVariants] = useState<CreativeVariant[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Collapsible body — persisted across page reloads. Default collapsed
  // because the full 3-variant grid (45 headlines + 12 descriptions) eats
  // a lot of vertical space and most of the time the user just wants to
  // know the agent ran, then expand when they need to copy copy.
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("b6_mira_open");
    return stored === "1";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("b6_mira_open", open ? "1" : "0");
  }, [open]);

  useEffect(() => {
    if (!selectedCampaign && campaigns[0]) setSelectedCampaign(campaigns[0].id);
  }, [campaigns, selectedCampaign]);

  const loadExisting = useCallback(async () => {
    try {
      const res = await listActions({ limit: 30 });
      // One Generate run always creates exactly 3 variants. Show only the
      // latest run — older runs stay in the DB as audit history but UI
      // shouldn't double-render them. listActions returns newest first,
      // so .slice(0, 3) is the most recent batch.
      const creatives = res.actions
        .filter((a: AgentAction) => a.action_type === "create_ad_variant")
        .filter(
          (a: AgentAction) =>
            !selectedCampaign || a.target?.campaign_id === selectedCampaign,
        )
        .slice(0, 3)
        .map((a: AgentAction) => {
          const t = (a.target ?? {}) as Record<string, unknown>;
          return {
            action_id: a.id,
            label: asString(t.label, "Variant"),
            campaign_id: asString(t.campaign_id),
            channel_type: asString(t.channel_type, "Search RSA"),
            needs_images: asBool(t.needs_images),
            short_headlines: asStringArray(t.short_headlines),
            long_headlines: asStringArray(t.long_headlines),
            descriptions: asStringArray(t.descriptions),
            image_prompts: asStringArray(t.image_prompts),
            preview_image_url:
              typeof t.preview_image_url === "string"
                ? (t.preview_image_url as string)
                : null,
            preview_image_mock: asBool(t.preview_image_mock),
            rationale: a.reasoning,
            status: a.status,
            created_at: a.created_at,
          } as CreativeVariant;
        });
      setVariants(creatives);
    } catch (e) {
      console.warn(e);
    }
  }, [selectedCampaign]);

  useEffect(() => {
    loadExisting();
  }, [loadExisting]);

  const onRun = async () => {
    if (!selectedCampaign) {
      setError("Select a campaign first");
      return;
    }
    setError(null);
    setRunning(true);
    try {
      await runAgent({
        agentType: "creative",
        customerId,
        campaignId: selectedCampaign,
      });
      await loadExisting();
      if (onChange) onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  };

  // Look up which channel_type was used for the current variants (from the
  // first variant). Falls back to "Search RSA" if no variants yet.
  const detectedChannelType = variants[0]?.channel_type || null;

  return (
    <section
      style={{
        padding: "20px",
        background: "linear-gradient(135deg, #FFFFFF 0%, #F6F8FB 100%)",
        borderRadius: "14px",
        border: "1px solid #DCE3ED",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title={open ? "Collapse Mira" : "Expand Mira"}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              color: "#5B6979",
              fontSize: 11,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 100ms",
            }}
          >
            ▶
          </span>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D1320" }}>
              🎨 Mira — Creative Agent
              {variants.length > 0 && (
                <span
                  style={{
                    marginLeft: 8,
                    padding: "2px 8px",
                    background: "#C2410C22",
                    color: "#C2410C",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {variants.length} variants ready
                </span>
              )}
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              Generates 3 angle variants of a full asset pack for your campaign
              type{detectedChannelType ? ` · last gen: ${detectedChannelType}` : ""}
            </div>
          </div>
        </button>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            disabled={running}
            style={{
              padding: "6px 10px",
              background: "#EEF2F8",
              border: "1px solid #DCE3ED",
              color: "#0D1320",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id})
              </option>
            ))}
          </select>
          <button
            onClick={onRun}
            disabled={running}
            style={{
              padding: "6px 14px",
              background: running
                ? "#DCE3ED"
                : "linear-gradient(135deg, #C2410C, #DC2626)",
              border: "none",
              color: running ? "#666" : "#0D1320",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: running ? "wait" : "pointer",
            }}
          >
            {running ? "🎨 Mira is creating..." : "Generate"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "8px 10px",
            background: "#DC262622",
            border: "1px solid #DC262644",
            borderRadius: "6px",
            color: "#DC2626",
            fontSize: "11px",
            marginBottom: "10px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {open && (
        variants.length === 0 && !running ? (
          <div
            style={{
              padding: "30px 20px",
              textAlign: "center",
              color: "#666",
              fontSize: "13px",
            }}
          >
            Mira hasn't generated creatives for this campaign yet. Hit "Generate".
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "14px",
            }}
          >
            {variants.map((v) => (
              <VariantCard key={v.action_id} v={v} />
            ))}
          </div>
        )
      )}
    </section>
  );
};

// ── Variant card ────────────────────────────────────────────────────────────

const VariantCard: React.FC<{ v: CreativeVariant }> = ({ v }) => {
  const allCopied = [
    ...v.short_headlines.map((h) => `H: ${h}`),
    ...v.long_headlines.map((h) => `LH: ${h}`),
    ...v.descriptions.map((d) => `D: ${d}`),
    ...(v.needs_images ? v.image_prompts.map((p) => `IMG: ${p}`) : []),
  ].join("\n");
  const [copied, setCopied] = React.useState(false);
  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(allCopied);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API blocked (insecure context / old browser) — fail quietly.
    }
  }, [allCopied]);

  return (
    <div
      style={{
        background: "#EEF2F8",
        border: "1px solid #DCE3ED",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Preview image — only show if channel supports images AND we have one */}
      {v.needs_images && v.preview_image_url && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: `url(${v.preview_image_url}) center/cover`,
            position: "relative",
          }}
        >
          {v.preview_image_mock && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                padding: "2px 6px",
                background: "rgba(0,0,0,0.7)",
                color: "#5B6979",
                fontSize: "9px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              mock
            </div>
          )}
        </div>
      )}

      <div style={{ padding: "12px 14px" }}>
        {/* Header: angle + channel + counts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "2px 8px",
              background: "#C2410C22",
              color: "#C2410C",
              borderRadius: "999px",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {v.label}
          </span>
          <span
            title={`Channel: ${v.channel_type}`}
            style={{
              padding: "2px 8px",
              background: "#4F5BC922",
              color: "#4F5BC9",
              borderRadius: "999px",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {v.channel_type}
          </span>
          <span style={{ fontSize: "10px", color: "#666", marginLeft: "auto" }}>
            status: {v.status}
          </span>
        </div>

        {/* Short headlines */}
        {v.short_headlines.length > 0 && (
          <Section
            label={`Short headlines (${v.short_headlines.length})`}
            items={v.short_headlines}
            maxChars={30}
          />
        )}

        {/* Long headlines */}
        {v.long_headlines.length > 0 && (
          <Section
            label={`Long headlines (${v.long_headlines.length})`}
            items={v.long_headlines}
            maxChars={90}
          />
        )}

        {/* Descriptions */}
        {v.descriptions.length > 0 && (
          <Section
            label={`Descriptions (${v.descriptions.length})`}
            items={v.descriptions}
            maxChars={90}
            color="#37445A"
          />
        )}

        {/* Image prompts — only for channels that need them */}
        {v.needs_images && v.image_prompts.length > 0 && (
          <Section
            label={`🎨 Image prompts (${v.image_prompts.length})`}
            items={v.image_prompts}
            color="#5B6979"
            italic
          />
        )}

        {/* Why */}
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              fontSize: "9px",
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            💡 Why
          </div>
          <div style={{ fontSize: "11px", color: "#37445A", lineHeight: 1.5 }}>
            {v.rationale}
          </div>
        </div>

        {/* Copy all — flips to "✓ Copied!" for 1.5s on click */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy all headlines + descriptions to clipboard"
          style={{
            marginTop: "12px",
            padding: "6px 10px",
            background: copied ? "#05966922" : "transparent",
            border: `1px solid ${copied ? "#05966988" : "#DCE3ED"}`,
            color: copied ? "#059669" : "#5B6979",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: copied ? 600 : 400,
            cursor: "pointer",
            width: "100%",
            transition: "background 120ms, border-color 120ms, color 120ms",
          }}
        >
          {copied ? "✓ Copied!" : "📋 Copy all to clipboard"}
        </button>
      </div>
    </div>
  );
};

const Section: React.FC<{
  label: string;
  items: string[];
  maxChars?: number;
  color?: string;
  italic?: boolean;
}> = ({ label, items, maxChars, color = "#0D1320", italic }) => (
  <div style={{ marginBottom: "10px" }}>
    <div
      style={{
        fontSize: "9px",
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "4px",
      }}
    >
      {label}
    </div>
    <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((s, i) => {
        const overLimit = maxChars && s.length > maxChars;
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "baseline",
              fontSize: "12px",
              color,
              fontStyle: italic ? "italic" : "normal",
              lineHeight: 1.5,
              padding: "2px 0",
            }}
          >
            <span style={{ color: "#444", fontSize: "10px", minWidth: 14 }}>
              {i + 1}.
            </span>
            <span style={{ flex: 1 }}>{s}</span>
            {maxChars && (
              <span
                style={{
                  fontSize: "9px",
                  color: overLimit ? "#DC2626" : "#444",
                  flexShrink: 0,
                }}
              >
                {s.length}/{maxChars}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </div>
);
