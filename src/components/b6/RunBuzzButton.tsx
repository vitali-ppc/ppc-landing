"use client";

import React, { useRef, useState } from "react";
import { runAgent } from "@/lib/b6-api";

/**
 * Run-Buzz button with built-in cancel.
 *
 * While Buzz is running, hovering the button swaps the label to "Stop" — click
 * aborts the in-flight fetch. The backend agent loop will finish on its own (it
 * doesn't yet observe client disconnects), but the UI immediately frees up.
 */
export const RunBuzzButton: React.FC<{
  customerId: string;
  onComplete: (result: { proposed_action_ids: string[]; iterations: number; tool_calls: number }) => void;
}> = ({ customerId, onComplete }) => {
  const [busy, setBusy] = useState(false);
  const [hover, setHover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const onClick = async () => {
    if (busy) {
      abortRef.current?.abort();
      abortRef.current = null;
      setBusy(false);
      setHover(false);
      return;
    }
    setError(null);
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const r = await runAgent({ customerId, signal: controller.signal });
      onComplete({
        proposed_action_ids: r.proposed_action_ids,
        iterations: r.iterations,
        tool_calls: r.tool_calls,
      });
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        // user-initiated stop — silent
      } else {
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const showStop = busy && hover;

  return (
    <div>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={busy ? "Click to stop" : "Run Buzz now"}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: showStop
            ? "linear-gradient(135deg, #DC2626, #B91C1C)"
            : busy
              ? "#0A8294"
              : "linear-gradient(135deg, #0A7C8C, #0A8294)",
          color: "#EEF2F8",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: showStop
            ? "0 4px 12px rgba(255, 107, 107, 0.35)"
            : "0 4px 12px rgba(0, 255, 231, 0.3)",
          transition: "background 120ms, box-shadow 120ms",
          minWidth: 160,
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {showStop
          ? "🛑 Stop"
          : busy
            ? "🐝 Buzz is thinking..."
            : "🐝 Run Buzz now"}
      </button>
      {error && (
        <div
          style={{
            marginTop: "8px",
            color: "#DC2626",
            fontSize: "12px",
            maxWidth: "300px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
