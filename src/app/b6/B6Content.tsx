"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  listActions,
  listAgents,
  listCampaigns,
  listConnectedAccounts,
  listRecentAnomalies,
} from "@/lib/b6-api";
import type { AgentAction, Agent, CampaignFromAPI, ConnectedAccount } from "@/lib/b6-api";
import { CampaignCard, type CampaignMetrics } from "@/components/b6/CampaignCard";
import { ActivityFeed } from "@/components/b6/ActivityFeed";
import { ApprovalQueue } from "@/components/b6/ApprovalQueue";
import { RunBuzzButton } from "@/components/b6/RunBuzzButton";
import { RunVoxButton } from "@/components/b6/RunVoxButton";
import { LiveEventStream } from "@/components/b6/LiveEventStream";
import { MascotLayer } from "@/components/b6/MascotLayer";
import { DigestPanel } from "@/components/b6/DigestPanel";
import { MaximusPanel } from "@/components/b6/MaximusPanel";
import { MiraPanel } from "@/components/b6/MiraPanel";
import { SagePanel } from "@/components/b6/SagePanel";
import { VigilPanel } from "@/components/b6/VigilPanel";
import { GoogleAdsConnect } from "@/components/b6/GoogleAdsConnect";
import { DateRangePicker, defaultDateRange, type DateRange } from "@/components/b6/DateRangePicker";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/useAuth";
import { useB6Events } from "@/lib/b6-socket";

const NO_CUSTOMER_PLACEHOLDER = "..."; // shown until user connects a Google Ads account
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

export default function B6Content() {
  return (
    <AuthGuard>
      <B6Dashboard />
    </AuthGuard>
  );
}

