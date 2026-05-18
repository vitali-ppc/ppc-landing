"use client";

import React, { useEffect, useRef } from "react";
import type { LiveEvent } from "@/lib/b6-socket";

export const LiveEventStream: React.FC<{
  events: LiveEvent[];
  connected: boolean;
}> = ({ events, connected }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Авто-скролл вниз при новых событиях
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events.length]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#E0E6F7" }}>
          🎬 Live agent stream
        </h2>
        <div
          style={{
            fontSize: "11px",
            color: connected ? "#4ECDC4" : "#FF6B6B",
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
              background: connected ? "#4ECDC4" : "#FF6B6B",
              animation: connected ? "pulse 2s infinite" : "none",
            }}
          />
          {connected ? "live" : "offline"}
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          maxHeight: "320px",
          overflowY: "auto",
          background: "#15181D",
          borderRadius: "8px",
          padding: "10px",
          border: "1px solid #2D3340",
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          fontSize: "12px",
          lineHeight: "1.6",
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
  const time = new Date(event.ts).toLocaleTimeString("ru-RU", {
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
  const mascot = e.mascot === "Buzz" ? "🐝" : e.mascot === "Aegis" ? "🛡️" : e.agent === "risk" ? "🛡️" : "✨";

  switch (e.event_type) {
    case "session.start":
      return {
        color: "#7F9CF5",
        mascot: "▶️",
        text: `Session start (customer ${e.customer_id}, type ${e.agent_type})`,
      };
    case "session.complete":
      return {
        color: "#4ECDC4",
        mascot: "🏁",
        text: `Session complete — ${e.proposed_ids?.length || 0} proposed, ${
          e.reviews?.length || 0
        } reviewed`,
      };
    case "agent.thinking":
      return {
        color: "#A0A0A0",
        mascot,
        text: e.message || `${e.mascot} thinking...`,
      };
    case "agent.calling_tool":
      return {
        color: "#00FFE7",
        mascot,
        text: `calling ${e.tool}(${e.input ? e.input.slice(0, 80) : ""}${
          e.input && e.input.length > 80 ? "..." : ""
        })`,
      };
    case "agent.done":
      return {
        color: "#4ECDC4",
        mascot,
        text: `✓ done${e.text ? `: ${e.text.slice(0, 100)}` : ""}`,
      };
    case "agent.error":
      return {
        color: "#FF6B6B",
        mascot,
        text: `✕ error: ${e.message}`,
      };
    default:
      return {
        color: "#C0C6D7",
        mascot,
        text: `${e.event_type}`,
      };
  }
}
