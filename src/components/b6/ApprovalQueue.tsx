"use client";

import React, { useState } from "react";
import type { AgentAction } from "@/lib/b6-api";
import { approveAction, rejectAction } from "@/lib/b6-api";
import { AegisBadge } from "./AegisBadge";

export const ApprovalQueue: React.FC<{
  pending: AgentAction[];
  onActionChange: () => void;
}> = ({ pending, onActionChange }) => {
  if (pending.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#A0A0A0",
          fontSize: "13px",
          background: "#1F232B",
          borderRadius: "10px",
          border: "1px dashed #2D3340",
        }}
      >
        ✅ No actions pending approval
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {pending.map((a) => (
        <ApprovalRow key={a.id} action={a} onActionChange={onActionChange} />
      ))}
    </div>
  );
};

const ApprovalRow: React.FC<{
  action: AgentAction;
  onActionChange: () => void;
}> = ({ action, onActionChange }) => {
  const [busy, setBusy] = useState<"approve" | "reject" | null>(null);
  const [applyReal, setApplyReal] = useState(false);

  const campaign = action.target?.campaign_id;
  const newBid = (action.target as { new_bid_usd?: number })?.new_bid_usd;
  const recType = (action.target as { recommendation_type?: string })?.recommendation_type;
  const impactSummary = (action.target as { impact_summary?: string })?.impact_summary;
  const negKeyword = (action.target as { keyword_text?: string })?.keyword_text;
  const negMatch = (action.target as { match_type?: string })?.match_type;

  const actionLabel =
    action.action_type === "update_bid"
      ? `Raise bid to $${newBid}`
      : action.action_type === "pause_campaign"
      ? "Pause campaign"
      : action.action_type === "apply_recommendation"
      ? `Apply Google recommendation: ${recType ?? "?"}`
      : action.action_type === "add_negative_keyword"
      ? `Add negative keyword: "${negKeyword ?? "?"}" [${negMatch ?? "EXACT"}]`
      : action.action_type;

  // Action types that have real-apply wired through google_ads_client + actions router.
  const supportsRealApply =
    action.action_type === "pause_campaign" ||
    action.action_type === "apply_recommendation" ||
    action.action_type === "add_negative_keyword";

  const isGoogleRecommendation = action.action_type === "apply_recommendation";
  const isSageProposal = action.action_type === "add_negative_keyword";

  const onApprove = async () => {
    if (applyReal) {
      const ok = confirm(
        `⚠️ This will REALLY ${actionLabel.toLowerCase()} in the client's Google Ads account.\n\n` +
        `Campaign: ${campaign}\n` +
        `This action is logged and counted against the daily safety cap (5 real applies/24h).\n\n` +
        `Proceed?`
      );
      if (!ok) return;
    }
    setBusy("approve");
    try {
      await approveAction(action.id, applyReal);
      onActionChange();
    } catch (e) {
      console.error(e);
      alert(`Error: ${e}`);
    } finally {
      setBusy(null);
    }
  };

  const onReject = async () => {
    const reason = prompt("Reason for rejection (optional):") || undefined;
    setBusy("reject");
    try {
      await rejectAction(action.id, reason);
      onActionChange();
    } catch (e) {
      console.error(e);
      alert(`Error: ${e}`);
    } finally {
      setBusy(null);
    }
  };

  // Border-color подсвечивается по Aegis-recommendation
  const review = action.risk_review;
  const borderColor = review
    ? review.recommendation === "block"
      ? "#FF6B6B66"
      : review.recommendation === "review"
      ? "#FFA72666"
      : "#4ECDC466"
    : "#FFA72644";

  return (
    <div
      style={{
        padding: "14px 16px",
        background: "#1F232B",
        borderRadius: "10px",
        border: `1px solid ${borderColor}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span>
              {isSageProposal ? "🦉 Sage" : "🐝 Buzz"} proposes:{" "}
              <span style={{ color: "#00FFE7" }}>{actionLabel}</span>
            </span>
            {isGoogleRecommendation && (
              <span
                title="This proposal comes from Google's own recommendation engine"
                style={{
                  padding: "2px 8px",
                  background: "#4285F422",
                  border: "1px solid #4285F466",
                  color: "#4285F4",
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                📍 GOOGLE
              </span>
            )}
            {isSageProposal && (
              <span
                title="Sage found this junk query in search terms data"
                style={{
                  padding: "2px 8px",
                  background: "#FFA72622",
                  border: "1px solid #FFA72666",
                  color: "#FFA726",
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                🚫 NEGATIVE
              </span>
            )}
            <AegisBadge review={review} compact />
          </div>
          <div style={{ color: "#A0A0A0", fontSize: "12px", marginBottom: "8px" }}>
            {campaign && <>Campaign <code style={{ color: "#7F9CF5" }}>{campaign}</code> · </>}
            confidence {Math.round(action.confidence * 100)}%
            {impactSummary && <> · <span style={{ color: "#4ECDC4" }}>impact: {impactSummary}</span></>}
          </div>
          <div
            style={{
              color: "#C0C6D7",
              fontSize: "12px",
              lineHeight: "1.5",
              background: "#15181D",
              padding: "8px 10px",
              borderRadius: "6px",
            }}
          >
            {action.reasoning}
          </div>
          <AegisBadge review={review} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "140px" }}>
          <button
            onClick={onApprove}
            disabled={busy !== null}
            title={applyReal ? "Approve AND apply to Google Ads now" : "Approve (dry-run, no real change)"}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: applyReal
                ? busy === "approve"
                  ? "#FF6B6B88"
                  : "linear-gradient(135deg, #FF8E53, #FF6B6B)"
                : busy === "approve"
                  ? "#4ECDC488"
                  : "#4ECDC4",
              color: "#0F1116",
              fontSize: "13px",
              fontWeight: 600,
              cursor: busy !== null ? "wait" : "pointer",
              transition: "background 150ms",
            }}
          >
            {busy === "approve" ? "..." : applyReal ? "⚠ Apply now" : "✓ Approve"}
          </button>
          {supportsRealApply && (
            <label
              title="When ON, approving will WRITE to the real Google Ads account (not dry-run)"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                color: applyReal ? "#FF8E53" : "#A0A0A0",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={applyReal}
                onChange={(e) => setApplyReal(e.target.checked)}
                disabled={busy !== null}
                style={{ accentColor: "#FF6B6B", cursor: "pointer" }}
              />
              <span>Apply to Google Ads</span>
            </label>
          )}
          <button
            onClick={onReject}
            disabled={busy !== null}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #FF6B6B66",
              background: "transparent",
              color: "#FF6B6B",
              fontSize: "13px",
              fontWeight: 600,
              cursor: busy !== null ? "wait" : "pointer",
              transition: "background 150ms",
            }}
          >
            {busy === "reject" ? "..." : "✕ Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};
