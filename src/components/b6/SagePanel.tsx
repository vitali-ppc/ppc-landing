"use client";

import React, { useState, useEffect, useCallback } from "react";
import { runAgent, listActions } from "@/lib/b6-api";
import type { AgentAction, CampaignFromAPI } from "@/lib/b6-api";

type Keyword = {
  action_id: string;
  keyword: string;
  match_type: string;
  theme: string;
  estimated_intent?: string;
  rationale: string;
};

type Audience = {
  action_id: string;
  audience_label: string;
  audience_type: string;
  description: string;
  rationale: string;
};

const MATCH_COLORS: Record<string, string> = {
  EXACT: "#4ECDC4",
  PHRASE: "#7F9CF5",
  BROAD: "#FFA726",
};

const INTENT_LABEL: Record<string, string> = {
  commercial: "💰 Commercial",
  informational: "📚 Informational",
  navigational: "🎯 Navigational",
};

export const SagePanel: React.FC<{
  campaigns: CampaignFromAPI[];
  customerId: string;
  onChange?: () => void;
}> = ({ campaigns, customerId, onChange }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>(campaigns[0]?.id || "");
  const [running, setRunning] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Collapsible body — persisted across reloads. Default collapsed because
  // the keyword + audience grids can scroll into a tall block.
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("b6_sage_open") === "1";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("b6_sage_open", open ? "1" : "0");
  }, [open]);

  useEffect(() => {
    if (!selectedCampaign && campaigns[0]) setSelectedCampaign(campaigns[0].id);
  }, [campaigns, selectedCampaign]);

  const loadExisting = useCallback(async () => {
    try {
      const res = await listActions({ limit: 50 });
      const kws: Keyword[] = [];
      const auds: Audience[] = [];
      for (const a of res.actions as AgentAction[]) {
        const t = (a.target || {}) as Record<string, string>;
        if (selectedCampaign && t.campaign_id !== selectedCampaign) continue;
        if (a.action_type === "add_keyword") {
          kws.push({
            action_id: a.id,
            keyword: t.keyword || "",
            match_type: t.match_type || "PHRASE",
            theme: t.theme || "—",
            estimated_intent: t.estimated_intent,
            rationale: a.reasoning,
          });
        } else if (a.action_type === "add_audience") {
          auds.push({
            action_id: a.id,
            audience_label: t.audience_label || "",
            audience_type: t.audience_type || "in-market",
            description: t.description || "",
            rationale: a.reasoning,
          });
        }
      }
      setKeywords(kws.slice(0, 15));
      setAudiences(auds.slice(0, 8));
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
        agentType: "research",
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

  // Group keywords by theme
  const groupedKeywords = keywords.reduce((acc, k) => {
    if (!acc[k.theme]) acc[k.theme] = [];
    acc[k.theme].push(k);
    return acc;
  }, {} as Record<string, Keyword[]>);

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
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title={open ? "Collapse Sage" : "Expand Sage"}
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
              color: "#A0A0A0",
              fontSize: 11,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 100ms",
            }}
          >
            ▶
          </span>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#E0E6F7" }}>
              🦉 Sage — Research Agent
              {(keywords.length > 0 || audiences.length > 0) && (
                <span
                  style={{
                    marginLeft: 8,
                    padding: "2px 8px",
                    background: "#7F9CF522",
                    color: "#7F9CF5",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {keywords.length} kw · {audiences.length} aud
                </span>
              )}
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              Finds new keywords, audiences and competitor opportunities
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
              background: running ? "#2D3340" : "linear-gradient(135deg, #7F9CF5, #4A5BB8)",
              border: "none",
              color: running ? "#666" : "#FFFFFF",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: running ? "wait" : "pointer",
            }}
          >
            {running ? "🦉 Sage is searching..." : "Run research"}
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

      {open && (keywords.length === 0 && audiences.length === 0 && !running ? (
        <div
          style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#666",
            fontSize: "13px",
          }}
        >
          Sage hasn't researched yet. Hit "Run research" — finds keywords and audiences.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
          {/* Keywords */}
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#A0A0A0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              🔑 Suggested Keywords ({keywords.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "400px", overflowY: "auto" }}>
              {Object.entries(groupedKeywords).map(([theme, kws]) => (
                <div key={theme}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                      paddingLeft: "4px",
                    }}
                  >
                    {theme}
                  </div>
                  {kws.map((k) => (
                    <KeywordRow key={k.action_id} kw={k} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Audiences */}
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#A0A0A0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              👥 Audiences ({audiences.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
              {audiences.map((a) => (
                <AudienceRow key={a.action_id} a={a} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const KeywordRow: React.FC<{ kw: Keyword }> = ({ kw }) => {
  const color = MATCH_COLORS[kw.match_type] || "#A0A0A0";
  return (
    <div
      style={{
        padding: "8px 10px",
        background: "#0F1116",
        borderLeft: `2px solid ${color}`,
        borderRadius: "6px",
        marginBottom: "4px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
        <span
          style={{
            padding: "1px 6px",
            background: `${color}22`,
            color,
            borderRadius: "4px",
            fontSize: "9px",
            fontWeight: 700,
          }}
        >
          {kw.match_type}
        </span>
        <span style={{ fontSize: "13px", color: "#E0E6F7", fontWeight: 500 }}>
          {kw.keyword}
        </span>
        {kw.estimated_intent && (
          <span style={{ fontSize: "10px", color: "#666" }}>{INTENT_LABEL[kw.estimated_intent] || kw.estimated_intent}</span>
        )}
      </div>
      <div style={{ fontSize: "11px", color: "#A0A0A0", lineHeight: 1.4 }}>
        {kw.rationale}
      </div>
    </div>
  );
};

const AudienceRow: React.FC<{ a: Audience }> = ({ a }) => (
  <div
    style={{
      padding: "10px 12px",
      background: "#0F1116",
      borderLeft: "2px solid #7F9CF5",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "4px",
      }}
    >
      <span
        style={{
          padding: "1px 6px",
          background: "#7F9CF522",
          color: "#7F9CF5",
          borderRadius: "4px",
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        {a.audience_type}
      </span>
      <span style={{ fontSize: "13px", color: "#E0E6F7", fontWeight: 600 }}>
        {a.audience_label}
      </span>
    </div>
    <div style={{ fontSize: "11px", color: "#C0C6D7", lineHeight: 1.5, marginBottom: "4px" }}>
      {a.description}
    </div>
    <div
      style={{
        fontSize: "10px",
        color: "#A0A0A0",
        fontStyle: "italic",
        paddingTop: "4px",
        borderTop: "1px dashed #2D3340",
      }}
    >
      💡 {a.rationale}
    </div>
  </div>
);
