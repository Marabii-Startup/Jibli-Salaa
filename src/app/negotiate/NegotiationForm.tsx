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
    <form onSubmit={handleSubmit}>
      <label htmlFor="actual-value">Product's actual value</label>
      <input
        type="number"
        id="actual-value"
        name="actualValue"
        value={formData.actualValue}
        onChange={handleChange}
      />

      <label htmlFor="actual-delivery-fee">Agreed upon delivery fee</label>
      <input
        type="number"
        id="actual-delivery-fee"
        name="actualDeliveryFee"
        value={formData.actualDeliveryFee}
        onChange={handleChange}
      />

      <button type="submit">Finalize Negotiation</button>
    </form>
  );
}

export default NegotiationForm;
