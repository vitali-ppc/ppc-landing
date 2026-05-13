/**
 * Frontend auth — login/register/logout + JWT storage in localStorage.
 *
 * Sprint 6 MVP storage choice: localStorage with a 7-day access token.
 * Refresh-token rotation + httpOnly cookies are known debt for later.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

const TOKEN_KEY = "b6_token";
const USER_KEY = "b6_user";

export type StoredUser = {
  id: string;
  email: string;
  subscription_tier: string | null;
  autonomy_level: string;
  google_ads_accounts_count: number;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: StoredUser;
};

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

function storeAuth(payload: AuthResponse): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, payload.access_token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const parsed = JSON.parse(text);
      detail = parsed.detail ?? text;
    } catch {
      // not JSON — use raw text
    }
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return JSON.parse(text) as T;
}

export async function login(email: string, password: string): Promise<StoredUser> {
  const data = await postJson<AuthResponse>("/api/auth/login", { email, password });
  storeAuth(data);
  return data.user;
}

export async function register(email: string, password: string): Promise<StoredUser> {
  const data = await postJson<AuthResponse>("/api/auth/register", { email, password });
  storeAuth(data);
  return data.user;
}

export function logout(redirectTo: string = "/"): void {
  clearStoredAuth();
  if (typeof window !== "undefined") {
    window.location.assign(redirectTo);
  }
}

export async function fetchCurrentUser(): Promise<StoredUser | null> {
  const token = getStoredToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.status === 401) {
      clearStoredAuth();
      return null;
    }
    if (!res.ok) return null;
    const user = (await res.json()) as StoredUser;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return user;
  } catch {
    return null;
  }
}
