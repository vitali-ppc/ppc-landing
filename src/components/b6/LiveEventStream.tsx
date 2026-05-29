"use client";

import React, { useEffect, useRef, useState } from "react";
import type { LiveEvent } from "@/lib/b6-socket";

const STORAGE_KEY = "b6_live_stream_open";

export const LiveEventStream: React.FC<{
  events: LiveEvent[];
  connected: boolean;
}> = ({ events, connected }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Свёрнут по умолчанию; состояние помним между рендерами через localStorage.
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
  }, [open]);

  // Auto-scroll to bottom on new events (only when expanded).
  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events.length, open]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: open ? 8 : 0,
          padding: "6px 4px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-expanded={open}
        title={open ? "Collapse live stream" : "Expand live stream"}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#0D1320", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 12, color: "#5B6979", fontSize: 11, transition: "transform 100ms", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
          🎬 Live agent stream
          {!open && events.length > 0 && (
            <span style={{ fontSize: 11, fontWeight: 400, color: "#666" }}>
              ({events.length} event{events.length === 1 ? "" : "s"})
            </span>
          )}
        </h2>
        <div
          style={{
            fontSize: "11px",
            color: connected ? "#0B7A68" : "#DC2626",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: connected ? "#0B7A68" : "#DC2626",
              animation: connected ? "pulse 2s infinite" : "none",
            }}
          />
          {connected ? "live" : "offline"}
        </div>
      </button>

      {open && (
        <div
          ref={scrollRef}
          style={{
            maxHeight: "320px",
            overflowY: "auto",
            background: "#F6F8FB",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #DCE3ED",
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: "12px",
            lineHeight: "1.6",
            scrollbarGutter: "stable",
          }}
        >
          {events.length === 0 ? (
            <div style={{ color: "#666", textAlign: "center", padding: "20px" }}>
              {connected
                ? "Waiting for events... hit 'Run Buzz now'"
                : "Connecting to server..."}
            </div>
          ) : (
            events.map((e, i) => <EventLine key={i} event={e} />)
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

const EventLine: React.FC<{ event: LiveEvent }> = ({ event }) => {
  const time = new Date(event.ts).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const { color, mascot, text } = describeEvent(event);

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "2px" }}>
      <span style={{ color: "#666", flexShrink: 0, fontSize: "10px", marginTop: "1px" }}>
        {time}
      </span>
      <span style={{ flexShrink: 0 }}>{mascot}</span>
      <span style={{ color, flex: 1, wordBreak: "break-word" }}>{text}</span>
    </div>
  );
};

function describeEvent(e: LiveEvent): { color: string; mascot: string; text: string } {
  const MASCOT_EMOJI: Record<string, string> = {
    Buzz: "🐝",
    Aegis: "🛡️",
    Echo: "📊",
    Vox: "🦊",
    Maximus: "🐻",
    Mira: "🎨",
    Sage: "🦉",
    Vigil: "🦇",
  };
  const mascot =
    MASCOT_EMOJI[e.mascot ?? ""] || (e.agent === "risk" ? "🛡️" : e.agent === "anomaly" ? "🦇" : "✨");

  switch (e.event_type) {
    case "session.start":
      return {
        color: "#4F5BC9",
        mascot: "▶️",
        text: `Session start (customer ${e.customer_id}, type ${e.agent_type})`,
      };
    case "session.complete":
      return {
        color: "#0B7A68",
        mascot: "🏁",
        text: `Session complete — ${e.proposed_ids?.length || 0} proposed, ${
          e.reviews?.length || 0
        } reviewed`,
      };
    case "agent.thinking":
      return {
        color: "#5B6979",
        mascot,
        text: e.message || `${e.mascot} thinking...`,
      };
    case "agent.calling_tool":
      return {
        color: "#0A7C8C",
        mascot,
        text: `calling ${e.tool}(${e.input ? e.input.slice(0, 80) : ""}${
          e.input && e.input.length > 80 ? "..." : ""
        })`,
      };
    case "agent.done":
      return {
        color: "#0B7A68",
        mascot,
        text: `✓ done${e.text ? `: ${e.text.slice(0, 100)}` : ""}`,
      };
    case "agent.error":
      return {
        color: "#DC2626",
        mascot,
        text: `✕ error: ${e.message}`,
      };
    default:
      return {
        color: "#37445A",
        mascot,
        text: `${e.event_type}`,
      };
  }
}
