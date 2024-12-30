"use client";

import { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";

export default function PayButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchOrderId = async () => {
  //     const { orderId } = await params;
  //     console.log(orderId);
  //     setOrderId(orderId);
  //   };
  //   fetchOrderId();
  // }, [params]);

  useEffect(() => {});
  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await apiClient(
        "/api/protected/v1/stripe/create-payment",
        {
          method: "POST",
          body: JSON.stringify({
            orderId: orderId,
            successUrl: `${process.env.NEXT_PUBLIC_CLIENTURL}/buyer/buyer-pay/success`,
            cancelUrl: `${process.env.NEXT_PUBLIC_CLIENTURL}/buyer/buyer-pay/error`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === "SUCCESS") {
        router.push(response.data.sessionUrl);
      } else {
        alert(`Payment session creation failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!orderId) return <div>Loading</div>;

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      {loading ? "Processing..." : "PAY"}
    </button>
  );
}
