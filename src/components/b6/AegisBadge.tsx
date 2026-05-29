"use client";

import React, { useState } from "react";
import type { RiskReview } from "@/lib/b6-api";

const colorFor = (score: number) => {
  if (score <= 30) return "#0B7A68"; // safe — teal
  if (score <= 60) return "#B45309"; // medium — orange
  if (score <= 80) return "#C2410C"; // high — red-orange
  return "#DC2626"; // critical — red
};

const recommendationLabel = (rec: RiskReview["recommendation"]) => {
  switch (rec) {
    case "approve":
      return "✓ Approve OK";
    case "review":
      return "⚠ Review";
    case "block":
      return "✕ Block";
  }
};

export const AegisBadge: React.FC<{ review: RiskReview | null | undefined; compact?: boolean }> = ({
  review,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!review) {
    return compact ? null : (
      <div
        style={{
          fontSize: "10px",
          color: "#666",
          fontStyle: "italic",
        }}
      >
        🛡️ Aegis hasn't reviewed yet
      </div>
    );
  }

  const color = colorFor(review.risk_score);

  if (compact) {
    return (
      <span
        title={`Aegis: ${recommendationLabel(review.recommendation)} (risk ${review.risk_score}/100)`}
        style={{
          padding: "2px 6px",
          borderRadius: "4px",
          background: `${color}22`,
          color,
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        🛡️ {review.risk_score}
      </span>
    );
  }

  const flagCount = review.flags?.length ?? 0;
  const hasExpandable = flagCount > 0 || Boolean(review.note);

  return (
    <div
      style={{
        padding: "10px 12px",
        background: `${color}11`,
        border: `1px solid ${color}44`,
        borderRadius: "8px",
        marginTop: "8px",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: hasExpandable ? "6px" : 0,
        }}
      >
        <div style={{ fontWeight: 600, color }}>
          🛡️ Aegis: {recommendationLabel(review.recommendation)}
        </div>
        <div style={{ color: "#5B6979", fontSize: "11px" }}>
          risk score: <span style={{ color, fontWeight: 700 }}>{review.risk_score}/100</span>
        </div>
      </div>

      {hasExpandable && (
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
          title={showDetails ? "Hide Aegis details" : "Show Aegis details"}
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
            ? "Hide details"
            : `Show details${flagCount > 0 ? ` · ${flagCount} flag${flagCount === 1 ? "" : "s"}` : ""}${review.note ? " + note" : ""}`}
        </button>
      )}

      {showDetails && flagCount > 0 && (
        <ul style={{ margin: "6px 0 0 16px", padding: 0, color: "#37445A" }}>
          {review.flags.map((flag, i) => (
            <li key={i} style={{ marginBottom: "2px" }}>
              {flag}
            </li>
          ))}
        </ul>
      )}

      {showDetails && review.note && (
        <div style={{ marginTop: "6px", color: "#5B6979", fontStyle: "italic" }}>
          “{review.note}”
        </div>
      )}
    </div>
  );
};
