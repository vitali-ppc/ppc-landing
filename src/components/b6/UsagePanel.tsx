"use client";

/**
 * UsagePanel — Sprint 8.8 cost-transparency widget.
 *
 * Shows per-agent LLM spend for the last N days. Data comes from
 * /api/usage which aggregates audit_log entries written by BaseAgent
 * after every Anthropic Messages call.
 *
 * Default view = collapsed; expand to see the breakdown. We want this
 * visible enough that the user remembers cost exists, but not so
 * prominent it dominates the dashboard.
 */

import React, { useEffect, useState, useCallback } from "react";
import { getUsage, type UsageResponse, type AgentUsage } from "@/lib/b6-api";

const AGENT_LABEL_MAP: Record<string, { emoji: string; name: string }> = {
  bidding: { emoji: "", name: "Buzz" },
  risk: { emoji: "", name: "Aegis" },
  reporting: { emoji: "", name: "Echo" },
  strategy: { emoji: "", name: "Vox" },
  creative: { emoji: "", name: "Mira" },
  research: { emoji: "", name: "Sage" },
  anomaly: { emoji: "", name: "Vigil" },
  orchestrator: { emoji: "", name: "Maximus" },
};

function labelFor(a: AgentUsage): { emoji: string; name: string } {
  const known = AGENT_LABEL_MAP[a.agent];
  if (known) return known;
  return { emoji: "", name: a.mascot || a.agent };
}

function fmtUsd(n: number): string {
  if (n < 0.01) return `$${n.toFixed(4)}`;
  if (n < 1) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(2)}`;
}

function fmtTokens(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}K`;
  return `${(n / 1_000_000).toFixed(2)}M`;
}

export function UsagePanel({ refreshIntervalMs = 30000 }: { refreshIntervalMs?: number }) {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(7);
  const [open, setOpen] = useState(false);

  const load = useCallback(
    async (d: number) => {
      try {
        const res = await getUsage(d);
        setData(res);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [],
  );

  useEffect(() => {
    load(days);
    const t = setInterval(() => load(days), refreshIntervalMs);
    return () => clearInterval(t);
  }, [load, days, refreshIntervalMs]);

  const total = data?.total_cost_usd ?? 0;
  const calls = data?.total_calls ?? 0;
  const agents = data?.by_agent ?? [];

  return (
    <section
      style={{
        background: "#FFFFFF",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        border: "1px solid #DCE3ED",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title={open ? "Collapse usage" : "Expand usage"}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "#0D1320",
          fontSize: 16,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
          Usage (last {days}d)
          <span
            style={{
              marginLeft: 4,
              padding: "2px 8px",
              background: total > 0 ? "#4F5BC922" : "#DCE3ED",
              color: total > 0 ? "#4F5BC9" : "#5B6979",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {fmtUsd(total)}
          </span>
        </span>
        <span style={{ fontSize: 11, color: "#5B6979", fontWeight: 400 }}>
          {calls} LLM calls
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 14 }}>
          {/* Day range selector */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 12,
              fontSize: 11,
              color: "#5B6979",
            }}
          >
            <span>Range:</span>
            {[1, 7, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                style={{
                  padding: "2px 8px",
                  background: days === d ? "#4F5BC922" : "transparent",
                  border: `1px solid ${days === d ? "#4F5BC955" : "#DCE3ED"}`,
                  color: days === d ? "#4F5BC9" : "#5B6979",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: days === d ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {d === 1 ? "Today" : `${d}d`}
              </button>
            ))}
          </div>

          {error && (
            <div
              style={{
                padding: "10px 12px",
                background: "#DC262622",
                border: "1px solid #DC262666",
                borderRadius: 8,
                color: "#DC2626",
                fontSize: 12,
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}

          {agents.length === 0 ? (
            <div
              style={{
                padding: "20px 12px",
                background: "#F6F8FB",
                border: "1px dashed #DCE3ED",
                borderRadius: 8,
                color: "#5B6979",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              No LLM calls in the last {days} day{days === 1 ? "" : "s"}. Run an agent to see costs here.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {agents.map((a) => {
                const { emoji, name } = labelFor(a);
                const pct = total > 0 ? (a.cost_usd / total) * 100 : 0;
                return (
                  <AgentRow
                    key={a.agent}
                    emoji={emoji}
                    name={name}
                    calls={a.calls}
                    inputTokens={a.input_tokens}
                    outputTokens={a.output_tokens}
                    cacheReadTokens={a.cache_read_tokens}
                    costUsd={a.cost_usd}
                    pctOfTotal={pct}
                  />
                );
              })}
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 10,
                  borderTop: "1px solid #DCE3ED",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0D1320",
                }}
              >
                <span>Total ({calls} calls)</span>
                <span>{fmtUsd(total)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function AgentRow({
  emoji,
  name,
  calls,
  inputTokens,
  outputTokens,
  cacheReadTokens,
  costUsd,
  pctOfTotal,
}: {
  emoji: string;
  name: string;
  calls: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  costUsd: number;
  pctOfTotal: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto auto",
        gap: 12,
        alignItems: "center",
        padding: "8px 12px",
        background: "#F6F8FB",
        borderRadius: 6,
        fontSize: 12,
      }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: "#0D1320", fontWeight: 600 }}>{name}</div>
        <div style={{ color: "#666", fontSize: 10, marginTop: 2 }}>
          {calls} calls · {fmtTokens(inputTokens)} in · {fmtTokens(outputTokens)} out
          {cacheReadTokens > 0 && ` · ${fmtTokens(cacheReadTokens)} cached`}
        </div>
      </div>
      <span
        style={{
          padding: "1px 6px",
          background: "#DCE3ED",
          color: "#5B6979",
          borderRadius: 8,
          fontSize: 10,
        }}
      >
        {pctOfTotal.toFixed(0)}%
      </span>
      <span style={{ color: "#4F5BC9", fontWeight: 600, minWidth: 60, textAlign: "right" }}>
        {fmtUsd(costUsd)}
      </span>
    </div>
  );
}
