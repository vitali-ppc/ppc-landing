"use client";

/**
 * Where Google returns after a one-click sign-in.
 *
 * The code Google hands back is worthless to the browser: only a server holding the client secret
 * can trade it for an identity. So this page forwards it to the backend and expects exactly the
 * response `/api/auth/login` already returns: same shape, same token, same user object. That is
 * the whole reason the rest of the app needs no changes.
 *
 * `POST /api/auth/google` does not exist on the backend yet. Nothing reaches this page until
 * `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set, because the button that starts the flow does not render
 * without it, so today this file is unreachable rather than broken.
 */

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

function Exchange() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const denied = params.get("error");
    if (denied) {
      // The visitor pressed Cancel on Google's screen. That is a choice, not a failure.
      setError("Sign-in was cancelled.");
      return;
    }

    const code = params.get("code");
    if (!code) {
      setError("Google did not return an authorisation code.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            redirect_uri: `${window.location.origin}/auth/google/callback`,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (cancelled) return;
        // Same keys the email flow writes, so useAuth and every guarded page read it unchanged.
        window.localStorage.setItem("b6_token", data.access_token);
        window.localStorage.setItem("b6_user", JSON.stringify(data.user));
        router.replace("/chat");
      } catch {
        if (!cancelled) setError("Could not complete Google sign-in. Try email instead.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params, router]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0D1320",
        fontSize: 14,
        padding: 24,
        textAlign: "center",
      }}
    >
      {error ? (
        <div>
          <p style={{ margin: 0, marginBottom: 12 }}>{error}</p>
          <Link href="/auth/login" style={{ color: "#0A7C8C", fontWeight: 600 }}>
            Back to sign in
          </Link>
        </div>
      ) : (
        <p style={{ margin: 0, color: "#5B6979" }}>Signing you in…</p>
      )}
    </main>
  );
}

export default function GoogleCallbackPage() {
  // useSearchParams needs a Suspense boundary for the static build to prerender this route.
  return (
    <Suspense fallback={null}>
      <Exchange />
    </Suspense>
  );
}
