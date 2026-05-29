"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  getLatestOrchestration,
  runOrchestratorCycle,
  setAutonomy,
  type AutonomyLevel,
  type OrchestrationCycle,
} from "@/lib/b6-api";

const LEVELS: { value: AutonomyLevel; label: string; desc: string; price: string }[] = [
  { value: "l0", label: "L0 Observer", desc: "AI watches, does nothing", price: "free" },
  { value: "l1", label: "L1 Co-pilot", desc: "Every action via approval", price: "$99" },
  { value: "l2", label: "L2 Approval", desc: "Auto-apply once approved", price: "$199" },
  { value: "l3", label: "L3 Autonomous", desc: "Full autonomy", price: "$399" },
];

export const MaximusPanel: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const [cycle, setCycle] = useState<OrchestrationCycle | null>(null);
  const [autonomy, setAutonomyState] = useState<AutonomyLevel>("l1");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const latest = await getLatestOrchestration();
    if (latest) {
      setCycle(latest);
      setAutonomyState(latest.autonomy_level);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onSetAutonomy = async (level: AutonomyLevel) => {
    setError(null);
    try {
      await setAutonomy(level);
      setAutonomyState(level);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const onRunCycle = async () => {
    setError(null);
    setRunning(true);
    try {
      const c = await runOrchestratorCycle({ autonomyLevelOverride: autonomy });
      setCycle(c);
      if (onChange) onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div
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
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D1320" }}>
            Maximus — Orchestrator
          </div>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
            Decides what to auto-approve and what to escalate to you
          </div>
        </div>
        <button
          onClick={onRunCycle}
          disabled={running}
          style={{
            padding: "6px 14px",
            background: running ? "#DCE3ED" : "linear-gradient(135deg, #0A7C8C, #0A8294)",
            border: "none",
            color: running ? "#666" : "#EEF2F8",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: running ? "wait" : "pointer",
          }}
        >
          {running ? "Maximus is thinking..." : "Run cycle"}
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#5B6979",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "8px",
          }}
        >
          Autonomy level
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() => onSetAutonomy(l.value)}
              style={{
                padding: "8px",
                background: autonomy === l.value ? "#0A829422" : "#EEF2F8",
                border:
                  autonomy === l.value ? "1px solid #0A8294" : "1px solid #DCE3ED",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "left",
                color: "#0D1320",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: autonomy === l.value ? "#0A7C8C" : "#0D1320" }}>
                {l.label}
              </div>
              <div style={{ fontSize: "10px", color: "#5B6979", marginTop: "2px" }}>{l.desc}</div>
              <div style={{ fontSize: "10px", color: "#4F5BC9", marginTop: "2px" }}>{l.price}</div>
            </button>
          ))}
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
          {error}
        </div>
      )}

      {cycle ? (
        <CycleResult cycle={cycle} />
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#666", fontSize: "12px" }}>
          Not run yet. Hit "Run cycle" when there are proposed actions from Buzz/Vox.
        </div>
      )}
    </div>
  );
};

const CycleResult: React.FC<{ cycle: OrchestrationCycle }> = ({ cycle }) => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "14px" }}>
      <Stat label="Auto-approved" value={cycle.auto_approved_count} color="#0B7A68" />
      <Stat label="⏳ Kept pending" value={cycle.kept_pending_count} color="#B45309" />
      <Stat label="Blocked" value={cycle.blocked_count} color="#DC2626" />
    </div>

    {cycle.auto_approved.length > 0 && (
      <DetailsList
        title="Auto-approved by Maximus"
        items={cycle.auto_approved}
        color="#0B7A68"
        defaultOpen
      />
    )}
    {cycle.kept_pending.length > 0 && (
      <DetailsList
        title="Kept for manual approval"
        items={cycle.kept_pending}
        color="#B45309"
      />
    )}
    {cycle.blocked.length > 0 && (
      <DetailsList
        title="Blocked by Aegis"
        items={cycle.blocked}
        color="#DC2626"
      />
    )}

    <div style={{ marginTop: "10px", color: "#666", fontSize: "10px", textAlign: "right" }}>
      Last cycle: {new Date(cycle.run_at).toLocaleString("en-US")}
    </div>
  </>
);

const Stat: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div
    style={{
      padding: "10px",
      background: "#EEF2F8",
      borderRadius: "8px",
      borderTop: `2px solid ${color}`,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </div>
    <div style={{ fontSize: "20px", fontWeight: 700, color, marginTop: "2px" }}>{value}</div>
  </div>
);

const DetailsList: React.FC<{
  title: string;
  items: Array<{ action_id: string; reason: string; campaign_id?: string }>;
  color: string;
  defaultOpen?: boolean;
}> = ({ title, items, color, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const shown = items.slice(0, 5);
  const hiddenCount = Math.max(items.length - 5, 0);
  return (
    <div style={{ marginBottom: "10px" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: "10px",
          color: "#5B6979",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: open ? "6px" : 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
        title={open ? `Hide ${title}` : `Show ${title}`}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            fontSize: 9,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 100ms",
          }}
        >
          ▸
        </span>
        {title} ({items.length})
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {shown.map((x) => (
            <div
              key={x.action_id}
              style={{
                padding: "6px 10px",
                background: "#EEF2F8",
                borderLeft: `2px solid ${color}`,
                borderRadius: "4px",
                fontSize: "11px",
                color: "#37445A",
              }}
            >
              <code style={{ color: "#4F5BC9" }}>{x.action_id.slice(0, 8)}..</code>
              {x.campaign_id && <span style={{ color: "#5B6979" }}> · campaign {x.campaign_id}</span>}
              <div style={{ color: "#5B6979", marginTop: "2px", lineHeight: 1.4 }}>{x.reason}</div>
            </div>
          ))}
          {hiddenCount > 0 && (
            <div style={{ color: "#666", fontSize: "10px", padding: "4px 10px" }}>
              + {hiddenCount} more (open in Approval Queue below)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
