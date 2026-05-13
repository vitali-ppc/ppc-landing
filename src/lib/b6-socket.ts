/**
 * B6 Socket.IO client + React hook.
 *
 * Подключается к localhost:8000/socket.io, входит в room user:<id>,
 * принимает события agent.* и session.* от backend.
 *
 * Sprint 6: handshake включает JWT в auth.token; user_id восстанавливается на backend.
 */

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { clearStoredAuth, getStoredToken } from "./auth";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

export type LiveEvent = {
  event_type: string;
  agent?: string;
  mascot?: string;
  ts: string;
  message?: string;
  tool?: string;
  input?: string;
  text?: string;
  // session.complete
  proposed_ids?: string[];
  reviews?: unknown[];
  // session.start
  customer_id?: string;
  agent_type?: string;
};

let _socket: Socket | null = null;
let _socketToken: string | null = null;

function getSocket(): Socket | null {
  const token = getStoredToken();
  if (!token) return null;

  if (_socket && _socketToken === token) {
    return _socket;
  }
  if (_socket) {
    try {
      _socket.disconnect();
    } catch {
      // ignore
    }
    _socket = null;
  }

  _socketToken = token;
  _socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    auth: { token },
    autoConnect: true,
  });
  return _socket;
}

const EVENT_TYPES = [
  "agent.thinking",
  "agent.calling_tool",
  "agent.done",
  "agent.error",
  "session.start",
  "session.complete",
];

export function useB6Events(maxBuffer = 100): {
  events: LiveEvent[];
  connected: boolean;
  clear: () => void;
} {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      setConnected(false);
      return;
    }
    socketRef.current = socket;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onConnected = () => setConnected(true);
    const onConnectError = (err: Error) => {
      setConnected(false);
      // Likely an invalid/expired token — drop local auth so AuthGuard kicks in.
      if (typeof window !== "undefined" && /unauthorized|auth|token/i.test(err?.message || "")) {
        clearStoredAuth();
        window.location.assign("/auth/login");
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connected", onConnected);
    socket.on("connect_error", onConnectError);

    const handler = (eventType: string) => (data: LiveEvent) => {
      setEvents((prev) => {
        const next = [...prev, { ...data, event_type: data.event_type || eventType }];
        if (next.length > maxBuffer) return next.slice(-maxBuffer);
        return next;
      });
    };

    const handlers: Record<string, (d: LiveEvent) => void> = {};
    EVENT_TYPES.forEach((t) => {
      handlers[t] = handler(t);
      socket.on(t, handlers[t]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connected", onConnected);
      socket.off("connect_error", onConnectError);
      EVENT_TYPES.forEach((t) => socket.off(t, handlers[t]));
    };
  }, [maxBuffer]);

  return {
    events,
    connected,
    clear: () => setEvents([]),
  };
}
