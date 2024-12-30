// Notification.ts

export interface Notification {
  content: string;
  timestamp: Date;
  userId: string;
  id: string;
  isRead: boolean;
  senderId?: string;
}
