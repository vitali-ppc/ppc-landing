"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { listActions, listAgents, listCampaigns, listConnectedAccounts } from "@/lib/b6-api";
import type { AgentAction, Agent, CampaignFromAPI, ConnectedAccount } from "@/lib/b6-api";
import { CampaignCard, type CampaignMetrics } from "@/components/b6/CampaignCard";
import { ActivityFeed } from "@/components/b6/ActivityFeed";
import { ApprovalQueue } from "@/components/b6/ApprovalQueue";
import { RunBuzzButton } from "@/components/b6/RunBuzzButton";
import { LiveEventStream } from "@/components/b6/LiveEventStream";
import { MascotLayer } from "@/components/b6/MascotLayer";
import { DigestPanel } from "@/components/b6/DigestPanel";
import { MaximusPanel } from "@/components/b6/MaximusPanel";
import { MiraPanel } from "@/components/b6/MiraPanel";
import { SagePanel } from "@/components/b6/SagePanel";
import { GoogleAdsConnect } from "@/components/b6/GoogleAdsConnect";
import { useB6Events } from "@/lib/b6-socket";

const MOCK_activeCustomerId = "1234567890"; // fallback if no real connections
const REFRESH_INTERVAL_MS = 5000; // poll actions/agents (live events приходят через socket)

const apiToCampaignMetrics = (c: CampaignFromAPI): CampaignMetrics => ({
  id: c.id,
  name: c.name,
  status: c.status,
  budget_micros: c.budget_micros,
  bid_strategy: c.bid_strategy,
  roas: c.roas,
  ctr: c.ctr,
  spend_usd: c.spend_usd,
  conversions: c.conversions,
});

