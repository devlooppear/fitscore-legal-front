import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth/useAuth";

type WSMessage = any;
type WSEventHandler = (message: WSMessage) => void;

interface UseWebSocketOptions {
  endpoint?: string;
  token?: string;
  onMessage?: WSEventHandler;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export function useWebSocket(options?: UseWebSocketOptions) {
  const { token: contextToken } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isConnecting = useRef(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WSMessage[]>([]);

  const connect = useCallback(async () => {
    if (!options?.endpoint || isConnecting.current) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    isConnecting.current = true;

    const baseUrl = process.env.NEXT_PUBLIC_WEB_SOCKET_API || "";
    const tokenToUse = options?.token ?? contextToken;
    const tokenParam = tokenToUse ? `?token=${tokenToUse}` : "";
    const wsUrl = `${baseUrl.replace(/\/$/, "")}/${options.endpoint.replace(
      /^\//,
      ""
    )}${tokenParam}`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        isConnecting.current = false;
        options?.onOpen?.();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const newMessages = Array.isArray(data.data) ? data.data : [data];

          setMessages((prev) => {
            const combined = [...prev, ...newMessages];
            return combined.filter(
              (v, i, a) => a.findIndex((m) => m.id === v.id) === i
            );
          });

          options?.onMessage?.(data);
        } catch {
          setMessages((prev) => [...prev, event.data]);
          options?.onMessage?.(event.data);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        wsRef.current = null;
        isConnecting.current = false;
        options?.onClose?.();

        if (options?.autoReconnect && !reconnectTimeout.current) {
          const interval = options.reconnectInterval ?? 30000;
          reconnectTimeout.current = setTimeout(() => {
            reconnectTimeout.current = null;
            connect();
          }, interval);
        }
      };

      ws.onerror = (err) => {
        console.error("[WS] Erro de conexão:", err);
        isConnecting.current = false;
        options?.onError?.(err);
        wsRef.current?.close();
      };
    } catch (err) {
      console.error("[WS] Falha ao conectar:", err);
      isConnecting.current = false;
    }
  }, [options, contextToken]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  }, []);

  return { isConnected, messages, sendMessage, wsRef };
}
