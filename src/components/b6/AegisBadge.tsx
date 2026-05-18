"use client";

import React from "react";
import type { RiskReview } from "@/lib/b6-api";

const colorFor = (score: number) => {
  if (score <= 30) return "#4ECDC4"; // safe — teal
  if (score <= 60) return "#FFA726"; // medium — orange
  if (score <= 80) return "#FF8E53"; // high — red-orange
  return "#FF6B6B"; // critical — red
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
          marginBottom: "6px",
        }}
      >
        <div style={{ fontWeight: 600, color }}>
          🛡️ Aegis: {recommendationLabel(review.recommendation)}
        </div>
        <div style={{ color: "#A0A0A0", fontSize: "11px" }}>
          risk score: <span style={{ color, fontWeight: 700 }}>{review.risk_score}/100</span>
        </div>
      </div>

      {review.flags && review.flags.length > 0 && (
        <ul style={{ margin: "4px 0 0 16px", padding: 0, color: "#C0C6D7" }}>
          {review.flags.map((flag, i) => (
            <li key={i} style={{ marginBottom: "2px" }}>
              {flag}
            </li>
          ))}
        </ul>
      )}

      {review.note && (
        <div style={{ marginTop: "6px", color: "#A0A0A0", fontStyle: "italic" }}>
          “{review.note}”
        </div>
      )}
    </div>
  );
};
