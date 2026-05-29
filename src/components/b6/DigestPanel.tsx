"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  downloadDigestPdf,
  emailDigest,
  getLatestDigest,
  runDigest,
  type EchoDigest,
} from "@/lib/b6-api";

export const DigestPanel: React.FC<{ customerLabel?: string }> = ({ customerLabel }) => {
  const [digest, setDigest] = useState<EchoDigest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"pdf" | "email" | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailNote, setEmailNote] = useState("");
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = window.localStorage.getItem("b6_echo_open");
    return v === null ? true : v === "1";
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("b6_echo_open", open ? "1" : "0");
    }
  }, [open]);

  const refresh = useCallback(async () => {
    const d = await getLatestDigest();
    setDigest(d);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onGenerate = async () => {
    setLoading(true);
    setError(null);
    setEmailStatus(null);
    try {
      const res = await runDigest({ periodDays: 7, sendEmail: false });
      if (res.success && res.digest) {
        setDigest(res.digest);
      } else {
        setError(res.error || "Failed to generate digest");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const onDownloadPdf = async () => {
    setBusy("pdf");
    setError(null);
    try {
      const blob = await downloadDigestPdf(customerLabel);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const datePart = digest?.generated_at?.slice(0, 10) ?? "report";
      a.download = `b6-weekly-report-${datePart}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const openEmailForm = () => {
    setEmailFormOpen(true);
    setEmailStatus(null);
    setError(null);
  };

  const closeEmailForm = () => {
    setEmailFormOpen(false);
  };

  const sendEmail = async () => {
    if (!emailTo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailTo)) {
      setError("Enter a valid email address");
      return;
    }
    setBusy("email");
    setError(null);
    setEmailStatus(null);
    try {
      const res = await emailDigest({
        toEmail: emailTo,
        customerLabel,
        note: emailNote.trim() || undefined,
      });
      if (res.success && res.delivered) {
        setEmailStatus(`Delivered to ${res.to}`);
        setEmailFormOpen(false);
        setEmailNote("");
      } else if (res.success && res.mock_mode) {
        setEmailStatus(
          `Mock mode — saved to server log, NOT actually delivered. ` +
          `Set RESEND_API_KEY in .env.prod + verify domain to enable real sending.`
        );
        setEmailFormOpen(false);
      } else {
        setError(`Failed: ${res.detail || "unknown error"}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(135deg, #FFFFFF 0%, #F6F8FB 100%)",
        borderRadius: "14px",
        border: "1px solid #DCE3ED",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: open ? "12px" : 0,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title={open ? "Collapse Echo digest" : "Expand Echo digest"}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#0D1320",
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            textAlign: "left",
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              color: "#5B6979",
              fontSize: 11,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 100ms",
              marginTop: 2,
            }}
          >
            ▶
          </span>
          <span style={{ minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D1320" }}>
              Echo — Weekly Digest
            </div>
            {digest && (
              <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                {digest.period} · generated {new Date(digest.generated_at).toLocaleString("en-US")}
              </div>
            )}
          </span>
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {digest && (
            <>
              <button
                onClick={onDownloadPdf}
                disabled={busy !== null || loading}
                title="Download a client-ready PDF of this digest"
                style={{
                  padding: "6px 12px",
                  background: busy === "pdf" ? "#DCE3ED" : "transparent",
                  border: "1px solid #DCE3ED",
                  color: busy === "pdf" ? "#666" : "#0B7A68",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy === "pdf" ? "..." : "PDF"}
              </button>
              <button
                onClick={emailFormOpen ? closeEmailForm : openEmailForm}
                disabled={busy !== null || loading}
                title="Email this digest to a client"
                style={{
                  padding: "6px 12px",
                  background: emailFormOpen ? "#B4530922" : busy === "email" ? "#DCE3ED" : "transparent",
                  border: `1px solid ${emailFormOpen ? "#B4530988" : "#DCE3ED"}`,
                  color: busy === "email" ? "#666" : "#B45309",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy === "email" ? "..." : emailFormOpen ? "✕ Cancel" : "Email"}
              </button>
            </>
          )}
          <button
            onClick={onGenerate}
            disabled={loading || busy !== null}
            style={{
              padding: "6px 14px",
              background: loading ? "#DCE3ED" : "transparent",
              border: "1px solid #DCE3ED",
              color: loading ? "#666" : "#4F5BC9",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Echo is thinking..." : digest ? "Refresh" : "Generate"}
          </button>
        </div>
      </div>

      {open && emailFormOpen && (
        <div
          style={{
            padding: "12px",
            background: "#EEF2F8",
            border: "1px solid #B4530944",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontSize: 11, color: "#B45309", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>
            EMAIL REPORT TO CLIENT
          </div>
          <input
            type="email"
            placeholder="client@example.com"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            disabled={busy === "email"}
            autoFocus
            style={{
              width: "100%",
              padding: "8px 10px",
              background: "#F6F8FB",
              border: "1px solid #DCE3ED",
              borderRadius: 6,
              color: "#0D1320",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 8,
            }}
          />
          <textarea
            placeholder="Optional note above the report (e.g. 'Here's the week 19 recap — let me know if you want to discuss any of the held items.')"
            value={emailNote}
            onChange={(e) => setEmailNote(e.target.value)}
            disabled={busy === "email"}
            rows={2}
            style={{
              width: "100%",
              padding: "8px 10px",
              background: "#F6F8FB",
              border: "1px solid #DCE3ED",
              borderRadius: 6,
              color: "#0D1320",
              fontSize: 12,
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 8,
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={closeEmailForm}
              disabled={busy === "email"}
              style={{
                padding: "6px 14px",
                background: "transparent",
                border: "1px solid #DCE3ED",
                color: "#5B6979",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={sendEmail}
              disabled={busy === "email" || !emailTo}
              style={{
                padding: "6px 14px",
                background: busy === "email" ? "#B4530988" : "linear-gradient(135deg, #C2410C, #B45309)",
                border: "none",
                color: "#EEF2F8",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                cursor: busy === "email" ? "wait" : "pointer",
              }}
            >
              {busy === "email" ? "Sending..." : "Send report"}
            </button>
          </div>
          <div style={{ fontSize: 10, color: "#666", marginTop: 8 }}>
            The report will be sent as a PDF attachment with the optional note prepended to the email body.
          </div>
        </div>
      )}

      {open && emailStatus && (
        <div
          style={{
            padding: "8px 10px",
            background: emailStatus.startsWith("") ? "#B4530922" : "#0B7A6822",
            border: `1px solid ${emailStatus.startsWith("") ? "#B4530966" : "#0B7A6844"}`,
            borderRadius: "6px",
            color: emailStatus.startsWith("") ? "#B45309" : "#0B7A68",
            fontSize: "12px",
            marginBottom: "10px",
            lineHeight: 1.4,
          }}
        >
          {emailStatus}
        </div>
      )}

      {open && error && (
        <div
          style={{
            padding: "10px",
            background: "#DC262622",
            border: "1px solid #DC262644",
            borderRadius: "6px",
            color: "#DC2626",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}

      {open && (!digest ? (
        <div style={{ padding: "30px 20px", textAlign: "center", color: "#666", fontSize: "13px" }}>
          No digest yet. Hit "Generate" — Echo reads agent history and produces a summary.
        </div>
      ) : (
        <DigestContent digest={digest} />
      ))}
    </div>
  );
};

const DigestContent: React.FC<{ digest: EchoDigest }> = ({ digest }) => (
  <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        marginBottom: "16px",
      }}
    >
      <Stat label="Actions" value={digest.actions_count} color="#4F5BC9" />
      <Stat label="Applied" value={digest.applied} color="#0B7A68" />
      <Stat label="Rejected" value={digest.rejected} color="#B45309" />
      <Stat label="Blocks" value={digest.blocks} color="#DC2626" />
    </div>

    <div
      style={{
        padding: "12px 14px",
        background: "#EEF2F8",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "13px",
        lineHeight: 1.6,
        color: "#37445A",
      }}
    >
      {digest.summary_text}
    </div>

    {digest.top_decisions && digest.top_decisions.length > 0 && (
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "#5B6979", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Top decisions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {digest.top_decisions.slice(0, 5).map((t, i) => (
            <div
              key={i}
              style={{
                padding: "8px 10px",
                background: "#EEF2F8",
                borderLeft: "2px solid #0A8294",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              <span style={{ marginRight: "8px" }}>{t.emoji}</span>
              <strong style={{ color: "#0D1320" }}>{t.agent}</strong>{" "}
              <span style={{ color: "#5B6979" }}>· {t.when}</span>
              <div style={{ color: "#37445A", marginTop: "2px", lineHeight: 1.5 }}>{t.summary}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {digest.advice && (
      <div
        style={{
          padding: "12px 14px",
          background: "#0A829415",
          border: "1px solid #0A829444",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#0D1320",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "4px", color: "#0A7C8C" }}>
          Echo&apos;s advice
        </div>
        <div style={{ lineHeight: 1.6 }}>{digest.advice}</div>
      </div>
    )}
  </>
);

const Stat: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div
    style={{
      padding: "10px",
      background: "#EEF2F8",
      borderRadius: "8px",
      borderTop: `2px solid ${color}`,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </div>
    <div style={{ fontSize: "20px", fontWeight: 700, color, marginTop: "2px" }}>{value}</div>
  </div>
);
