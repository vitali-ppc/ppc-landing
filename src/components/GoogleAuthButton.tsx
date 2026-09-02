"use client";

/**
 * GoogleAuthButton: one-click entry via Google on the sign-in and sign-up pages.
 *
 * WHY IT CAN RETURN NULL. The button is only half of the flow: Google hands back a code, and a
 * backend endpoint has to trade it for this app's own JWT. That endpoint does not exist yet, so a
 * button rendered unconditionally would be a live control on production that fails for every
 * visitor who presses it, which is worse than no button at all.
 *
 * So it renders only when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set. With the variable absent, which is
 * the state today, the pages look exactly as they do now. Setting it is the switch that turns the
 * feature on, once `POST /api/auth/google` is answering.
 */

type Props = {
  /** "signin" changes only the wording; the OAuth request is identical either way. */
  mode: "signin" | "signup";
};

const BRAND_TEXT = "#0D1320";
const MUTED = "#5B6979";
const BORDER = "#D8DEE7";

export default function GoogleAuthButton({ mode }: Props) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) return null;

  const start = () => {
    // `openid email profile` is the smallest scope that identifies a person. Google Ads scopes are
    // deliberately NOT requested here: asking for account access at sign-up scares people off, and
    // Google supports incremental authorisation later, when the visitor actually links an account.
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "select_account",
      // Where to land after the exchange. Read back on the callback page, never sent anywhere else.
      state: mode,
    });
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={start}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "11px 14px",
          borderRadius: 10,
          border: `1px solid ${BORDER}`,
          background: "#FFFFFF",
          color: BRAND_TEXT,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <GoogleMark />
        {mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          margin: "16px 0",
          color: MUTED,
          fontSize: 12,
        }}
      >
        <span style={{ flex: 1, height: 1, background: BORDER }} />
        or
        <span style={{ flex: 1, height: 1, background: BORDER }} />
      </div>
    </>
  );
}

/** Google's four-colour mark, inline so the button needs no network request to render. */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
