"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/lib/useAuth";

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
        background: "#15181D",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#1F232B",
          borderRadius: 12,
          padding: 28,
          border: "1px solid #2D3340",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 4 }}>
          Sign in to B6
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 13, margin: 0, marginBottom: 20 }}>
          Your AI PPC team is waiting.
        </p>

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
              padding: "10px 14px",
              background: submitting ? "#3B82F6AA" : "#3B82F6",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: submitting ? "wait" : "pointer",
            }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ marginTop: 18, color: "#A0A0A0", fontSize: 13 }}>
          No account?{" "}
          <Link href="/auth/register" style={{ color: "#7F9CF5" }}>
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
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span style={{ fontSize: 12, color: "#A0A0A0", marginBottom: 4, display: "block" }}>
        {props.label}
      </span>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        required={props.required}
        minLength={props.minLength}
        style={{
          width: "100%",
          padding: "10px 12px",
          background: "#15181D",
          border: "1px solid #2D3340",
          borderRadius: 8,
          color: "#FFFFFF",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </label>
  );
}
