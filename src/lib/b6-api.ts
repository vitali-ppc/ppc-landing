/**
 * B6 API client — interface к локальному FastAPI backend.
 *
 * Backend по умолчанию на http://localhost:8000.
 * Переопределяется через NEXT_PUBLIC_B6_API_BASE.
 *
 * Sprint 6: все protected endpoints требуют JWT в Authorization header.
 * Токен читается из localStorage("b6_token") через getStoredToken().
 * На 401 клиент очищает токен и редиректит на /auth/login.
 */

import { clearStoredAuth, getStoredToken } from "./auth";

const API_BASE =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

export const B6_API_BASE = API_BASE;

export type RiskReview = {
  action_id: string;
  reviewer: string; // 'aegis'
  risk_score: number; // 0-100
  flags: string[];
  recommendation: "approve" | "review" | "block";
  note?: string;
  reviewed_at: string;
};

export type AgentAction = {
  id: string;
  agent_id: string;
  action_type: string;
  target: {
    customer_id?: string;
    campaign_id?: string;
    new_bid_usd?: number;
    new_bid_micros?: number;
  };
  reasoning: string;
  confidence: number;
  status: "proposed" | "pending_approval" | "approved" | "applied" | "rejected" | "reverted";
  before_state: Record<string, unknown> | null;
  after_state: Record<string, unknown> | null;
  created_at: string;
  applied_at: string | null;
  risk_review?: RiskReview | null;
};

export type Agent = {
  id: string;
  type: string;
  mascot_name: string;
  status: "active" | "paused" | "disabled";
  last_run_at: string | null;
};

export type RunAgentResponse = {
  success: boolean;
  agent: string;
  iterations: number;
  tool_calls: number;
  proposed_action_ids: string[];
  final_text: string;
  error: string | null;
};

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleUnauthorized() {
  clearStoredAuth();
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/")) {
    window.location.assign("/auth/login");
  }
}

