/**
 * Stripe webhook handler.
 *
 * Принимает события от Stripe (checkout.session.completed, customer.subscription.updated, etc.)
 * и шлёт их в B6 backend для синхронизации subscription_tier пользователя.
 *
 * Setup:
 * 1. В Stripe Dashboard → Developers → Webhooks → Add endpoint
 *    URL: https://your-domain.com/api/stripe-webhook
 *    Events: checkout.session.completed, customer.subscription.created/updated/deleted
 * 2. Скопируй Signing secret в .env: STRIPE_WEBHOOK_SECRET=whsec_...
 *
 * Production: установи `stripe` пакет через `npm i stripe` и активируй верификацию подписи.
 */

import { NextRequest, NextResponse } from "next/server";

const B6_API_BASE = process.env.B6_API_BASE || "http://localhost:8000";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // TODO: на production — установить `stripe` пакет и верифицировать подпись:
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //   const event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
  // Сейчас — простая обработка для dev.

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!WEBHOOK_SECRET) {
    console.warn("STRIPE_WEBHOOK_SECRET not set — accepting webhook without verification (dev mode)");
  }

  // Маппинг типов событий → действия
  const result = await handleEvent(event);

  return NextResponse.json({ received: true, processed: result });
}

async function handleEvent(event: {
  type: string;
  data: { object: Record<string, unknown> };
}): Promise<string> {
  console.log(`[Stripe webhook] event: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed":
      return handleCheckoutCompleted(event.data.object);

    case "customer.subscription.created":
    case "customer.subscription.updated":
      return handleSubscriptionUpdated(event.data.object);

    case "customer.subscription.deleted":
      return handleSubscriptionDeleted(event.data.object);

    default:
      return `ignored: ${event.type}`;
  }
}

async function handleCheckoutCompleted(session: Record<string, unknown>): Promise<string> {
  const customerEmail = (session.customer_email as string) || (session.customer_details as { email?: string })?.email;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  console.log(`[Stripe] checkout completed: email=${customerEmail}, customer=${customerId}, sub=${subscriptionId}`);

  // Шлём в B6 backend для обновления юзера
  try {
    const r = await fetch(`${B6_API_BASE}/api/internal/stripe-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "checkout_completed",
        email: customerEmail,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
      }),
    });
    if (!r.ok) {
      console.error(`B6 sync failed: ${r.status}`);
      return "b6_sync_failed";
    }
  } catch (e) {
    console.error("B6 unreachable:", e);
    return "b6_unreachable";
  }

  return "checkout_synced";
}

async function handleSubscriptionUpdated(sub: Record<string, unknown>): Promise<string> {
  const subId = sub.id as string;
  const status = sub.status as string;
  const items = (sub.items as { data?: Array<{ price?: { id: string } }> })?.data || [];
  const priceId = items[0]?.price?.id;

  // Определяем tier по price ID (нужно настроить mapping в .env)
  const tier = priceIdToTier(priceId);

  console.log(`[Stripe] subscription updated: id=${subId}, status=${status}, tier=${tier}`);

  try {
    await fetch(`${B6_API_BASE}/api/internal/stripe-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "subscription_updated",
        stripe_subscription_id: subId,
        status,
        tier,
        stripe_customer_id: sub.customer,
      }),
    });
  } catch (e) {
    console.error("B6 unreachable:", e);
    return "b6_unreachable";
  }

  return `sub_synced:${tier}`;
}

async function handleSubscriptionDeleted(sub: Record<string, unknown>): Promise<string> {
  const subId = sub.id as string;
  try {
    await fetch(`${B6_API_BASE}/api/internal/stripe-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "subscription_cancelled",
        stripe_subscription_id: subId,
        stripe_customer_id: sub.customer,
      }),
    });
  } catch (e) {
    console.error("B6 unreachable:", e);
  }
  return "sub_cancelled";
}

/**
 * Mapping Stripe Price ID → B6 tier.
 * Заполни после создания продуктов в Stripe Dashboard.
 */
function priceIdToTier(priceId: string | undefined): "l1" | "l2" | "l3" | "unknown" {
  if (!priceId) return "unknown";
  const map: Record<string, "l1" | "l2" | "l3"> = {
    [process.env.STRIPE_PRICE_L1 || "price_l1_placeholder"]: "l1",
    [process.env.STRIPE_PRICE_L2 || "price_l2_placeholder"]: "l2",
    [process.env.STRIPE_PRICE_L3 || "price_l3_placeholder"]: "l3",
  };
  return map[priceId] || "unknown";
}
