"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  listRecentAnomalies,
  acknowledgeAnomaly,
  dismissAnomaly,
  getVigilSettings,
  updateVigilSettings,
  runVigilNow,
  type AnomalyAlert,
  type AnomalyListResponse,
  type VigilSettings,
  type VigilScheduleMode,
} from "@/lib/b6-api";

const SCHEDULE_TOOLTIPS: Record<VigilScheduleMode, string> = {
  off: "Manual only — Vigil runs when you press 'Run once'. No background scans.",
  daily: "Vigil scans your accounts once every 24 hours. ~$1.14/day on Goodevas-scale.",
  weekly: "Vigil scans your accounts once every 7 days. ~$1.14/week.",
};

const SCHEDULE_COSTS: Record<VigilScheduleMode, string> = {
  off: "(no auto cost)",
  daily: "(~$1/day)",
  weekly: "(~$5/mo)",
};

/**
 * VigilPanel — Sprint 8 monitoring feed for anomaly_alerts.
 *
 * Displays alerts grouped by severity (critical first), shows Aegis verdict
 * if available, exposes per-alert acknowledge / dismiss buttons. Empty state
 * is intentionally affirmative ("all quiet"), because zero alerts is the
 * desirable steady state, not an error.
 */
export function VigilPanel({
  refreshIntervalMs = 15000,
  refreshKey,
}: {
  refreshIntervalMs?: number;
  /** External value that bumps to force a refresh (e.g. after running an agent). */
  refreshKey?: number;
}) {
  const [data, setData] = useState<AnomalyListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const [settings, setSettings] = useState<VigilSettings | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [runningNow, setRunningNow] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await listRecentAnomalies({ days: 7 });
      setData(res);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, refreshIntervalMs);
    return () => clearInterval(t);
  }, [load, refreshIntervalMs, refreshKey]);

  useEffect(() => {
    getVigilSettings()
      .then(setSettings)
      .catch((e) => console.warn("Vigil settings fetch failed", e));
  }, []);

  const saveSettings = async (patch: Partial<VigilSettings>) => {
    setSavingSettings(true);
    try {
      const next = await updateVigilSettings(patch);
      setSettings(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSavingSettings(false);
    }
  };

  const onRunNow = async () => {
    setRunningNow(true);
    setRunResult(null);
    setError(null);
    try {
      const res = await runVigilNow();
      if (!res.ok) {
        setRunResult(res.reason ? `Skipped: ${res.reason}` : "Failed");
      } else {
        const parts: string[] = [];
        parts.push(`scanned ${res.scanned ?? 0}/${res.targets ?? 0}`);
        if (res.alerts_total) parts.push(`${res.alerts_total} alerts`);
        if (res.skipped) parts.push(`${res.skipped} skipped`);
        if (res.errors) parts.push(`${res.errors} errors`);
        setRunResult(parts.join(" · "));
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunningNow(false);
    }
  };

  const onAck = async (id: string) => {
    setBusyId(id);
    try {
      await acknowledgeAnomaly(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const onDismiss = async (id: string) => {
    setBusyId(id);
    try {
      await dismissAnomaly(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const alerts = data?.alerts ?? [];
  const byCritical = alerts.filter((a) => a.severity === "critical");
  const byWarning = alerts.filter((a) => a.severity === "warning");
  const byInfo = alerts.filter((a) => a.severity === "info");

  return (
    <section
      style={{
        background: "#FFFFFF",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        border: byCritical.length > 0 ? "1px solid #DC262666" : "1px solid #DCE3ED",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title={open ? "Collapse Vigil" : "Expand Vigil"}
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
          🦇 Vigil — Live Account Monitoring
          {byCritical.length > 0 && (
            <span
              style={{
                marginLeft: 4,
                padding: "2px 8px",
                background: "#DC262622",
                color: "#DC2626",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {byCritical.length} CRITICAL
            </span>
          )}
          {byWarning.length > 0 && byCritical.length === 0 && (
            <span
              style={{
                marginLeft: 4,
                padding: "2px 8px",
                background: "#B4530922",
                color: "#B45309",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {byWarning.length} WARNING
            </span>
          )}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LastScanLabel iso={data?.last_scan_at ?? null} />
          <ScheduleBadge mode={settings?.schedule_mode ?? null} />
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onRunNow();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                onRunNow();
              }
            }}
            title="Run Vigil scan now (one-shot, ~$1.14 per scan)"
            aria-disabled={runningNow}
            style={{
              padding: "3px 8px",
              background: runningNow ? "#DCE3ED" : "#4F5BC922",
              border: "1px solid #4F5BC955",
              color: runningNow ? "#5B6979" : "#4F5BC9",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              cursor: runningNow ? "default" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              opacity: runningNow ? 0.7 : 1,
            }}
          >
            {runningNow ? "🦇 Running…" : "🦇 Run once"}
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setSettingsOpen((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                setSettingsOpen((v) => !v);
              }
            }}
            title="Vigil settings"
            style={{
              padding: "2px 6px",
              background: "transparent",
              border: "1px solid #DCE3ED",
              color: "#5B6979",
              borderRadius: 4,
              fontSize: 12,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            ⚙
          </span>
        </span>
      </button>

      {runResult && (
        <div
          style={{
            marginTop: 10,
            padding: "6px 10px",
            background: "#4F5BC922",
            border: "1px solid #4F5BC955",
            color: "#4F5BC9",
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          🦇 Scan complete: {runResult}
        </div>
      )}

      {settingsOpen && settings && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "#F6F8FB",
            border: "1px solid #DCE3ED",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            color: "#5B6979",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            📅 Schedule
            <select
              value={settings.schedule_mode}
              disabled={savingSettings}
              onChange={(e) =>
                saveSettings({
                  schedule_mode: e.target.value as VigilScheduleMode,
                })
              }
              title={SCHEDULE_TOOLTIPS[settings.schedule_mode]}
              style={{
                background: "#FFFFFF",
                color: "#0D1320",
                border: "1px solid #DCE3ED",
                borderRadius: 4,
                padding: "3px 6px",
                fontSize: 12,
              }}
            >
              <option value="off">Off (manual only)</option>
              <option value="daily">Once a day</option>
              <option value="weekly">Once a week</option>
            </select>
            <span style={{ color: "#666", fontSize: 11 }}>
              {SCHEDULE_COSTS[settings.schedule_mode]}
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Email me on severity
            <select
              value={settings.min_severity}
              disabled={savingSettings}
              onChange={(e) =>
                saveSettings({
                  min_severity: e.target.value as VigilSettings["min_severity"],
                })
              }
              style={{
                background: "#FFFFFF",
                color: "#0D1320",
                border: "1px solid #DCE3ED",
                borderRadius: 4,
                padding: "3px 6px",
                fontSize: 12,
              }}
            >
              <option value="info">info+</option>
              <option value="warning">warning+</option>
              <option value="critical">critical only</option>
            </select>
          </span>
          {savingSettings && <span style={{ color: "#666" }}>saving…</span>}
        </div>
      )}

      {open && (
        <div style={{ marginTop: 14 }}>
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
              ⚠️ {error}
            </div>
          )}
          {alerts.length === 0 ? (
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
              ✅ All quiet. Vigil hasn't spotted any anomalies in the last 7 days.
            </div>
          ) : (
            <>
              {byCritical.length > 0 && (
                <SeverityGroup
                  title="🚨 Critical"
                  color="#DC2626"
                  alerts={byCritical}
                  busyId={busyId}
                  onAck={onAck}
                  onDismiss={onDismiss}
                />
              )}
              {byWarning.length > 0 && (
                <SeverityGroup
                  title="⚠️ Warning"
                  color="#B45309"
                  alerts={byWarning}
                  busyId={busyId}
                  onAck={onAck}
                  onDismiss={onDismiss}
                />
              )}
              {byInfo.length > 0 && (
                <SeverityGroup
                  title="ℹ️ Info"
                  color="#4F5BC9"
                  alerts={byInfo}
                  busyId={busyId}
                  onAck={onAck}
                  onDismiss={onDismiss}
                />
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

function SeverityGroup({
  title,
  color,
  alerts,
  busyId,
  onAck,
  onDismiss,
}: {
  title: string;
  color: string;
  alerts: AnomalyAlert[];
  busyId: string | null;
  onAck: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {title} ({alerts.length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {alerts.map((a) => (
          <AlertCard
            key={a.id}
            alert={a}
            color={color}
            busy={busyId === a.id}
            onAck={() => onAck(a.id)}
            onDismiss={() => onDismiss(a.id)}
          />
        ))}
      </div>
    </div>
  );
}

function AlertCard({
  alert,
  color,
  busy,
  onAck,
  onDismiss,
}: {
  alert: AnomalyAlert;
  color: string;
  busy: boolean;
  onAck: () => void;
  onDismiss: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const hasFlags = alert.aegis_flags && alert.aegis_flags.length > 0;

  return (
    <div
      style={{
        background: "#F6F8FB",
        borderLeft: `3px solid ${color}`,
        borderRadius: 6,
        padding: "10px 12px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, color: "#0D1320", fontSize: 13 }}>
            {alert.campaign_name || `Campaign ${alert.campaign_id ?? "?"}`}
          </span>
          <TypePill type={alert.anomaly_type} />
          {typeof alert.aegis_score === "number" && (
            <span
              title={`Aegis: ${alert.aegis_recommendation ?? "?"}`}
              style={{
                padding: "1px 6px",
                background: alert.aegis_score >= 70 ? "#DC262622" : "#4F5BC922",
                color: alert.aegis_score >= 70 ? "#DC2626" : "#4F5BC9",
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              🛡️ {alert.aegis_score}
            </span>
          )}
        </div>
        <div style={{ color: "#0D1320", fontSize: 12, marginTop: 4 }}>{alert.summary}</div>
        {alert.reasoning && (
          <div style={{ color: "#5B6979", fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
            {alert.reasoning}
          </div>
        )}
        {hasFlags && (
          <div style={{ marginTop: 6 }}>
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              style={{
                background: "transparent",
                border: "none",
                color: "#666",
                fontSize: 11,
                cursor: "pointer",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
              title={showDetails ? "Hide Aegis flags" : "Show Aegis flags"}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  fontSize: 9,
                  transform: showDetails ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 100ms",
                }}
              >
                ▸
              </span>
              {showDetails
                ? `Hide details (${alert.aegis_flags.length} flag${alert.aegis_flags.length === 1 ? "" : "s"})`
                : `Show details · ${alert.aegis_flags.length} Aegis flag${alert.aegis_flags.length === 1 ? "" : "s"}`}
            </button>
            {showDetails && (
              <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {alert.aegis_flags.map((f, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 10,
                      color: "#4F5BC9",
                      background: "#4F5BC922",
                      padding: "1px 6px",
                      borderRadius: 8,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          type="button"
          onClick={onAck}
          disabled={busy}
          title="Mark as seen"
          style={{
            padding: "4px 8px",
            background: "transparent",
            border: "1px solid #DCE3ED",
            color: "#5B6979",
            borderRadius: 4,
            fontSize: 11,
            cursor: busy ? "default" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {busy ? "..." : "Acknowledge"}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          disabled={busy}
          title="Dismiss as false positive"
          style={{
            padding: "4px 8px",
            background: "transparent",
            border: "1px solid #DCE3ED",
            color: "#666",
            borderRadius: 4,
            fontSize: 11,
            cursor: busy ? "default" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function TypePill({ type }: { type: string }) {
  const label = type.replace(/_/g, " ");
  return (
    <span
      style={{
        padding: "1px 6px",
        background: "#DCE3ED",
        color: "#5B6979",
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 500,
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}

function ScheduleBadge({ mode }: { mode: VigilScheduleMode | null }) {
  if (!mode) return null;
  const labelMap: Record<VigilScheduleMode, { text: string; bg: string; fg: string }> = {
    off: { text: "manual", bg: "#DCE3ED", fg: "#5B6979" },
    daily: { text: "daily", bg: "#4F5BC922", fg: "#4F5BC9" },
    weekly: { text: "weekly", bg: "#4F5BC922", fg: "#4F5BC9" },
  };
  const { text, bg, fg } = labelMap[mode];
  return (
    <span
      title={SCHEDULE_TOOLTIPS[mode]}
      style={{
        padding: "1px 8px",
        background: bg,
        color: fg,
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      📅 {text}
    </span>
  );
}

function LastScanLabel({ iso }: { iso: string | null }) {
  if (!iso) {
    return (
      <span style={{ fontSize: 11, color: "#666", fontWeight: 400 }}>
        no scan yet
      </span>
    );
  }
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  const label =
    minutes < 1 ? "just now" : minutes < 60 ? `${minutes}m ago` : `${Math.round(minutes / 60)}h ago`;
  return (
    <span style={{ fontSize: 11, color: "#5B6979", fontWeight: 400 }}>
      last scan: {label}
    </span>
  );
}
