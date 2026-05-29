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
          color: "#5B6979",
          fontSize: "13px",
          background: "#FFFFFF",
          borderRadius: "10px",
        }}
      >
        Buzz hasn't taken any actions yet. Hit "Run Buzz" up top.
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
  const time = new Date(action.created_at).toLocaleTimeString("en-US", {
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
        background: "#FFFFFF",
        borderRadius: "8px",
        borderLeft: `3px solid ${statusBadgeColor(action.status)}`,
        fontSize: "13px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <div style={{ color: "#0D1320", fontWeight: 500 }}>
          🐝 Buzz · {action.action_type === "update_bid" ? "raise bid" : action.action_type === "pause_campaign" ? "pause campaign" : action.action_type}
          {campaign && (
            <span style={{ color: "#5B6979", marginLeft: "6px" }}>
              on campaign <code style={{ color: "#4F5BC9" }}>{campaign}</code>
            </span>
          )}
          {isPositive && (
            <span style={{ color: "#0B7A68", marginLeft: "6px" }}>→ ${newBid}</span>
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
            color: "#5B6979",
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
            color: "#37445A",
            fontSize: "12px",
            lineHeight: "1.5",
            background: "#F6F8FB",
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
