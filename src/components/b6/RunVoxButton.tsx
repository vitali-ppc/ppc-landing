"use client";

import React, { useRef, useState } from "react";
import { runAgent } from "@/lib/b6-api";

/**
 * Run Vox (strategy agent) — cross-campaign budget reallocation.
 * Visually distinct from Buzz (violet vs cyan). Hover during a run swaps the
 * label to "Stop" and click aborts the in-flight fetch.
 */
export const RunVoxButton: React.FC<{
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
    if (!customerId) {
      setError("Connect a Google Ads account first.");
      return;
    }
    setError(null);
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const r = await runAgent({ customerId, agentType: "strategy", signal: controller.signal });
      onComplete({
        proposed_action_ids: r.proposed_action_ids,
        iterations: r.iterations,
        tool_calls: r.tool_calls,
      });
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        // user-initiated stop
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
        title={busy ? "Click to stop" : "Vox looks at all campaigns at once — proposes budget reallocation"}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: showStop
            ? "linear-gradient(135deg, #FF6B6B, #C84343)"
            : busy
              ? "#A47AFF"
              : "linear-gradient(135deg, #C9A3FF, #7F58E0)",
          color: "#0F1116",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: showStop
            ? "0 4px 12px rgba(255, 107, 107, 0.35)"
            : "0 4px 12px rgba(127, 88, 224, 0.3)",
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
            ? "🦊 Vox is thinking..."
            : "🦊 Run Vox now"}
      </button>
      {error && (
        <div
          style={{
            marginTop: "8px",
            color: "#FF6B6B",
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
