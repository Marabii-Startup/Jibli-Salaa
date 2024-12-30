// pages/negotiate/[recipientId].tsx

"use client";

import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { ChatMessage } from "@/interfaces/Chatting/Message";
import apiClient from "@/utils/apiClient";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { useRouter } from "next/navigation";
import useUsersInfo from "@/hooks/useUsersInfo";
import { ROLE } from "@/interfaces/userInfo/userRole";
import { useSearchParams } from "next/navigation";
import { BuyerOrderState } from "@/interfaces/Order/order";
import NegotiationForm from "./NegotiationForm";
import { ORDER_STATUS } from "@/interfaces/Order/ORDER_STATUS";
import Link from "next/link";
import { OrderDetails } from "./OrderDetails";

export default function NegotiatePage(): JSX.Element {
  const [formData, setFormData] = useState<{ message: string }>({
    message: "",
  });

  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "";
  const recipientId = searchParams.get("recipientId") || "";

  if (!recipientId || !orderId) {
    throw new Error("recipientId and orderId are necessary");
  }
  const router = useRouter();
  const userInfo: UserInfo | undefined = useUsersInfo("", () =>
    alert("Something went wrong, please refresh the page")
  );
  const recipientInfo: UserInfo | undefined = useUsersInfo(recipientId, () =>
    router.replace("/negotiate")
  );

  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [orderInfo, setOrderInfo] = useState<BuyerOrderState["value"]>();

  useEffect(() => {
    const fetchOrderInfo = async () => {
      if (!orderId) return;
      try {
        const response = await apiClient(`/api/getOrderById/${orderId}`);
        if (response) {
          setOrderInfo(response);
        }
      } catch (error) {
        console.error("Failed to fetch order info:", error);
      }
    };

    fetchOrderInfo();
  }, [orderId]);

  // Use refs to persist the socket and client across renders
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (userInfo && !stompClientRef.current) {
      // Initialize SockJS and Stomp client
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVERURL}/ws`);
      const stompClient = Stomp.over(socket);
      stompClientRef.current = stompClient;

      stompClient.connect(
        {},
        (frame) => {
          console.log("Connected: " + frame);
          setConnectionEstablished(true);

          // Subscribe to incoming messages
          stompClient.subscribe(
            `/user/${userInfo._id}/queue/messages`,
            (message) => {
              console.log("Message received: ", message.body);
              const receivedMessage: ChatMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            }
          );

          // Register user
          stompClient.send(
            "/app/user.addUser",
            {},
            JSON.stringify({ userId: userInfo._id })
          );
        },
        (error) => {
          console.error("Connection error:", error);
          throw new Error("Something went wrong, please try again");
        }
      );

      // Cleanup on component unmount
      return () => {
        if (stompClientRef.current && connectionEstablished) {
          stompClientRef.current.disconnect(() => {
            console.log("Disconnected");
          });
          stompClientRef.current = null;
        }
      };
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserChatHistory = async () => {
      try {
        const chatHistory: ChatMessage[] = await apiClient(
          `/api/protected/getUserChatHistory/${recipientId}`
        );
        setMessages(chatHistory);
      } catch (error) {
        console.error("Failed to fetch user chat history:", error);
        throw new Error("Something went wrong, please try again");
      }
    };

    if (recipientId) {
      fetchUserChatHistory();
    }
  }, [recipientId]);

  const sendMessage = (messageContent: string) => {
    if (connectionEstablished && stompClientRef.current) {
      const chatMessage: Partial<ChatMessage> = {
        orderId,
        recipientId: recipientId,
        senderId: userInfo?._id,
        content: messageContent,
        timestamp: new Date().toISOString(),
      };
      stompClientRef.current.send("/app/chat", {}, JSON.stringify(chatMessage));
      // Add the sent message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        chatMessage as ChatMessage,
      ]);
      // Clear input field
      setFormData({ message: "" });
    }
  };

  // Move handleAcceptOrder inside the component
  async function handleAcceptOrder(orderId: string) {
    try {
      await apiClient(`/api/protected/acceptOrder/${orderId}`, {
        method: "PUT",
      });
      // Option 1: Re-fetch the order info
      const response = await apiClient(`/api/getOrderById/${orderId}`);
      if (response) {
        setOrderInfo(response);
      }
    } catch (e) {
      console.error("Cannot accept order, something went wrong.");
    }
  }

  return (
    <>
      <div className="flex h-full flex-col p-4">
        <h2 className="text-xl font-bold mb-4">
          You are talking to: {recipientInfo?.name}
        </h2>
        <div className="flex-1 overflow-y-auto mb-4">
          {/* Chat messages */}
          {messages.map((msg, index) => {
            const isSender = msg.senderId === userInfo?._id;
            return (
              <div
                key={msg.id || index}
                className={`flex mb-2 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-xs px-4 py-2 rounded-lg ${
                    isSender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex my-10">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.message}
            onChange={(e) => setFormData({ message: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(formData.message);
              }
            }}
          />
          <button
            onClick={() => sendMessage(formData.message)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg focus:outline-none"
          >
            Send
          </button>
        </div>
        {(userInfo?.role === ROLE.TRAVELER ||
          (userInfo?.role === ROLE.TRAVELER_AND_BUYER &&
            recipientInfo?._id === orderInfo?.buyerId)) && (
          <div className="bg-gray-100 p-4 shadow rounded">
            <p className="text-lg text-center">
              You have{" "}
              {orderInfo?.orderAccepted ? "accepted" : "not yet accepted"} the
              order
            </p>
            {orderInfo?.orderStatus ===
              ORDER_STATUS[ORDER_STATUS.ORDER_FINALIZED] && (
              <div className="mt-2">
                <h2 className="text-xl font-bold text-green-600">
                  The order is finalized, please proceed to enter your banking
                  information in order to receive your money once you make the
                  delivery
                </h2>
              </div>
            )}
            {!orderInfo?.orderAccepted && (
              <div className="mt-2 bg-red-100 p-3 rounded">
                <h2 className="text-xl font-bold">
                  You must accept the order before you can proceed for the
                  delivery
                </h2>
                <button
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleAcceptOrder(orderId)}
                >
                  Accept Order
                </button>
              </div>
            )}
          </div>
        )}

        {(userInfo?.role === ROLE.BUYER ||
          (userInfo?.role === ROLE.TRAVELER_AND_BUYER &&
            userInfo?._id === orderInfo?.buyerId)) && (
          <div className="bg-gray-100 p-4 shadow rounded">
            <h2 className="text-xl text-center font-bold">
              Please discuss details about the product with the other party
            </h2>
            {orderInfo?.orderAccepted ? (
              orderInfo?.orderStatus ===
              ORDER_STATUS[ORDER_STATUS.ORDER_FINALIZED] ? (
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-green-600">
                    The order is finalized, please proceed to the payment
                  </h2>
                  <Link
                    href={`/buyer/buyer-pay/${orderId}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Pay for the item
                  </Link>
                </div>
              ) : (
                orderInfo?.orderStatus ===
                  ORDER_STATUS[ORDER_STATUS.ORDER_ACCEPTED] && (
                  <div className="mt-2">
                    <h2 className="text-xl font-bold">
                      You must finalize the order before proceeding with the
                      purchase
                    </h2>
                    <p>
                      Agree with the traveler on the product's cost and the
                      delivery fee before attempting to finalize the order
                    </p>
                    <NegotiationForm orderId={orderId} />
                  </div>
                )
              )
            ) : (
              <h2 className="text-red-600 text-xl font-bold">
                The traveler must first accept the order
              </h2>
            )}
          </div>
        )}
      </div>
      {orderInfo && <OrderDetails orderInfo={orderInfo} />}
    </>
  );
}
