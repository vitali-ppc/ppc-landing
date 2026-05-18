"use client";

import React, { useState, useEffect, useCallback } from "react";
import { runAgent, listActions } from "@/lib/b6-api";
import type { AgentAction, CampaignFromAPI } from "@/lib/b6-api";

type CreativeVariant = {
  action_id: string;
  label: string;
  headline_1: string;
  headline_2: string;
  description: string;
  image_prompt: string;
  image_url: string | null;
  image_mock: boolean;
  campaign_id: string;
  rationale: string;
  status: string;
  created_at: string;
};

export const MiraPanel: React.FC<{ campaigns: CampaignFromAPI[]; customerId: string; onChange?: () => void }> = ({
  campaigns,
  customerId,
  onChange,
}) => {
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
        .filter((a: AgentAction) => !selectedCampaign || a.target?.campaign_id === selectedCampaign)
        .slice(0, 6)
        .map((a: AgentAction) => ({
          action_id: a.id,
          label: (a.target as Record<string, string>).label || "Variant",
          headline_1: (a.target as Record<string, string>).headline_1 || "",
          headline_2: (a.target as Record<string, string>).headline_2 || "",
          description: (a.target as Record<string, string>).description || "",
          image_prompt: (a.target as Record<string, string>).image_prompt || "",
          image_url: (a.target as Record<string, string | null>).image_url ?? null,
          image_mock: Boolean((a.target as Record<string, boolean>).image_mock),
          campaign_id: (a.target as Record<string, string>).campaign_id || "",
          rationale: a.reasoning,
          status: a.status,
          created_at: a.created_at,
        }));
      setVariants(creatives as CreativeVariant[]);
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
            Generates 3 ad variants based on campaign data
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
              background: running ? "#2D3340" : "linear-gradient(135deg, #FF8E53, #FF6B6B)",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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

const VariantCard: React.FC<{ v: CreativeVariant }> = ({ v }) => (
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
    {v.image_url && (
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          background: `url(${v.image_url}) center/cover`,
          position: "relative",
        }}
      >
        {v.image_mock && (
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "8px",
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
        <span style={{ fontSize: "10px", color: "#666" }}>
          status: {v.status}
        </span>
      </div>

      {/* Google Ads style preview */}
      <div
        style={{
          background: "#15181D",
          padding: "10px 12px",
          borderRadius: "8px",
          marginBottom: "10px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: "10px", color: "#999", marginBottom: "4px" }}>
          Ad · kampaio.com
        </div>
        <div
          style={{
            color: "#7F9CF5",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.3,
            marginBottom: "4px",
          }}
        >
          {v.headline_1} | {v.headline_2}
        </div>
        <div style={{ color: "#C0C6D7", fontSize: "12px", lineHeight: 1.4 }}>
          {v.description}
        </div>
      </div>

      <div style={{ marginBottom: "6px" }}>
        <div
          style={{
            fontSize: "9px",
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "2px",
          }}
        >
          🎨 Image prompt
        </div>
        <div style={{ fontSize: "11px", color: "#A0A0A0", lineHeight: 1.4 }}>
          {v.image_prompt}
        </div>
      </div>

      <div>
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
    </div>
  </div>
);
