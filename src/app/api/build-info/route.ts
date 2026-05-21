/**
 * GET /api/build-info — returns the current Vercel build ID.
 *
 * Used by useAutoReload hook to detect new deployments and silently
 * reload the page so the user always runs the latest UI. No banners,
 * no manual Cmd+Shift+R required.
 *
 * Vercel auto-sets VERCEL_GIT_COMMIT_SHA on every deploy. Locally we
 * fall back to a process start time so each `npm run dev` restart
 * also triggers a reload (useful while developing).
 */
import { NextResponse } from "next/server";

// Generated once per server process. Same across all requests until restart.
const LOCAL_FALLBACK = `dev-${Date.now()}`;

export async function GET() {
  const buildId =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_BUILD_ID ||
    LOCAL_FALLBACK;

  return NextResponse.json(
    { buildId },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
