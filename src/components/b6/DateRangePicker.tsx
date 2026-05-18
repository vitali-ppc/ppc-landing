"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Google Ads-style date range picker.
 *
 * - Presets on the left: Today, Yesterday, Last 7/14/30 days, This/Last month, etc.
 * - Custom range: two date inputs (from / to)
 * - Stores selection as { from: Date, to: Date } in parent state, plus a label
 *   for the trigger button.
 *
 * Backend integration: pass `days` (difference between from/to) to listCampaigns
 * and agent runs. For ranges that aren't "last N days" we still send days =
 * floor((to - from)/day) — the granularity Google Ads metrics work at.
 */

export type DateRange = {
  from: Date;
  to: Date;
  label: string; // human-readable, e.g. "Last 7 days" or "May 1 – May 14"
  days: number; // size of range in whole days (>=1)
};

type Preset = {
  id: string;
  label: string;
  compute: () => DateRange;
};

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const endOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};
const daysBetween = (from: Date, to: Date) =>
  Math.max(1, Math.floor((endOfDay(to).getTime() - startOfDay(from).getTime()) / 86_400_000) + 1);

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const rangeFmt = (from: Date, to: Date) => `${fmt(from)} – ${fmt(to)}`;

const PRESETS: Preset[] = [
  {
    id: "today",
    label: "Today",
    compute: () => {
      const today = startOfDay(new Date());
      return { from: today, to: today, label: "Today", days: 1 };
    },
  },
  {
    id: "yesterday",
    label: "Yesterday",
    compute: () => {
      const y = startOfDay(new Date());
      y.setDate(y.getDate() - 1);
      return { from: y, to: y, label: "Yesterday", days: 1 };
    },
  },
  {
    id: "last_7",
    label: "Last 7 days",
    compute: () => {
      const to = startOfDay(new Date());
      to.setDate(to.getDate() - 1);
      const from = new Date(to);
      from.setDate(from.getDate() - 6);
      return { from, to, label: "Last 7 days", days: 7 };
    },
  },
  {
    id: "last_14",
    label: "Last 14 days",
    compute: () => {
      const to = startOfDay(new Date());
      to.setDate(to.getDate() - 1);
      const from = new Date(to);
      from.setDate(from.getDate() - 13);
      return { from, to, label: "Last 14 days", days: 14 };
    },
  },
  {
    id: "last_30",
    label: "Last 30 days",
    compute: () => {
      const to = startOfDay(new Date());
      to.setDate(to.getDate() - 1);
      const from = new Date(to);
      from.setDate(from.getDate() - 29);
      return { from, to, label: "Last 30 days", days: 30 };
    },
  },
  {
    id: "this_month",
    label: "This month",
    compute: () => {
      const now = new Date();
      const from = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
      const to = startOfDay(now);
      return { from, to, label: "This month", days: daysBetween(from, to) };
    },
  },
  {
    id: "last_month",
    label: "Last month",
    compute: () => {
      const now = new Date();
      const from = startOfDay(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      const to = startOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
      return { from, to, label: "Last month", days: daysBetween(from, to) };
    },
  },
  {
    id: "last_90",
    label: "Last 90 days",
    compute: () => {
      const to = startOfDay(new Date());
      to.setDate(to.getDate() - 1);
      const from = new Date(to);
      from.setDate(from.getDate() - 89);
      return { from, to, label: "Last 90 days", days: 90 };
    },
  },
];

export function defaultDateRange(): DateRange {
  return PRESETS.find((p) => p.id === "last_7")!.compute();
}

const toInputValue = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export function DateRangePicker({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
}) {
  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState(toInputValue(value.from));
  const [customTo, setCustomTo] = useState(toInputValue(value.to));
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Keep custom inputs in sync when an outer change happens (e.g. preset clicked)
  useEffect(() => {
    setCustomFrom(toInputValue(value.from));
    setCustomTo(toInputValue(value.to));
  }, [value.from, value.to]);

  const activePresetId = useMemo(() => {
    for (const p of PRESETS) {
      const r = p.compute();
      if (
        toInputValue(r.from) === toInputValue(value.from) &&
        toInputValue(r.to) === toInputValue(value.to)
      ) {
        return p.id;
      }
    }
    return "custom";
  }, [value.from, value.to]);

  const onPresetClick = (preset: Preset) => {
    onChange(preset.compute());
    setOpen(false);
  };

  const applyCustom = () => {
    const from = new Date(customFrom + "T00:00:00");
    const to = new Date(customTo + "T00:00:00");
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return;
    if (from > to) return;
    onChange({
      from: startOfDay(from),
      to: startOfDay(to),
      label: rangeFmt(from, to),
      days: daysBetween(from, to),
    });
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: "8px 12px",
          background: open ? "#2D3340" : "#0F1116",
          border: "1px solid #2D3340",
          color: "#E0E6F7",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}
        title="Change date range"
      >
        <span>📅</span>
        <span>{value.label}</span>
        <span style={{ color: "#A0A0A0", fontSize: 10 }}>▼</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            display: "flex",
            background: "#15181D",
            border: "1px solid #2D3340",
            borderRadius: 10,
            boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
            zIndex: 60,
            minWidth: 460,
            overflow: "hidden",
          }}
        >
          {/* Preset column */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid #2D3340", minWidth: 180 }}>
            {PRESETS.map((p) => {
              const isActive = activePresetId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPresetClick(p)}
                  style={{
                    padding: "10px 14px",
                    background: isActive ? "#00FFE71A" : "transparent",
                    border: "none",
                    color: isActive ? "#00FFE7" : "#E0E6F7",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    borderLeft: isActive ? "3px solid #00FFE7" : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "#1F232B";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Custom range pane */}
          <div style={{ padding: 16, minWidth: 260 }}>
            <div
              style={{
                fontSize: 11,
                color: "#A0A0A0",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 10,
              }}
            >
              Custom range
            </div>

            <label style={{ display: "block", marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: "#A0A0A0", display: "block", marginBottom: 4 }}>From</span>
              <input
                type="date"
                value={customFrom}
                max={customTo || undefined}
                onChange={(e) => setCustomFrom(e.target.value)}
                style={dateInputStyle}
              />
            </label>

            <label style={{ display: "block", marginBottom: 14 }}>
              <span style={{ fontSize: 11, color: "#A0A0A0", display: "block", marginBottom: 4 }}>To</span>
              <input
                type="date"
                value={customTo}
                min={customFrom || undefined}
                max={toInputValue(new Date())}
                onChange={(e) => setCustomTo(e.target.value)}
                style={dateInputStyle}
              />
            </label>

            <button
              type="button"
              onClick={applyCustom}
              disabled={!customFrom || !customTo || customFrom > customTo}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#00FFE7",
                color: "#0F1116",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Apply
            </button>

            <div style={{ marginTop: 10, fontSize: 11, color: "#666", textAlign: "center" }}>
              {value.label} · {value.days} {value.days === 1 ? "day" : "days"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const dateInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  background: "#0F1116",
  border: "1px solid #2D3340",
  borderRadius: 6,
  color: "#E0E6F7",
  fontSize: 12,
  outline: "none",
  boxSizing: "border-box",
  colorScheme: "dark",
};
