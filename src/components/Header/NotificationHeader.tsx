// Notifications.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useWebSocket } from "@/hooks/useWebSocket";
import { setHasNewNotification } from "@/store/WebsocketSlice/WebsocketSlice";
import apiClient from "@/utils/apiClient";
import type { Notification } from "@/interfaces/Chatting/Notification";
import { FaBell } from "react-icons/fa";
import Link from "next/link";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const hasNewNotification = useAppSelector(
    (state) => state.websocket.hasNewNotification
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Initialize WebSocket connection
  useWebSocket();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications when there is a new notification
  useEffect(() => {
    if (hasNewNotification) {
      fetchNotifications();
    }
  }, [hasNewNotification]);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient(
        "/api/protected/notifications",
        {},
        false,
        []
      );
      // Use a Map to filter duplicates based on notification content
      const notificationMap = new Map();

      for (const notification of response) {
        // Assuming 'content' is unique enough for duplication check; adjust as needed
        notificationMap.set(notification.content, notification);
      }

      // Convert Map values back to an array
      const uniqueNotifications = Array.from(notificationMap.values());

      setNotifications(uniqueNotifications);

      // If there are unread notifications, set hasNewNotification to true
      const hasUnread = uniqueNotifications.some(
        (notification) => !notification.isRead
      );
      dispatch(setHasNewNotification(hasUnread));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await apiClient(
        `/api/protected/notifications/markAllAsRead`,
        {
          method: "DELETE",
        },
        false
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
      dispatch(setHasNewNotification(false));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  // Handle clicking the notification icon
  const handleIconClick = () => {
    setShowDropdown(!showDropdown);

    // If the dropdown is opened, mark notifications as read
    if (!showDropdown) {
      handleMarkAllAsRead();
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className="relative cursor-pointer text-gray-600 hover:text-black"
        onClick={handleIconClick}
      >
        <FaBell size={24} />
        {hasNewNotification && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 border-2 border-white rounded-full w-3 h-3"></span>
        )}
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 w-72 max-h-96 overflow-y-auto z-50 shadow-lg">
          <h3 className="m-0 p-3 bg-gray-100 border-b border-gray-300 text-gray-800">
            Notifications
          </h3>
          {notifications.length === 0 ? (
            <p className="p-3 text-gray-600">No notifications</p>
          ) : (
            <ul className="list-none m-0 p-0">
              {notifications.map((notification: Notification) =>
                notification.senderId ? (
                  <Link
                    key={notification.id}
                    href={`/contact?recipientId=${notification.senderId}`}
                  >
                    <li
                      className={`p-3 border-b border-gray-200 ${
                        notification.isRead ? "bg-white" : "bg-blue-50"
                      } hover:bg-gray-100`}
                    >
                      <div>
                        <p className="text-gray-700">{notification.content}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  </Link>
                ) : (
                  <li
                    key={notification.id}
                    className={`p-3 border-b border-gray-200 ${
                      notification.isRead ? "bg-white" : "bg-blue-50"
                    } hover:bg-gray-100`}
                  >
                    <div>
                      <p className="text-gray-700">{notification.content}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
