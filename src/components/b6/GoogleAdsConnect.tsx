"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  listConnectedAccounts,
  startGoogleAdsOAuth,
  disconnectGoogleAdsAccount,
  type ConnectedAccount,
} from "@/lib/b6-api";

/**
 * Google Ads connection panel for the B6 dashboard.
 *
 * - If user has 0 connected accounts → big "Connect Google Ads" CTA
 * - If user has ≥1 → compact status line with disconnect option
 *
 * After OAuth callback completes, our backend redirects browser to
 * `/b6?google_ads_connected=N&added=N&updated=N` (or `?google_ads_error=...`).
 * We pick those query params up on mount, show a toast-style banner, then
 * scrub them from the URL.
 */
export function GoogleAdsConnect({ onChange }: { onChange?: () => void }) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [banner, setBanner] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const refresh = useCallback(async () => {
    try {
      const list = await listConnectedAccounts();
      setAccounts(list.filter((a) => a.is_active));
    } catch (e) {
      console.warn("Failed to load Google Ads accounts:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pick up OAuth callback indicators from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("google_ads_connected");
    const err = params.get("google_ads_error");

    if (connected) {
      const added = params.get("added") ?? "0";
      const updated = params.get("updated") ?? "0";
      setBanner({
        kind: "success",
        text: `Google Ads connected — ${added} added, ${updated} updated.`,
      });
    } else if (err) {
      setBanner({
        kind: "error",
        text: `OAuth error: ${err}. Please try again.`,
      });
    }

    // Scrub query params from URL without reload
    if (connected || err) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    refresh();
  }, [refresh]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { auth_url } = await startGoogleAdsOAuth();
      // Redirect browser to Google's OAuth page
      window.location.href = auth_url;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setBanner({ kind: "error", text: `Failed to start OAuth: ${msg}` });
      setConnecting(false);
    }
  };

  const handleDisconnect = async (id: string) => {
    if (!confirm("Disconnect this Google Ads account?")) return;
    try {
      await disconnectGoogleAdsAccount(id);
      setBanner({ kind: "success", text: "Account disconnected." });
      await refresh();
      onChange?.();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setBanner({ kind: "error", text: `Disconnect failed: ${msg}` });
    }
  };

  if (loading) return null;

  const hasConnections = accounts.length > 0;

  return (
    <div style={{ marginBottom: "20px" }}>
      {banner && (
        <div
          style={{
            padding: "10px 14px",
            background: banner.kind === "success" ? "#10b98122" : "#FF6B6B22",
            border: `1px solid ${banner.kind === "success" ? "#10b98166" : "#FF6B6B66"}`,
            borderRadius: "8px",
            color: banner.kind === "success" ? "#10b981" : "#FF6B6B",
            fontSize: "13px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{banner.kind === "success" ? "✅" : "⚠️"} {banner.text}</span>
          <button
            onClick={() => setBanner(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              fontSize: "16px",
              opacity: 0.6,
            }}
          >
            ×
          </button>
        </div>
      )}

      {!hasConnections ? (
        // Big CTA when nothing connected
        <div
          style={{
            padding: "20px 24px",
            background: "linear-gradient(135deg, #1F232B 0%, #1A2331 100%)",
            border: "1px solid #2D3441",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#E0E6F7", marginBottom: "6px" }}>
              🐝 Connect Google Ads to put the agents on your real data
            </div>
            <div style={{ fontSize: "13px", color: "#A0A0A0", lineHeight: 1.5 }}>
              Right now Buzz/Aegis/Vox are working on mock campaigns. Once connected they'll see
              your real campaigns, ROAS, conversions — and propose real changes.
            </div>
          </div>
          <button
            onClick={handleConnect}
            disabled={connecting}
            style={{
              padding: "12px 24px",
              background: connecting ? "#2D3441" : "#00FFE7",
              color: connecting ? "#A0A0A0" : "#0F1116",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: connecting ? "wait" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {connecting ? "Opening Google..." : "🔗 Connect Google Ads"}
          </button>
        </div>
      ) : (
        // Compact status when connected
        <div
          style={{
            padding: "12px 16px",
            background: "#1F232B",
            border: "1px solid #2D3441",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 600 }}>
            ✅ Google Ads connected
          </span>
          <span style={{ fontSize: "13px", color: "#A0A0A0" }}>
            ({accounts.length} {accounts.length === 1 ? "account" : "accounts"}):
          </span>
          {accounts.slice(0, 3).map((a) => (
            <span
              key={a.id}
              style={{
                fontSize: "12px",
                color: "#E0E6F7",
                background: "#0F1116",
                padding: "4px 10px",
                borderRadius: "6px",
                fontFamily: "monospace",
              }}
              title={`${a.timezone ?? "?"} · ${a.currency ?? "?"} · ${a.connected_at}`}
            >
              {formatCustomerId(a.google_customer_id)}
              {a.currency && <span style={{ marginLeft: "6px", color: "#A0A0A0" }}>{a.currency}</span>}
              <button
                onClick={() => handleDisconnect(a.id)}
                style={{
                  marginLeft: "8px",
                  background: "transparent",
                  border: "none",
                  color: "#A0A0A0",
                  cursor: "pointer",
                  fontSize: "12px",
                  padding: 0,
                }}
                title="Disconnect account"
              >
                ✕
              </button>
            </span>
          ))}
          {accounts.length > 3 && (
            <span style={{ fontSize: "12px", color: "#A0A0A0" }}>
              + {accounts.length - 3} more
            </span>
          )}
          <button
            onClick={handleConnect}
            disabled={connecting}
            style={{
              marginLeft: "auto",
              padding: "6px 12px",
              background: "transparent",
              border: "1px solid #2D3441",
              color: "#A0A0A0",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: connecting ? "wait" : "pointer",
            }}
          >
            {connecting ? "..." : "+ Add more"}
          </button>
        </div>
      )}
    </div>
  );
}

/** Format raw 10-digit customer ID as 123-456-7890 for readability. */
function formatCustomerId(id: string): string {
  if (id.length !== 10) return id;
  return `${id.slice(0, 3)}-${id.slice(3, 6)}-${id.slice(6)}`;
}
