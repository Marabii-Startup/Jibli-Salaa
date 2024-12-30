// app/confirm-delivery/[orderId]/ConfirmDeliveryClient.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BuyerOrderState } from "@/interfaces/Order/order";
import apiClient from "@/utils/apiClient";

interface ConfirmDeliveryClientProps {
  orderInfo: BuyerOrderState["value"];
}

export default function ConfirmDeliveryClient({
  orderInfo,
}: ConfirmDeliveryClientProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleConfirmDelivery = async () => {
    setIsConfirming(true);
    try {
      await apiClient(`/api/protected/confirmDelivery/${orderInfo._id}`, {
        method: "PUT",
      });
      // Show appreciation message
      setConfirmationMessage(
        "Thank you for using our services! You will be redirected to the homepage."
      );
      // Redirect to homepage after a delay
      setTimeout(() => {
        router.push("/");
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error("Error confirming delivery:", error);
      alert("An error occurred while confirming delivery. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  if (confirmationMessage) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Confirmation Successful</h1>
        <p className="text-lg">{confirmationMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Confirm Delivery</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{orderInfo.productName}</h2>
        <p className="text-gray-700 mb-4">{orderInfo.description}</p>
        {orderInfo.images && orderInfo.images.length > 0 && (
          <img
            src={orderInfo.images[0]}
            alt={orderInfo.productName}
            className="w-full h-64 object-cover rounded-md"
          />
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Details</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Estimated Value: ${orderInfo.estimatedValue.toFixed(2)}</li>
          <li>Actual Value: ${orderInfo.actualValue.toFixed(2)}</li>
          <li>
            Initial Delivery Fee: ${orderInfo.initialDeliveryFee.toFixed(2)}
          </li>
          <li>
            Actual Delivery Fee: ${orderInfo.actualDeliveryFee.toFixed(2)}
          </li>
          <li>Quantity: {orderInfo.quantity}</li>
          <li>Order Status: {orderInfo.orderStatus}</li>
        </ul>
      </div>
      <button
        onClick={handleConfirmDelivery}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        disabled={isConfirming}
      >
        {isConfirming ? "Confirming..." : "Confirm Delivery"}
      </button>
    </div>
  );
}
