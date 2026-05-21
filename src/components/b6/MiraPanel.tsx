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

  useEffect(() => {
    if (!selectedCampaign && campaigns[0]) setSelectedCampaign(campaigns[0].id);
  }, [campaigns, selectedCampaign]);

  const loadExisting = useCallback(async () => {
    try {
      const res = await listActions({ limit: 30 });
      const creatives = res.actions
        .filter((a: AgentAction) => a.action_type === "create_ad_variant")
        .filter(
          (a: AgentAction) =>
            !selectedCampaign || a.target?.campaign_id === selectedCampaign,
        )
        .slice(0, 6)
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
        background: "linear-gradient(135deg, #1F232B 0%, #15181D 100%)",
        borderRadius: "14px",
        border: "1px solid #2D3340",
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
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#E0E6F7" }}>
            🎨 Mira — Creative Agent
          </div>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
            Generates 3 angle variants of a full asset pack for your campaign
            type{detectedChannelType ? ` · last gen: ${detectedChannelType}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            disabled={running}
            style={{
              padding: "6px 10px",
              background: "#0F1116",
              border: "1px solid #2D3340",
              color: "#FFFFFF",
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
                ? "#2D3340"
                : "linear-gradient(135deg, #FF8E53, #FF6B6B)",
              border: "none",
              color: running ? "#666" : "#FFFFFF",
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
            background: "#FF6B6B22",
            border: "1px solid #FF6B6B44",
            borderRadius: "6px",
            color: "#FF6B6B",
            fontSize: "11px",
            marginBottom: "10px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {variants.length === 0 && !running ? (
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
        background: "#0F1116",
        border: "1px solid #2D3340",
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
                color: "#A0A0A0",
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
              background: "#FF8E5322",
              color: "#FF8E53",
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
              background: "#7F9CF522",
              color: "#7F9CF5",
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
            color="#C0C6D7"
          />
        )}

        {/* Image prompts — only for channels that need them */}
        {v.needs_images && v.image_prompts.length > 0 && (
          <Section
            label={`🎨 Image prompts (${v.image_prompts.length})`}
            items={v.image_prompts}
            color="#A0A0A0"
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
          <div style={{ fontSize: "11px", color: "#C0C6D7", lineHeight: 1.5 }}>
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
            background: copied ? "#34D39922" : "transparent",
            border: `1px solid ${copied ? "#34D39988" : "#2D3340"}`,
            color: copied ? "#34D399" : "#A0A0A0",
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
}> = ({ label, items, maxChars, color = "#E0E6F7", italic }) => (
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
                  color: overLimit ? "#FF6B6B" : "#444",
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
