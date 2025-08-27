export interface NotificationItem {
  id: number;
  userId: number;
  type: string;
  message: string;
  sentAt: string;
}

export interface NotificationMetadata {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface NotificationResponse {
  data: NotificationItem[];
  metadata: NotificationMetadata;
}
