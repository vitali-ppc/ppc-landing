/**
 * B6 API client — interface к локальному FastAPI backend.
 *
 * Backend по умолчанию на http://localhost:8000.
 * Переопределяется через NEXT_PUBLIC_B6_API_BASE.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

const DEV_USER_ID = "dev-user-001"; // На MVP — single user, потом из auth

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

async function jsonRequest<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`B6 API ${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

// ---------- Agents ----------

export async function listAgents(userId = DEV_USER_ID): Promise<{
  user_id: string;
  count: number;
  agents: Agent[];
}> {
  return jsonRequest("GET", `/api/agents?user_id=${userId}`);
}

export async function runAgent(opts: {
  userId?: string;
  agentType?: string;
  customerId: string;
  campaignId?: string;
}): Promise<RunAgentResponse> {
  return jsonRequest("POST", `/api/agents/run`, {
    user_id: opts.userId || DEV_USER_ID,
    agent_type: opts.agentType || "bidding",
    customer_id: opts.customerId,
    campaign_id: opts.campaignId,
  });
}

// ---------- Actions ----------

export async function listActions(opts: {
  userId?: string;
  status?: AgentAction["status"];
  limit?: number;
}): Promise<{ count: number; actions: AgentAction[] }> {
  const params = new URLSearchParams({
    user_id: opts.userId || DEV_USER_ID,
    limit: String(opts.limit ?? 50),
  });
  if (opts.status) params.set("status", opts.status);
  return jsonRequest("GET", `/api/actions?${params}`);
}

export async function approveAction(
  actionId: string,
  applyToGoogleAds = false
): Promise<{ status: string; after_state: unknown }> {
  return jsonRequest("POST", `/api/actions/${actionId}/approve`, {
    approver_user_id: DEV_USER_ID,
    apply_to_google_ads: applyToGoogleAds,
  });
}

export async function rejectAction(
  actionId: string,
  reason?: string
): Promise<{ status: string }> {
  return jsonRequest("POST", `/api/actions/${actionId}/reject`, {
    approver_user_id: DEV_USER_ID,
    reason: reason || null,
  });
}

// ---------- Helpers ----------

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
  includeMetrics = true
): Promise<{ count: number; campaigns: CampaignFromAPI[] }> {
  const params = new URLSearchParams({
    customer_id: customerId,
    include_metrics: String(includeMetrics),
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
  userId?: string;
  autonomyLevelOverride?: AutonomyLevel;
}): Promise<OrchestrationCycle> {
  return jsonRequest("POST", "/api/orchestrator/cycle", {
    user_id: opts.userId || DEV_USER_ID,
    dry_run: false,
    autonomy_level_override: opts.autonomyLevelOverride,
  });
}

export async function getLatestOrchestration(
  userId = DEV_USER_ID
): Promise<OrchestrationCycle | null> {
  try {
    const res = await fetch(`${API_BASE}/api/orchestrator/latest?user_id=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function setAutonomy(
  level: AutonomyLevel,
  userId = DEV_USER_ID
): Promise<{ autonomy_level: AutonomyLevel; subscription_tier: string | null }> {
  return jsonRequest("POST", "/api/orchestrator/autonomy", {
    user_id: userId,
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

export async function getLatestDigest(userId = DEV_USER_ID): Promise<EchoDigest | null> {
  try {
    const res = await fetch(`${API_BASE}/api/digest/latest?user_id=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function runDigest(opts: {
  userId?: string;
  periodDays?: number;
  sendEmail?: boolean;
  emailOverride?: string;
}): Promise<{ success: boolean; digest?: EchoDigest; email_result?: unknown; error?: string }> {
  return jsonRequest("POST", `/api/digest/run`, {
    user_id: opts.userId || DEV_USER_ID,
    period_days: opts.periodDays ?? 7,
    send_email: opts.sendEmail ?? false,
    email_override: opts.emailOverride,
  });
}

// ---------- Helpers ----------

export function formatActionShortId(id: string): string {
  return id.slice(0, 8);
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