async function jsonRequest<T>(
  method: string,
  path: string,
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal,
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new UnauthorizedError();
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`B6 API ${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

// ---------- Agents ----------

export async function listAgents(): Promise<{
  user_id: string;
  count: number;
  agents: Agent[];
}> {
  return jsonRequest("GET", `/api/agents`);
}

export async function runAgent(opts: {
  agentType?: string;
  customerId: string;
  campaignId?: string;
  signal?: AbortSignal;
}): Promise<RunAgentResponse> {
  return jsonRequest(
    "POST",
    `/api/agents/run`,
    {
      agent_type: opts.agentType || "bidding",
      customer_id: opts.customerId,
      campaign_id: opts.campaignId,
    },
    opts.signal,
  );
}

// ---------- Actions ----------

export async function listActions(opts: {
  status?: AgentAction["status"];
  limit?: number;
}): Promise<{ count: number; actions: AgentAction[] }> {
  const params = new URLSearchParams({
    limit: String(opts.limit ?? 50),
  });
  if (opts.status) params.set("status", opts.status);
  return jsonRequest("GET", `/api/actions?${params}`);
}

export async function approveAction(
  actionId: string,
  applyToGoogleAds = false,
): Promise<{ status: string; after_state: unknown }> {
  return jsonRequest("POST", `/api/actions/${actionId}/approve`, {
    apply_to_google_ads: applyToGoogleAds,
  });
}

export async function rejectAction(
  actionId: string,
  reason?: string,
): Promise<{ status: string }> {
  return jsonRequest("POST", `/api/actions/${actionId}/reject`, {
    reason: reason || null,
  });
}

// ---------- Campaigns ----------

export type CampaignFromAPI = {
  id: string;
  name: string;
  status: string;
  budget_micros: number;
  bid_strategy: string;
  roas?: number;
  ctr?: number;
  spend_usd?: number;
  conversions?: number;
};

export async function listCampaigns(
  customerId: string,
  includeMetrics = true,
  days = 7,
): Promise<{ count: number; campaigns: CampaignFromAPI[] }> {
  const params = new URLSearchParams({
    customer_id: customerId,
    include_metrics: String(includeMetrics),
    days: String(days),
  });
  return jsonRequest("GET", `/api/campaigns?${params}`);
}

// ---------- Orchestrator (Maximus) ----------

export type AutonomyLevel = "l0" | "l1" | "l2" | "l3";

export type OrchestrationCycle = {
  autonomy_level: AutonomyLevel;
  auto_approved_count: number;
  kept_pending_count: number;
  blocked_count: number;
  auto_approved: Array<{
    action_id: string;
    action_type: string;
    campaign_id?: string;
    reason: string;
    aegis_recommendation?: string;
    aegis_score?: number;
  }>;
  kept_pending: Array<{ action_id: string; reason: string }>;
  blocked: Array<{ action_id: string; reason: string }>;
  run_at: string;
};

export async function runOrchestratorCycle(opts: {
  autonomyLevelOverride?: AutonomyLevel;
}): Promise<OrchestrationCycle> {
  return jsonRequest("POST", "/api/orchestrator/cycle", {
    dry_run: false,
    autonomy_level_override: opts.autonomyLevelOverride,
  });
}

export async function getLatestOrchestration(): Promise<OrchestrationCycle | null> {
  try {
    return await jsonRequest<OrchestrationCycle>("GET", "/api/orchestrator/latest");
  } catch (e) {
    if (e instanceof UnauthorizedError) throw e;
    return null;
  }
}

export async function setAutonomy(
  level: AutonomyLevel,
): Promise<{ autonomy_level: AutonomyLevel; subscription_tier: string | null }> {
  return jsonRequest("POST", "/api/orchestrator/autonomy", {
    autonomy_level: level,
  });
}

// ---------- Digest (Echo) ----------

export type EchoDigest = {
  summary_text: string;
  actions_count: number;
  applied: number;
  rejected: number;
  blocks: number;
  top_decisions: Array<{
    agent: string;
    emoji: string;
    summary: string;
    when: string;
  }>;
  advice: string;
  period: string;
  generated_at: string;
};

export async function getLatestDigest(): Promise<EchoDigest | null> {
  try {
    return await jsonRequest<EchoDigest>("GET", "/api/digest/latest");
  } catch (e) {
    if (e instanceof UnauthorizedError) throw e;
    return null;
  }
}

export async function runDigest(opts: {
  periodDays?: number;
  sendEmail?: boolean;
  emailOverride?: string;
}): Promise<{ success: boolean; digest?: EchoDigest; email_result?: unknown; error?: string }> {
  return jsonRequest("POST", `/api/digest/run`, {
    period_days: opts.periodDays ?? 7,
    send_email: opts.sendEmail ?? false,
    email_override: opts.emailOverride,
  });
}

// ---------- Helpers ----------

export function formatActionShortId(id: string): string {
  return id.slice(0, 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Ads OAuth + connections
// ─────────────────────────────────────────────────────────────────────────────

export type ConnectedAccount = {
  id: string;
  google_customer_id: string;
  descriptive_name: string | null;
  timezone: string | null;
  currency: string | null;
  is_active: boolean;
  connected_at: string;
};

/** Returns the URL where browser should be redirected to start Google OAuth. */
export async function startGoogleAdsOAuth(): Promise<{ auth_url: string; state: string }> {
  return jsonRequest("GET", `/api/google-ads/oauth/start`);
}

export async function listConnectedAccounts(): Promise<ConnectedAccount[]> {
  return jsonRequest("GET", `/api/google-ads/accounts`);
}

export async function disconnectGoogleAdsAccount(
  accountId: string,
): Promise<{ success: boolean; google_customer_id: string }> {
  return jsonRequest("DELETE", `/api/google-ads/accounts/${encodeURIComponent(accountId)}`);
}

export function statusBadgeColor(status: AgentAction["status"]): string {
  switch (status) {
    case "proposed":
      return "#FFA726"; // warning
    case "pending_approval":
      return "#FFA726";
    case "approved":
      return "#45B7D1"; // info
    case "applied":
      return "#4ECDC4"; // success
    case "rejected":
      return "#FF6B6B"; // error
    case "reverted":
      return "#A0A0A0";
    default:
      return "#A0A0A0";
  }
}
