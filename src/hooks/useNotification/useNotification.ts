import { endpoints } from "@/common/constants/endpoints";
import { useWebSocket } from "@/hooks/useWebSocket/useWebSocket";
import { NotificationItem, NotificationMetadata, NotificationResponse } from "./interface";
import { useMemo } from "react";

export function useNotification() {
  const { isConnected, messages, sendMessage } = useWebSocket({
    endpoint: endpoints.notifications.list,
    autoReconnect: true,
    reconnectInterval: 30000,
  });

  const notificationResponses: NotificationResponse[] = useMemo(() => {
    return messages.map((msg) => {
      const payload = msg?.data ?? {};
      const data: NotificationItem[] = Array.isArray(payload.data)
        ? payload.data.map((item: NotificationItem) => ({
            id: item.id,
            userId: item.userId,
            type: item.type,
            message: item.message,
            sentAt: item.sentAt,
          }))
        : [];

      const metadata: NotificationMetadata = {
        page: payload.metadata?.page ?? 1,
        size: payload.metadata?.size ?? 0,
        totalItems: payload.metadata?.totalItems ?? 0,
        totalPages: payload.metadata?.totalPages ?? 1,
        hasNextPage: payload.metadata?.hasNextPage ?? false,
        hasPreviousPage: payload.metadata?.hasPreviousPage ?? false,
      };

      return { data, metadata };
    });
  }, [messages]);

  const notifications = useMemo(() => {
    const uniqueMessages = new Map<string, NotificationItem>();

    notificationResponses.forEach((response) => {
      response.data.forEach((item) => {
        uniqueMessages.set(String(item.id), item);
      });
    });

    return Array.from(uniqueMessages.values());
  }, [notificationResponses]);

  const metadata = useMemo(() => {
    return notificationResponses.length > 0
      ? notificationResponses[notificationResponses.length - 1].metadata
      : {
          page: 1,
          size: 0,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        };
  }, [notificationResponses]);

  return { isConnected, notifications, metadata, sendMessage };
}
