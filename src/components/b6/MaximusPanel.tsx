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
  { value: "l0", label: "L0 Observer", desc: "AI смотрит, ничего не делает", price: "free" },
  { value: "l1", label: "L1 Co-pilot", desc: "Каждое действие через апрув", price: "$99" },
  { value: "l2", label: "L2 Approval", desc: "Auto-apply подтверждённых", price: "$199" },
  { value: "l3", label: "L3 Autonomous", desc: "Полная автономия", price: "$399" },
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
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#E0E6F7" }}>
            🐻 Maximus — Orchestrator
          </div>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
            Решает что апрувить автоматически, что эскалировать тебе
          </div>
        </div>
        <button
          onClick={onRunCycle}
          disabled={running}
          style={{
            padding: "6px 14px",
            background: running ? "#2D3340" : "linear-gradient(135deg, #00FFE7, #00BFAE)",
            border: "none",
            color: running ? "#666" : "#0F1116",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: running ? "wait" : "pointer",
          }}
        >
          {running ? "🐻 Maximus думает..." : "Запустить cycle"}
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#A0A0A0",
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
                background: autonomy === l.value ? "#00BFAE22" : "#0F1116",
                border:
                  autonomy === l.value ? "1px solid #00BFAE" : "1px solid #2D3340",
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "left",
                color: "#FFFFFF",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: autonomy === l.value ? "#00FFE7" : "#E0E6F7" }}>
                {l.label}
              </div>
              <div style={{ fontSize: "10px", color: "#A0A0A0", marginTop: "2px" }}>{l.desc}</div>
              <div style={{ fontSize: "10px", color: "#7F9CF5", marginTop: "2px" }}>{l.price}</div>
            </button>
          ))}
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

      {cycle ? (
        <CycleResult cycle={cycle} />
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#666", fontSize: "12px" }}>
          Пока не запускался. Нажми «Запустить cycle» когда есть proposed actions от Buzz/Vox.
        </div>
      )}
    </div>
  );
};

const CycleResult: React.FC<{ cycle: OrchestrationCycle }> = ({ cycle }) => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "14px" }}>
      <Stat label="🐻 Auto-approved" value={cycle.auto_approved_count} color="#4ECDC4" />
      <Stat label="⏳ Kept pending" value={cycle.kept_pending_count} color="#FFA726" />
      <Stat label="🚫 Blocked" value={cycle.blocked_count} color="#FF6B6B" />
    </div>

    {cycle.auto_approved.length > 0 && (
      <DetailsList title="Авто-апрувлено Maximus'ом" items={cycle.auto_approved} color="#4ECDC4" />
    )}
    {cycle.kept_pending.length > 0 && (
      <DetailsList title="Оставлено на ручной апрув" items={cycle.kept_pending} color="#FFA726" />
    )}
    {cycle.blocked.length > 0 && (
      <DetailsList title="Заблокировано (Aegis)" items={cycle.blocked} color="#FF6B6B" />
    )}

    <div style={{ marginTop: "10px", color: "#666", fontSize: "10px", textAlign: "right" }}>
      Last cycle: {new Date(cycle.run_at).toLocaleString("ru-RU")}
    </div>
  </>
);

const Stat: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div
    style={{
      padding: "10px",
      background: "#0F1116",
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
}> = ({ title, items, color }) => (
  <div style={{ marginBottom: "10px" }}>
    <div
      style={{
        fontSize: "10px",
        color: "#A0A0A0",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "6px",
      }}
    >
      {title}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {items.slice(0, 5).map((x) => (
        <div
          key={x.action_id}
          style={{
            padding: "6px 10px",
            background: "#0F1116",
            borderLeft: `2px solid ${color}`,
            borderRadius: "4px",
            fontSize: "11px",
            color: "#C0C6D7",
          }}
        >
          <code style={{ color: "#7F9CF5" }}>{x.action_id.slice(0, 8)}..</code>
          {x.campaign_id && <span style={{ color: "#A0A0A0" }}> · campaign {x.campaign_id}</span>}
          <div style={{ color: "#A0A0A0", marginTop: "2px", lineHeight: 1.4 }}>{x.reason}</div>
        </div>
      ))}
    </div>
  </div>
);
