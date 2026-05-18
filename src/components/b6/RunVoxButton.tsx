"use client";

import React, { useState } from "react";
import { runAgent } from "@/lib/b6-api";

/**
 * Run Vox (strategy agent) — cross-campaign budget reallocation.
 * Visually distinct from Buzz (orange/violet vs cyan) so the user
 * doesn't confuse single-campaign vs cross-campaign actions.
 */
export const RunVoxButton: React.FC<{
  customerId: string;
  onComplete: (result: { proposed_action_ids: string[]; iterations: number; tool_calls: number }) => void;
}> = ({ customerId, onComplete }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    if (!customerId) {
      setError("Connect a Google Ads account first.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const r = await runAgent({ customerId, agentType: "strategy" });
      onComplete({
        proposed_action_ids: r.proposed_action_ids,
        iterations: r.iterations,
        tool_calls: r.tool_calls,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        onClick={onClick}
        disabled={busy}
        title="Vox looks at all campaigns at once — proposes budget reallocation"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: busy ? "#A47AFF" : "linear-gradient(135deg, #C9A3FF, #7F58E0)",
          color: "#0F1116",
          fontSize: "14px",
          fontWeight: 700,
          cursor: busy ? "wait" : "pointer",
          boxShadow: "0 4px 12px rgba(127, 88, 224, 0.3)",
          transition: "transform 100ms",
        }}
        onMouseDown={(e) => {
          if (!busy) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {busy ? "🦊 Vox is thinking..." : "🦊 Run Vox now"}
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
