"use client";

import React from "react";
import type { AgentAction } from "@/lib/b6-api";
import { formatActionShortId, statusBadgeColor } from "@/lib/b6-api";

export const ActivityFeed: React.FC<{ actions: AgentAction[] }> = ({ actions }) => {
  if (actions.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#A0A0A0",
          fontSize: "13px",
          background: "#1F232B",
          borderRadius: "10px",
        }}
      >
        Buzz пока не делал действий. Нажми «Run Buzz» сверху.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {actions.map((a) => (
        <FeedItem key={a.id} action={a} />
      ))}
    </div>
  );
};

const FeedItem: React.FC<{ action: AgentAction }> = ({ action }) => {
  const time = new Date(action.created_at).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const campaign = action.target?.campaign_id;
  const newBid = action.target?.new_bid_usd;
  const isPositive = action.action_type === "update_bid" && newBid != null;

  return (
    <div
      style={{
        padding: "10px 12px",
        background: "#1F232B",
        borderRadius: "8px",
        borderLeft: `3px solid ${statusBadgeColor(action.status)}`,
        fontSize: "13px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <div style={{ color: "#E0E6F7", fontWeight: 500 }}>
          🐝 Buzz · {action.action_type === "update_bid" ? "повысить ставку" : action.action_type === "pause_campaign" ? "поставить паузу" : action.action_type}
          {campaign && (
            <span style={{ color: "#A0A0A0", marginLeft: "6px" }}>
              для кампании <code style={{ color: "#7F9CF5" }}>{campaign}</code>
            </span>
          )}
          {isPositive && (
            <span style={{ color: "#4ECDC4", marginLeft: "6px" }}>→ ${newBid}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background: `${statusBadgeColor(action.status)}22`,
              color: statusBadgeColor(action.status),
              fontSize: "10px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {action.status}
          </span>
          <span style={{ color: "#666", fontSize: "11px" }}>{time}</span>
        </div>
      </div>
      <details style={{ marginTop: "4px" }}>
        <summary
          style={{
            cursor: "pointer",
            color: "#A0A0A0",
            fontSize: "11px",
            userSelect: "none",
            outline: "none",
          }}
        >
          reasoning · confidence {Math.round(action.confidence * 100)}% · id {formatActionShortId(action.id)}
        </summary>
        <div
          style={{
            marginTop: "6px",
            color: "#C0C6D7",
            fontSize: "12px",
            lineHeight: "1.5",
            background: "#15181D",
            padding: "8px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {action.reasoning}
        </div>
      </details>
    </div>
  );
};
