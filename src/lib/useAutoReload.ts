"use client";

/**
 * useAutoReload — silently reloads the page when a new Vercel deploy ships.
 *
 * Polls /api/build-info every 60s. Remembers the buildId from the first
 * successful fetch. If a later poll returns a different buildId, calls
 * window.location.reload() — no banner, no user prompt.
 *
 * This eliminates Cmd+Shift+R after every deploy. The user always runs
 * the latest UI, transparently.
 *
 * Trade-off: if a user is in the middle of typing something, the reload
 * will interrupt them. For B6 (mostly read-only dashboard + button clicks)
 * this is fine. If we ever add long forms, switch to a banner.
 */

import { useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 60_000;

export function useAutoReload(enabled: boolean = true) {
  const initialBuildIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    let cancelled = false;

    const checkVersion = async () => {
      try {
        const res = await fetch("/api/build-info", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { buildId?: string };
        if (!data.buildId) return;
        if (cancelled) return;

        if (initialBuildIdRef.current === null) {
          // First poll — remember and exit.
          initialBuildIdRef.current = data.buildId;
          return;
        }
        if (initialBuildIdRef.current !== data.buildId) {
          // New deploy detected. Reload silently.
          window.location.reload();
        }
      } catch {
        // Network blip — try again next interval.
      }
    };

    // Initial check + then poll.
    checkVersion();
    const t = setInterval(checkVersion, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [enabled]);
}