function B6Dashboard() {
  const { user, logout } = useAuth();
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([]);
  const [rawCampaigns, setRawCampaigns] = useState<CampaignFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ iterations?: number; tool_calls?: number }>({});
  const [vigilAlerts24h, setVigilAlerts24h] = useState<number>(0);
  const [activeCustomerId, setActiveCustomerId] = useState<string>("");
  const [campaignFilter, setCampaignFilter] = useState<"all" | "enabled" | "paused">("all");
  const [dateRange, setDateRange] = useState<DateRange>(() => defaultDateRange());
  const [campaignsOpen, setCampaignsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = window.localStorage.getItem("b6_campaigns_open");
    return v === null ? true : v === "1";
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("b6_campaigns_open", campaignsOpen ? "1" : "0");
    }
  }, [campaignsOpen]);

  // Live events через Socket.IO
  const { events: liveEvents, connected, clear: clearEvents } = useB6Events();

  // Pick active customer_id from user's connected accounts (first is_active=true).
  // Empty if no connections yet, UI shows the onboarding CTA from GoogleAdsConnect.
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
          // Если это событие за последние 5 секунд, подсвечиваем
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
      const [actRes, agRes, campRes, anomRes] = await Promise.all([
        listActions({ limit: 30 }),
        listAgents(),
        activeCustomerId
          ? listCampaigns(activeCustomerId, true, dateRange.days).catch((e) => {
              console.warn("Campaigns fetch failed", e);
              return { count: 0, campaigns: [] };
            })
          : Promise.resolve({ count: 0, campaigns: [] }),
        listRecentAnomalies({ days: 1 }).catch((e) => {
          console.warn("Anomalies fetch failed", e);
          return null;
        }),
      ]);
      setActions(actRes.actions);
      setAgents(agRes.agents);
      setCampaigns(campRes.campaigns.map(apiToCampaignMetrics));
      setRawCampaigns(campRes.campaigns);
      setVigilAlerts24h(anomRes?.count ?? 0);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [activeCustomerId, dateRange.days]);

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

  // Aegis блокировал, actions с risk_review.recommendation = 'block'
  const aegisBlocks = actions.filter((a) => a.risk_review?.recommendation === "block").length;
  const aegisHighRisk = actions.filter(
    (a) => a.risk_review && a.risk_review.risk_score >= 60
  ).length;

  // Campaign filter: счётчики по статусу + отфильтрованный список
  const enabledCount = campaigns.filter((c) => c.status === "ENABLED").length;
  const pausedCount = campaigns.filter((c) => c.status === "PAUSED").length;
  const filteredCampaigns = campaigns.filter((c) => {
    if (campaignFilter === "enabled") return c.status === "ENABLED";
    if (campaignFilter === "paused") return c.status === "PAUSED";
    return true;
  });

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
              🤖 B6, Your AI PPC Cabinet
            </h1>
            <div style={{ color: "#A0A0A0", fontSize: "13px", marginTop: "4px" }}>
              {user?.email && <span style={{ marginRight: 8 }}>{user.email} ·</span>}
              Customer <code style={{ color: "#7F9CF5" }}>{activeCustomerId || NO_CUSTOMER_PLACEHOLDER}</code>
              {activeCustomerId ? " · prod data" : " · no Google Ads connected yet"} ·{" "}
              {agents.length === 0
                ? "Buzz hasn't run yet"
                : `${agents.length} agent${agents.length === 1 ? "" : "s"} · last run: ${
                    agents[0].last_run_at
                      ? new Date(agents[0].last_run_at).toLocaleTimeString("en-US")
                      : "..."
                  }`}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={clearEvents}
              title="Clear live feed"
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
            <button
              onClick={() => logout("/")}
              title="Sign out"
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
              sign out
            </button>
            <RunBuzzButton
              customerId={activeCustomerId}
              onComplete={(r) => {
                setStats({ iterations: r.iterations, tool_calls: r.tool_calls });
                refresh();
              }}
            />
            <RunVoxButton
              customerId={activeCustomerId}
              onComplete={(r) => {
                setStats({ iterations: r.iterations, tool_calls: r.tool_calls });
                refresh();
              }}
            />
          </div>
        </header>

        {/* Google Ads connection status */}
        <GoogleAdsConnect
          activeCustomerId={activeCustomerId}
          onSelectCustomer={setActiveCustomerId}
          onChange={refresh}
        />

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <StatBox label="Pending" value={counts.proposed || 0} color="#FFA726" />
          <StatBox label="Applied" value={counts.applied || 0} color="#4ECDC4" />
          <StatBox label="Rejected" value={counts.rejected || 0} color="#FF6B6B" />
          <StatBox label="🛡️ Blocks" value={aegisBlocks} color="#FF6B6B" />
          <StatBox label="🛡️ High-risk" value={aegisHighRisk} color="#FFA726" />
          <StatBox label="🦇 Alerts (24h)" value={vigilAlerts24h} color="#9F7AEA" />
          <StatBox label="Tool calls (last)" value={stats.tool_calls || "..."} color="#7F9CF5" />
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
              Backend at http://localhost:8000 — is it running? Start with:{" "}
              <code>cd ai-server && uvicorn app:app --port 8000</code>
            </span>
          </div>
        )}

        {/* Campaigns */}
        <section style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: campaignsOpen ? "12px" : 0,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={() => setCampaignsOpen((v) => !v)}
              aria-expanded={campaignsOpen}
              title={campaignsOpen ? "Collapse campaigns" : "Expand campaigns"}
              style={{
                background: "transparent",
                border: "none",
                padding: "4px 0",
                cursor: "pointer",
                color: "#E0E6F7",
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  color: "#A0A0A0",
                  fontSize: 11,
                  transform: campaignsOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 100ms",
                }}
              >
                ▶
              </span>
              📊 Campaigns ({filteredCampaigns.length}
              {campaignFilter !== "all" ? ` / ${campaigns.length}` : ""})
              <span style={{ fontSize: 12, fontWeight: 400, color: "#A0A0A0" }}>
                · {dateRange.label}
              </span>
              {highlightedCampaign && campaignsOpen && (
                <span style={{ color: "#00FFE7", fontSize: "12px", fontWeight: 500 }}>
                  · 🐝 Buzz is looking at {highlightedCampaign}
                </span>
              )}
            </button>
            {campaignsOpen && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {campaigns.length > 0 && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <FilterTab label="All" count={campaigns.length} active={campaignFilter === "all"} onClick={() => setCampaignFilter("all")} color="#7F9CF5" />
                    <FilterTab label="Active" count={enabledCount} active={campaignFilter === "enabled"} onClick={() => setCampaignFilter("enabled")} color="#4ECDC4" />
                    <FilterTab label="Paused" count={pausedCount} active={campaignFilter === "paused"} onClick={() => setCampaignFilter("paused")} color="#FFA726" />
                  </div>
                )}
                <DateRangePicker value={dateRange} onChange={setDateRange} />
              </div>
            )}
          </div>
          {campaignsOpen && (
            campaigns.length === 0 ? (
              <div style={{ padding: "20px", background: "#1F232B", borderRadius: "10px", textAlign: "center", color: "#A0A0A0" }}>
                Campaigns not loaded yet...
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div style={{ padding: "20px", background: "#1F232B", borderRadius: "10px", textAlign: "center", color: "#A0A0A0", fontSize: 13 }}>
                No campaigns match this filter.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {filteredCampaigns.map((c) => (
                  <CampaignCard
                    key={c.id}
                    campaign={c}
                    highlighted={highlightedCampaign === c.id}
                  />
                ))}
              </div>
            )
          )}
        </section>

        {/* Live event stream */}
        <section style={{ marginBottom: "20px" }}>
          <LiveEventStream events={liveEvents} connected={connected} />
        </section>

        {/* Vigil — 24/7 anomaly monitor */}
        <VigilPanel />

        {/* Maximus + Echo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <MaximusPanel onChange={refresh} />
          <DigestPanel customerLabel={activeCustomerId || undefined} />
        </div>

        {/* Mira, full width */}
        <section style={{ marginBottom: "20px" }}>
          <MiraPanel
            campaigns={rawCampaigns}
            customerId={activeCustomerId}
            onChange={refresh}
          />
        </section>

        {/* Sage, full width */}
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
              ⏳ Pending approval ({pending.length})
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
            Loading...
          </div>
        )}

        <footer style={{ marginTop: "32px", textAlign: "center", color: "#666", fontSize: "11px" }}>
          B6 v0.3 · Day 3 build · auto-refresh every {REFRESH_INTERVAL_MS / 1000}s
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

const FilterTab: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  color: string;
}> = ({ label, count, active, onClick, color }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: "6px 12px",
      background: active ? `${color}22` : "transparent",
      border: `1px solid ${active ? `${color}88` : "#2D3340"}`,
      color: active ? color : "#A0A0A0",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}
  >
    {label} <span style={{ opacity: 0.7, fontWeight: 500 }}>({count})</span>
  </button>
);