export default function B6Dashboard() {
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([]);
  const [rawCampaigns, setRawCampaigns] = useState<CampaignFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ iterations?: number; tool_calls?: number }>({});
  const [activeCustomerId, setActiveCustomerId] = useState<string>(MOCK_activeCustomerId);

  // Live events через Socket.IO
  const { events: liveEvents, connected, clear: clearEvents } = useB6Events();

  // Pick active customer_id from user's connected accounts (first is_active=true).
  // Falls back to MOCK_activeCustomerId if no connections yet.
  useEffect(() => {
    listConnectedAccounts()
      .then((accounts) => {
        const active = accounts.find((a) => a.is_active);
        if (active) setActiveCustomerId(active.google_customer_id);
      })
      .catch((e) => console.warn("Failed to load active customer_id:", e));
  }, []);

  // Подсветка активной кампании по последнему live event с campaign_id
  const highlightedCampaign = useMemo(() => {
    for (let i = liveEvents.length - 1; i >= 0; i--) {
      const e = liveEvents[i];
      if (e.event_type === "agent.calling_tool" && e.input) {
        // ищем "campaign_id":"100001" в input
        const m = e.input.match(/"campaign_id"\s*:\s*"(\d+)"/);
        if (m) {
          // Если это событие за последние 5 секунд — подсвечиваем
          const ageMs = Date.now() - new Date(e.ts).getTime();
          if (ageMs < 5000) return m[1];
        }
      }
      if (e.event_type === "session.complete") return null;
    }
    return null;
  }, [liveEvents]);

  const refresh = useCallback(async () => {
    try {
      const [actRes, agRes, campRes] = await Promise.all([
        listActions({ limit: 30 }),
        listAgents(),
        listCampaigns(activeCustomerId).catch((e) => {
          console.warn("Campaigns fetch failed", e);
          return { count: 0, campaigns: [] };
        }),
      ]);
      setActions(actRes.actions);
      setAgents(agRes.agents);
      setCampaigns(campRes.campaigns.map(apiToCampaignMetrics));
      setRawCampaigns(campRes.campaigns);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [activeCustomerId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  const pending = actions.filter((a) => a.status === "proposed" || a.status === "pending_approval");
  const historical = actions.filter((a) => a.status !== "proposed" && a.status !== "pending_approval");

  const counts = actions.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Aegis блокировал — actions с risk_review.recommendation = 'block'
  const aegisBlocks = actions.filter((a) => a.risk_review?.recommendation === "block").length;
  const aegisHighRisk = actions.filter(
    (a) => a.risk_review && a.risk_review.risk_score >= 60
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#15181D",
        padding: "24px",
        color: "#FFFFFF",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <MascotLayer events={liveEvents} />
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
              🤖 B6 — Your AI PPC Cabinet
            </h1>
            <div style={{ color: "#A0A0A0", fontSize: "13px", marginTop: "4px" }}>
              Customer <code style={{ color: "#7F9CF5" }}>{activeCustomerId}</code> · mock mode ·{" "}
              {agents.length === 0
                ? "Buzz ещё не запускался"
                : `${agents.length} агент${agents.length === 1 ? "" : "ов"} · последний запуск: ${
                    agents[0].last_run_at
                      ? new Date(agents[0].last_run_at).toLocaleTimeString("ru-RU")
                      : "—"
                  }`}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={clearEvents}
              title="Очистить live-feed"
              style={{
                padding: "8px 12px",
                background: "transparent",
                border: "1px solid #2D3340",
                color: "#A0A0A0",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              clear feed
            </button>
            <RunBuzzButton
              customerId={activeCustomerId}
              onComplete={(r) => {
                setStats({ iterations: r.iterations, tool_calls: r.tool_calls });
                refresh();
              }}
            />
          </div>
        </header>

        {/* Google Ads connection status */}
        <GoogleAdsConnect onChange={refresh} />

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <StatBox label="Pending" value={counts.proposed || 0} color="#FFA726" />
          <StatBox label="Applied" value={counts.applied || 0} color="#4ECDC4" />
          <StatBox label="Rejected" value={counts.rejected || 0} color="#FF6B6B" />
          <StatBox label="🛡️ Blocks" value={aegisBlocks} color="#FF6B6B" />
          <StatBox label="🛡️ High-risk" value={aegisHighRisk} color="#FFA726" />
          <StatBox label="Tool calls (last)" value={stats.tool_calls || "—"} color="#7F9CF5" />
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "#FF6B6B22",
              border: "1px solid #FF6B6B66",
              borderRadius: "8px",
              color: "#FF6B6B",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            ⚠️ {error}
            <br />
            <span style={{ color: "#A0A0A0", fontSize: "11px" }}>
              Backend на http://localhost:8000 — он живой? Запусти:{" "}
              <code>cd ai-server && uvicorn app:app --port 8000</code>
            </span>
          </div>
        )}

        {/* Campaigns */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", color: "#E0E6F7" }}>
            📊 Кампании ({campaigns.length})
            {highlightedCampaign && (
              <span style={{ marginLeft: "10px", color: "#00FFE7", fontSize: "12px", fontWeight: 500 }}>
                · 🐝 Buzz смотрит на {highlightedCampaign}
              </span>
            )}
          </h2>
          {campaigns.length === 0 ? (
            <div style={{ padding: "20px", background: "#1F232B", borderRadius: "10px", textAlign: "center", color: "#A0A0A0" }}>
              Кампании ещё не загружены...
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {campaigns.map((c) => (
                <CampaignCard
                  key={c.id}
                  campaign={c}
                  highlighted={highlightedCampaign === c.id}
                />
              ))}
            </div>
          )}
        </section>

        {/* Live event stream */}
        <section style={{ marginBottom: "20px" }}>
          <LiveEventStream events={liveEvents} connected={connected} />
        </section>

        {/* Maximus + Echo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <MaximusPanel onChange={refresh} />
          <DigestPanel />
        </div>

        {/* Mira — full width */}
        <section style={{ marginBottom: "20px" }}>
          <MiraPanel
            campaigns={rawCampaigns}
            customerId={activeCustomerId}
            onChange={refresh}
          />
        </section>

        {/* Sage — full width */}
        <section style={{ marginBottom: "20px" }}>
          <SagePanel
            campaigns={rawCampaigns}
            customerId={activeCustomerId}
            onChange={refresh}
          />
        </section>

        {/* Approval queue + Activity feed */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", color: "#E0E6F7" }}>
              ⏳ Ожидают апрува ({pending.length})
            </h2>
            <ApprovalQueue pending={pending} onActionChange={refresh} />
          </section>

          <section>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", color: "#E0E6F7" }}>
              📜 Activity Feed ({historical.length})
            </h2>
            <ActivityFeed actions={historical.slice(0, 15)} />
          </section>
        </div>

        {loading && (
          <div style={{ textAlign: "center", color: "#A0A0A0", fontSize: "12px", marginTop: "16px" }}>
            Загрузка...
          </div>
        )}

        <footer style={{ marginTop: "32px", textAlign: "center", color: "#666", fontSize: "11px" }}>
          B6 v0.3 · Day 3 build · auto-refresh каждые {REFRESH_INTERVAL_MS / 1000}с
        </footer>
      </div>
    </div>
  );
}

const StatBox: React.FC<{ label: string; value: number | string; color: string }> = ({ label, value, color }) => (
  <div
    style={{
      padding: "12px",
      background: "#1F232B",
      borderRadius: "10px",
      borderTop: `3px solid ${color}`,
    }}
  >
    <div style={{ color: "#A0A0A0", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </div>
    <div style={{ color, fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>{value}</div>
  </div>
);
