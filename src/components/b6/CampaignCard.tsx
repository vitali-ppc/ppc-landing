"use client";

import React from "react";

export type CampaignMetrics = {
  id: string;
  name: string;
  status: string;
  budget_micros: number;
  bid_strategy: string;
  // optional metrics (могут быть undefined до первого прогона агента)
  roas?: number;
  ctr?: number;
  spend_usd?: number;
  conversions?: number;
};

const formatBudget = (micros: number) => `$${(micros / 1_000_000).toFixed(2)}/day`;

export const CampaignCard: React.FC<{
  campaign: CampaignMetrics;
  highlighted?: boolean;
}> = ({ campaign, highlighted = false }) => {
  const statusColor =
    campaign.status === "ENABLED"
      ? "#4ECDC4"
      : campaign.status === "PAUSED"
      ? "#FFA726"
      : "#A0A0A0";

  return (
    <div
      data-campaign-id={campaign.id}
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "#23272F",
        border: highlighted ? "2px solid #00FFE7" : "1px solid #2D3340",
        transition: "border-color 200ms ease, transform 200ms ease",
        transform: highlighted ? "scale(1.02)" : "scale(1)",
        boxShadow: highlighted ? "0 0 20px rgba(0, 255, 231, 0.25)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <div style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600 }}>
            {campaign.name}
          </div>
          <div style={{ color: "#A0A0A0", fontSize: "12px", marginTop: "2px" }}>
            ID: {campaign.id} · {campaign.bid_strategy}
          </div>
        </div>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "6px",
            background: `${statusColor}22`,
            color: statusColor,
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {campaign.status}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "12px" }}>
        <Metric label="Budget" value={formatBudget(campaign.budget_micros)} />
        <Metric label="ROAS" value={campaign.roas != null ? `${campaign.roas}×` : "—"} accent={campaign.roas != null && campaign.roas >= 3} />
        <Metric label="CTR" value={campaign.ctr != null ? `${(campaign.ctr * 100).toFixed(2)}%` : "—"} accent={campaign.ctr != null && campaign.ctr >= 0.02} />
        <Metric label="Spend" value={campaign.spend_usd != null ? `$${campaign.spend_usd}` : "—"} />
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent = false }) => (
  <div>
    <div style={{ color: "#A0A0A0", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </div>
    <div
      style={{
        color: accent ? "#00FFE7" : "#FFFFFF",
        fontSize: "16px",
        fontWeight: 600,
        marginTop: "2px",
      }}
    >
      {value}
    </div>
  </div>
);
