"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/lib/useAuth";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/b6");
    }
  }, [isLoading, user, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/b6");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F6F8FB",
        color: "#0D1320",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "-0.01em",
          color: "#0D1320",
          textDecoration: "none",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: 99,
            background: "#0A7C8C",
            boxShadow: "0 0 12px #0A7C8C",
          }}
        />
        kampaio
      </Link>
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#FFFFFF",
          borderRadius: 12,
          padding: 28,
          border: "1px solid #DCE3ED",
          boxShadow: "0 24px 60px -34px rgba(13,19,32,.20)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 4 }}>
          Sign in
        </h1>
        <p style={{ color: "#5B6979", fontSize: 13, margin: 0, marginBottom: 20 }}>
          Your AI PPC team is waiting.
        </p>

        <GoogleAuthButton mode="signin" />

        <form onSubmit={onSubmit}>
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            required
          />

          {error && (
            <div
              style={{
                marginTop: 12,
                padding: "10px 12px",
                background: "#FF6B6B22",
                border: "1px solid #FF6B6B66",
                borderRadius: 8,
                color: "#FF6B6B",
                fontSize: 12,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 18,
              width: "100%",
              padding: "12px 14px",
              background: submitting ? "#0A7C8CAA" : "#0A7C8C",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: submitting ? "wait" : "pointer",
            }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ marginTop: 18, color: "#5B6979", fontSize: 13 }}>
          No account?{" "}
          <Link href="/auth/register" style={{ color: "#0A7C8C", fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field(props: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  const isPassword = props.type === "password";
  const [revealed, setRevealed] = useState(false);
  const effectiveType = isPassword && revealed ? "text" : props.type;
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span style={{ fontSize: 12, color: "#5B6979", marginBottom: 4, display: "block" }}>
        {props.label}
      </span>
      <div style={{ position: "relative" }}>
      <input
        type={effectiveType}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        required={props.required}
        minLength={props.minLength}
        style={{
          width: "100%",
          padding: "10px 12px",
          paddingRight: isPassword ? 40 : 12,
          background: "#FFFFFF",
          border: "1px solid #DCE3ED",
          borderRadius: 8,
          color: "#0D1320",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-label={revealed ? "Hide password" : "Show password"}
          title={revealed ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: revealed ? "#0A7C8C" : "#5B6979",
            cursor: "pointer",
            padding: 6,
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          {revealed ? "🙈" : "👁"}
        </button>
      )}
      </div>
    </label>
  );
}
