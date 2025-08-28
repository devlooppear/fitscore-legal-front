import { endpoints } from "@/common/constants/endpoints";
import { useQuery } from "@/hooks/useQuery/useQuery";
import {
  NotificationItem,
  NotificationMetadata,
  NotificationResponse,
} from "./interface";
import { useMemo, useEffect } from "react";

export function useNotification(page = 1, size = 20) {
  const { data, isLoading, isError, error, refetch } =
    useQuery<NotificationResponse>({
      queryKey: ["notifications", page, size],
      endpoint: endpoints.notifications.list,
      params: { page, size },
    });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  const notificationResponses: NotificationResponse[] = useMemo(() => {
    if (!data) return [];
    const payload = data?.data ?? [];
    const notifications: NotificationItem[] = Array.isArray(payload)
      ? payload.map((item: NotificationItem) => ({
          id: item.id,
          userId: item.userId,
          type: item.type,
          message: item.message,
          sentAt: item.sentAt,
        }))
      : [];

    const metadata: NotificationMetadata = data?.metadata ?? {
      page: 1,
      size: 0,
      totalItems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    return [{ data: notifications, metadata }];
  }, [data]);

  const notifications = useMemo(() => {
    const uniqueMessages = new Map<string, NotificationItem>();
    notificationResponses.forEach((response) => {
      response.data.forEach((item) =>
        uniqueMessages.set(String(item.id), item)
      );
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

  const isConnected = true;

  const sendMessage = () => {};

  return {
    isConnected,
    notifications,
    metadata,
    sendMessage,
    isLoading,
    isError,
    error,
    refetch,
  };
}
