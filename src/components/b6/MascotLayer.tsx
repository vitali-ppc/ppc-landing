"use client";

/**
 * MascotLayer — overlay поверх дашборда.
 *
 * Подписан на live events. По типу события вычисляет позицию маскотов
 * (Buzz 🐝, Aegis 🛡️) и плавно перемещает их через Framer Motion.
 *
 * Состояния маскота:
 * - hidden  — off-screen, не виден
 * - idle    — в углу экрана, медленно покачивается
 * - on-card — над конкретной кампанией (с speech bubble)
 * - center  — в центре (для thinking/done состояний)
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LiveEvent } from "@/lib/b6-socket";

type MascotState = "hidden" | "idle" | "on-card" | "center" | "done";

type MascotInfo = {
  state: MascotState;
  x: number;
  y: number;
  message: string;
  campaignId: string | null;
};

const IDLE_BUZZ: MascotInfo = { state: "hidden", x: 0, y: 0, message: "", campaignId: null };
const IDLE_AEGIS: MascotInfo = { state: "hidden", x: 0, y: 0, message: "", campaignId: null };

const MESSAGE_DECAY_MS = 5000;
// If we go this long without any new event, force-clear both mascots.
// Protects against stuck "is gearing up…" when backend's `agent.done`
// event doesn't reach the frontend (Socket.IO drop, network blip, etc.).
const STALE_MASCOT_MS = 30000;

export const MascotLayer: React.FC<{ events: LiveEvent[] }> = ({ events }) => {
  const [buzz, setBuzz] = useState<MascotInfo>(IDLE_BUZZ);
  const [aegis, setAegis] = useState<MascotInfo>(IDLE_AEGIS);
  const lastEventIdxRef = useRef(-1);
  const staleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reaction на новые события + safety timeout сбрасывающий зависший mascot
  useEffect(() => {
    if (events.length === 0) return;
    if (events.length - 1 <= lastEventIdxRef.current) return;
    lastEventIdxRef.current = events.length - 1;

    const newEvents = events.slice(lastEventIdxRef.current);
    newEvents.forEach((e) => {
      handleEvent(e, { setBuzz, setAegis });
    });

    // Reset stale timer on every new event. If nothing arrives for 30s,
    // assume agent is done (backend forgot to emit done) and clear mascots.
    if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    staleTimerRef.current = setTimeout(() => {
      setBuzz(IDLE_BUZZ);
      setAegis(IDLE_AEGIS);
    }, STALE_MASCOT_MS);

    return () => {
      if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    };
  }, [events]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {buzz.state !== "hidden" && (
          <Mascot key="buzz" emoji="🐝" glow="#FFA726" info={buzz} />
        )}
        {aegis.state !== "hidden" && (
          <Mascot key="aegis" emoji="🛡️" glow="#7F9CF5" info={aegis} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// Mascot — отдельный анимированный элемент
// ============================================================================

const Mascot: React.FC<{ emoji: string; glow: string; info: MascotInfo }> = ({
  emoji,
  glow,
  info,
}) => {
  const isIdle = info.state === "idle";
  const isCenter = info.state === "center";
  const isDone = info.state === "done";

  // Idle позиция — bottom-right corner с лёгким покачиванием
  let x = info.x;
  let y = info.y;

  if (typeof window !== "undefined") {
    if (isIdle) {
      x = window.innerWidth - 80;
      y = window.innerHeight - 100;
    } else if (isCenter) {
      x = window.innerWidth / 2 - 30;
      y = window.innerHeight / 2 - 30;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: isDone ? 1.2 : 1,
        x,
        y,
        rotate: isIdle ? [0, 5, -5, 0] : 0,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        x: { type: "spring", stiffness: 120, damping: 18 },
        y: { type: "spring", stiffness: 120, damping: 18 },
        rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        scale: { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "60px",
        height: "60px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: "44px",
          filter: `drop-shadow(0 0 12px ${glow}AA)`,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {emoji}
      </div>
      {info.message && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            top: "55px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 17, 22, 0.95)",
            border: `1px solid ${glow}66`,
            color: "#E0E6F7",
            padding: "4px 10px",
            borderRadius: "10px",
            fontSize: "11px",
            whiteSpace: "nowrap",
            maxWidth: "260px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {info.message}
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================================================
// Event handler — преобразует live event → mascot state update
// ============================================================================

function handleEvent(
  e: LiveEvent,
  setters: {
    setBuzz: React.Dispatch<React.SetStateAction<MascotInfo>>;
    setAegis: React.Dispatch<React.SetStateAction<MascotInfo>>;
  }
) {
  const { setBuzz, setAegis } = setters;
  const isAegis = e.agent === "risk" || e.mascot === "Aegis";

  switch (e.event_type) {
    case "session.start":
      setBuzz({ state: "center", x: 0, y: 0, message: "Buzz is gearing up...", campaignId: null });
      setAegis(IDLE_AEGIS);
      break;

    case "agent.thinking":
      if (isAegis) {
        setAegis({ state: "center", x: 0, y: 0, message: "Aegis is analyzing...", campaignId: null });
      } else {
        setBuzz({ state: "center", x: 0, y: 0, message: "Thinking...", campaignId: null });
      }
      break;

    case "agent.calling_tool": {
      const campaignId = extractCampaignId(e.input || "");
      const toolLabel = describeTool(e.tool, e.input);

      if (campaignId) {
        const pos = findCardPosition(campaignId);
        if (pos) {
          if (isAegis) {
            setAegis({
              state: "on-card",
              x: pos.x,
              y: pos.y,
              message: `🛡️ ${toolLabel}`,
              campaignId,
            });
          } else {
            setBuzz({
              state: "on-card",
              x: pos.x,
              y: pos.y,
              message: `🐝 ${toolLabel}`,
              campaignId,
            });
          }
          // Через 5 секунд — назад в idle если ничего не произошло
          scheduleDecay(setBuzz, setAegis, isAegis);
          return;
        }
      }

      // Без campaign_id — просто покажем что делаем в центре
      if (isAegis) {
        setAegis({ state: "center", x: 0, y: 0, message: toolLabel, campaignId: null });
      } else {
        setBuzz({ state: "center", x: 0, y: 0, message: toolLabel, campaignId: null });
      }
      break;
    }

    case "agent.done":
      if (isAegis) {
        setAegis({ state: "done", x: 0, y: 0, message: "✓ Aegis done", campaignId: null });
      } else {
        setBuzz({ state: "done", x: 0, y: 0, message: "✓ Buzz done", campaignId: null });
      }
      setTimeout(() => {
        if (isAegis) setAegis(IDLE_AEGIS);
        else setBuzz(IDLE_BUZZ);
      }, 1500);
      break;

    case "session.complete":
      setBuzz(IDLE_BUZZ);
      setAegis(IDLE_AEGIS);
      break;
  }
}

// ============================================================================
// Helpers
// ============================================================================

function extractCampaignId(input: string): string | null {
  const m = input.match(/"campaign_id"\s*:\s*"(\d+)"/) ||
            input.match(/"action_id"\s*:\s*"([a-f0-9-]+)"/);
  return m ? m[1] : null;
}

function findCardPosition(campaignId: string): { x: number; y: number } | null {
  if (typeof document === "undefined") return null;
  // Карточка должна иметь data-campaign-id
  const el = document.querySelector(`[data-campaign-id="${campaignId}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  // Маскот в верхнем правом углу карточки
  return {
    x: rect.right - 50,
    y: rect.top - 10,
  };
}

function describeTool(tool: string | undefined, input: string | undefined): string {
  if (!tool) return "...";
  switch (tool) {
    case "list_campaigns": return "scanning all campaigns";
    case "get_campaign_metrics": return "reading metrics";
    case "get_keyword_metrics": return "reading keywords";
    case "check_safety_cap": return "checking safety caps";
    case "propose_bid_change": return "proposing bid raise";
    case "propose_pause_campaign": return "proposing pause";
    case "submit_review": return "reviewing";
    default: return tool;
  }
}

let decayTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleDecay(
  setBuzz: React.Dispatch<React.SetStateAction<MascotInfo>>,
  setAegis: React.Dispatch<React.SetStateAction<MascotInfo>>,
  isAegis: boolean
) {
  if (decayTimer) clearTimeout(decayTimer);
  decayTimer = setTimeout(() => {
    if (isAegis) setAegis(IDLE_AEGIS);
    else setBuzz((prev) => (prev.state === "on-card" ? { ...prev, state: "idle", x: 0, y: 0, message: "" } : prev));
  }, MESSAGE_DECAY_MS);
}
