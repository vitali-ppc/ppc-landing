/**
 * B6 Socket.IO client + React hook.
 *
 * Подключается к localhost:8000/socket.io, входит в room user:<id>,
 * принимает события agent.* и session.* от backend.
 */

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

const DEV_USER_ID = "dev-user-001";

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

function getSocket(userId: string): Socket {
  if (_socket && _socket.connected) return _socket;
  _socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    auth: { user_id: userId },
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

export function useB6Events(userId: string = DEV_USER_ID, maxBuffer = 100): {
  events: LiveEvent[];
  connected: boolean;
  clear: () => void;
} {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket(userId);
    socketRef.current = socket;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onConnected = () => setConnected(true);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connected", onConnected);

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
      EVENT_TYPES.forEach((t) => socket.off(t, handlers[t]));
    };
  }, [userId, maxBuffer]);

  return {
    events,
    connected,
    clear: () => setEvents([]),
  };
}
