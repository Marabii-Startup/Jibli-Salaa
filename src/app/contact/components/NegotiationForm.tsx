"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";

// Define a type for the component props
type NegotiationFormProps = {
  orderId: string;
};

function NegotiationForm({ orderId }: NegotiationFormProps) {
  const [formData, setFormData] = useState({
    actualValue: "",
    actualDeliveryFee: "",
    orderId: "",
  });
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      orderId,
    }));
  }, [orderId]);

  // Function to handle changes in the input fields
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await apiClient("/api/protected/finalizeNegotiation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push(`/buyer/buyer-pay/${orderId}`);
    } catch (error) {
      console.error("Error finalizing negotiation:", error);
      alert("Error finalizing negotiation. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-5 space-y-4 bg-white shadow-md rounded"
    >
      <label
        htmlFor="actual-value"
        className="block text-sm font-medium text-gray-700"
      >
        Product's actual value
      </label>
      <input
        type="number"
        id="actual-value"
        name="actualValue"
        value={formData.actualValue}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      <label
        htmlFor="actual-delivery-fee"
        className="block text-sm font-medium text-gray-700"
      >
        Agreed upon delivery fee
      </label>
      <input
        type="number"
        id="actual-delivery-fee"
        name="actualDeliveryFee"
        value={formData.actualDeliveryFee}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Finalize Negotiation
      </button>
    </form>
  );
}

export default NegotiationForm;
