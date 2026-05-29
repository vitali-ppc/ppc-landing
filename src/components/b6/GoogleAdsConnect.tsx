"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  listConnectedAccounts,
  startGoogleAdsOAuth,
  disconnectGoogleAdsAccount,
  type ConnectedAccount,
} from "@/lib/b6-api";

/**
 * Google Ads connection panel for the B6 dashboard.
 *
 * - 0 connected → big "Connect Google Ads" CTA
 * - >=1 connected → compact bar with the active account label, a dropdown
 *   listing all accounts (with search), an "Add more" link, and a banner
 *   surfacing the result of the OAuth callback.
 *
 * Active-account selection is owned by the parent (B6Content). We just call
 * onSelectCustomer when the user picks a row in the dropdown.
 */
export function GoogleAdsConnect({
  activeCustomerId,
  onSelectCustomer,
  onChange,
}: {
  activeCustomerId: string;
  onSelectCustomer: (googleCustomerId: string) => void;
  onChange?: () => void;
}) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [banner, setBanner] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

    if (connected || err) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    refresh();
  }, [refresh]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { auth_url } = await startGoogleAdsOAuth();
      window.location.href = auth_url;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setBanner({ kind: "error", text: `Failed to start OAuth: ${msg}` });
      setConnecting(false);
    }
  };

  const handleDisconnect = async (id: string, customerLabel: string) => {
    if (!confirm(`Disconnect account ${customerLabel}?`)) return;
    try {
      await disconnectGoogleAdsAccount(id);
      setBanner({ kind: "success", text: `Account ${customerLabel} disconnected.` });
      await refresh();
      onChange?.();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setBanner({ kind: "error", text: `Disconnect failed: ${msg}` });
    }
  };

  const filteredAccounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter((a) =>
      a.google_customer_id.toLowerCase().includes(q) ||
      (a.descriptive_name ?? "").toLowerCase().includes(q) ||
      (a.currency ?? "").toLowerCase().includes(q) ||
      (a.timezone ?? "").toLowerCase().includes(q)
    );
  }, [accounts, query]);

  const active = accounts.find((a) => a.google_customer_id === activeCustomerId) ?? accounts[0];

  if (loading) return null;

  const hasConnections = accounts.length > 0;

  return (
    <div style={{ marginBottom: "20px" }}>
      {banner && (
        <div
          style={{
            padding: "10px 14px",
            background: banner.kind === "success" ? "#05966922" : "#DC262622",
            border: `1px solid ${banner.kind === "success" ? "#05966966" : "#DC262666"}`,
            borderRadius: "8px",
            color: banner.kind === "success" ? "#059669" : "#DC2626",
            fontSize: "13px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{banner.kind === "success" ? "" : ""} {banner.text}</span>
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
            background: "linear-gradient(135deg, #FFFFFF 0%, #EEF2F8 100%)",
            border: "1px solid #DCE3ED",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#0D1320", marginBottom: "6px" }}>
              Connect Google Ads to put the agents on your real data
            </div>
            <div style={{ fontSize: "13px", color: "#5B6979", lineHeight: 1.5 }}>
              Right now Buzz/Aegis/Vox are working on mock campaigns. Once connected they'll see
              your real campaigns, ROAS, conversions — and propose real changes.
            </div>
          </div>
          <button
            onClick={handleConnect}
            disabled={connecting}
            style={{
              padding: "12px 24px",
              background: connecting ? "#DCE3ED" : "#0A7C8C",
              color: connecting ? "#5B6979" : "#EEF2F8",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: connecting ? "wait" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {connecting ? "Opening Google..." : "Connect Google Ads"}
          </button>
        </div>
      ) : (
        // Compact status when connected — active customer + dropdown
        <div
          ref={dropdownRef}
          style={{
            position: "relative",
            padding: "12px 16px",
            background: "#FFFFFF",
            border: "1px solid #DCE3ED",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "13px", color: "#059669", fontWeight: 600 }}>
            Google Ads
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            style={{
              padding: "6px 12px",
              background: open ? "#DCE3ED" : "#EEF2F8",
              border: "1px solid #DCE3ED",
              borderRadius: "8px",
              color: "#0D1320",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 280,
              maxWidth: 420,
              justifyContent: "space-between",
            }}
            title="Choose active account"
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {active ? (
                <>
                  <span style={{ fontWeight: 600 }}>
                    {active.descriptive_name || formatCustomerId(active.google_customer_id)}
                  </span>
                  <span style={{ marginLeft: 8, color: "#5B6979", fontFamily: "monospace", fontSize: 11 }}>
                    {formatCustomerId(active.google_customer_id)}
                  </span>
                </>
              ) : (
                "—"
              )}
            </span>
            <span style={{ color: "#5B6979", fontSize: 11 }}>▼</span>
          </button>

          <span style={{ fontSize: "12px", color: "#5B6979" }}>
            {accounts.length} {accounts.length === 1 ? "account" : "accounts"} total
          </span>

          <button
            onClick={handleConnect}
            disabled={connecting}
            style={{
              marginLeft: "auto",
              padding: "6px 12px",
              background: "transparent",
              border: "1px solid #DCE3ED",
              color: "#5B6979",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: connecting ? "wait" : "pointer",
            }}
          >
            {connecting ? "..." : "+ Add more"}
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 16,
                width: "min(420px, calc(100% - 32px))",
                background: "#F6F8FB",
                border: "1px solid #DCE3ED",
                borderRadius: 10,
                boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {accounts.length > 8 && (
                <div style={{ padding: "10px 12px", borderBottom: "1px solid #DCE3ED" }}>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search by ID, currency, timezone..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      background: "#EEF2F8",
                      border: "1px solid #DCE3ED",
                      borderRadius: 6,
                      color: "#0D1320",
                      fontSize: 12,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              )}

              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {filteredAccounts.length === 0 ? (
                  <div style={{ padding: 16, color: "#666", fontSize: 12, textAlign: "center" }}>
                    No matches.
                  </div>
                ) : (
                  filteredAccounts.map((a) => {
                    const isActive = a.google_customer_id === activeCustomerId;
                    const tooltipParts = [
                      a.currency,
                      a.timezone,
                      a.connected_at ? `connected ${new Date(a.connected_at).toLocaleDateString("en-US")}` : null,
                    ].filter(Boolean);
                    return (
                      <div
                        key={a.id}
                        title={tooltipParts.join(" · ")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          background: isActive ? "#0A7C8C1A" : "transparent",
                          borderLeft: isActive ? "3px solid #0A7C8C" : "3px solid transparent",
                          cursor: "pointer",
                          transition: "background 100ms",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                        onClick={() => {
                          onSelectCustomer(a.google_customer_id);
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              color: isActive ? "#0A7C8C" : "#0D1320",
                              fontWeight: isActive ? 600 : 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {a.descriptive_name || formatCustomerId(a.google_customer_id)}
                            {isActive && (
                              <span style={{ marginLeft: 8, fontSize: 10, color: "#0A7C8C" }}>active</span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#666",
                              marginTop: 2,
                              fontFamily: "monospace",
                            }}
                          >
                            {formatCustomerId(a.google_customer_id)}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisconnect(a.id, formatCustomerId(a.google_customer_id));
                          }}
                          title="Disconnect"
                          style={{
                            padding: "4px 8px",
                            background: "transparent",
                            border: "1px solid #DCE3ED",
                            color: "#5B6979",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 10,
                            opacity: 0.6,
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
                        >
                          Disconnect
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
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
