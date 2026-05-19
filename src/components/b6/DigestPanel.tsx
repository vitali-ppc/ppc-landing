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
        setEmailStatus(`✅ Delivered to ${res.to}`);
        setEmailFormOpen(false);
        setEmailNote("");
      } else if (res.success && res.mock_mode) {
        setEmailStatus(
          `⚠️ Mock mode — saved to server log, NOT actually delivered. ` +
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
        background: "linear-gradient(135deg, #1F232B 0%, #15181D 100%)",
        borderRadius: "14px",
        border: "1px solid #2D3340",
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
            color: "#E0E6F7",
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
              color: "#A0A0A0",
              fontSize: 11,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 100ms",
              marginTop: 2,
            }}
          >
            ▶
          </span>
          <span style={{ minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#E0E6F7" }}>
              📊 Echo — Weekly Digest
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
                  background: busy === "pdf" ? "#2D3340" : "transparent",
                  border: "1px solid #2D3340",
                  color: busy === "pdf" ? "#666" : "#4ECDC4",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy === "pdf" ? "..." : "📄 PDF"}
              </button>
              <button
                onClick={emailFormOpen ? closeEmailForm : openEmailForm}
                disabled={busy !== null || loading}
                title="Email this digest to a client"
                style={{
                  padding: "6px 12px",
                  background: emailFormOpen ? "#FFA72622" : busy === "email" ? "#2D3340" : "transparent",
                  border: `1px solid ${emailFormOpen ? "#FFA72688" : "#2D3340"}`,
                  color: busy === "email" ? "#666" : "#FFA726",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy === "email" ? "..." : emailFormOpen ? "✕ Cancel" : "✉️ Email"}
              </button>
            </>
          )}
          <button
            onClick={onGenerate}
            disabled={loading || busy !== null}
            style={{
              padding: "6px 14px",
              background: loading ? "#2D3340" : "transparent",
              border: "1px solid #2D3340",
              color: loading ? "#666" : "#7F9CF5",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "📊 Echo is thinking..." : digest ? "🔄 Refresh" : "📊 Generate"}
          </button>
        </div>
      </div>

      {open && emailFormOpen && (
        <div
          style={{
            padding: "12px",
            background: "#0F1116",
            border: "1px solid #FFA72644",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontSize: 11, color: "#FFA726", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>
            ✉️ EMAIL REPORT TO CLIENT
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
              background: "#15181D",
              border: "1px solid #2D3340",
              borderRadius: 6,
              color: "#E0E6F7",
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
              background: "#15181D",
              border: "1px solid #2D3340",
              borderRadius: 6,
              color: "#E0E6F7",
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
                border: "1px solid #2D3340",
                color: "#A0A0A0",
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
                background: busy === "email" ? "#FFA72688" : "linear-gradient(135deg, #FF8E53, #FFA726)",
                border: "none",
                color: "#0F1116",
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
            background: emailStatus.startsWith("⚠️") ? "#FFA72622" : "#4ECDC422",
            border: `1px solid ${emailStatus.startsWith("⚠️") ? "#FFA72666" : "#4ECDC444"}`,
            borderRadius: "6px",
            color: emailStatus.startsWith("⚠️") ? "#FFA726" : "#4ECDC4",
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
            background: "#FF6B6B22",
            border: "1px solid #FF6B6B44",
            borderRadius: "6px",
            color: "#FF6B6B",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          ⚠️ {error}
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
      <Stat label="Actions" value={digest.actions_count} color="#7F9CF5" />
      <Stat label="Applied" value={digest.applied} color="#4ECDC4" />
      <Stat label="Rejected" value={digest.rejected} color="#FFA726" />
      <Stat label="🛡️ Blocks" value={digest.blocks} color="#FF6B6B" />
    </div>

    <div
      style={{
        padding: "12px 14px",
        background: "#0F1116",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "13px",
        lineHeight: 1.6,
        color: "#C0C6D7",
      }}
    >
      {digest.summary_text}
    </div>

    {digest.top_decisions && digest.top_decisions.length > 0 && (
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "#A0A0A0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          Top decisions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {digest.top_decisions.slice(0, 5).map((t, i) => (
            <div
              key={i}
              style={{
                padding: "8px 10px",
                background: "#0F1116",
                borderLeft: "2px solid #00BFAE",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              <span style={{ marginRight: "8px" }}>{t.emoji}</span>
              <strong style={{ color: "#E0E6F7" }}>{t.agent}</strong>{" "}
              <span style={{ color: "#A0A0A0" }}>· {t.when}</span>
              <div style={{ color: "#C0C6D7", marginTop: "2px", lineHeight: 1.5 }}>{t.summary}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {digest.advice && (
      <div
        style={{
          padding: "12px 14px",
          background: "#00BFAE15",
          border: "1px solid #00BFAE44",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#E0E6F7",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "4px", color: "#00FFE7" }}>
          💡 Echo&apos;s advice
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
      background: "#0F1116",
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
