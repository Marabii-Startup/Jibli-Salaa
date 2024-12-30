"use client";
import { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import { Transfers } from "@/interfaces/Payment/Transfers";
import { AccountRequirementsResponse } from "@/interfaces/Payment/AccountRequirements";
import { useForm } from "react-hook-form";

export default function ReceivePayment({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const [orderId, setOrderId] = useState<string>();
  const [transfer, setTransfer] = useState<Transfers>();
  const [accountRequirements, setAccountRequirements] =
    useState<AccountRequirementsResponse>();
  const [areRequirementsUpToDate, setAreRequirementsUpToDate] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchOrderId = async () => {
      const { orderId } = await params;
      setOrderId(orderId);
    };
    fetchOrderId();
  }, [params]);

  useEffect(() => {
    const createQuote = async () => {
      const result = await apiClient(
        `/api/protected/transfer/createQuote/${orderId}`,
        { method: "POST" }
      );
      setTransfer(result);
    };
    if (orderId) createQuote();
  }, [orderId]);

  useEffect(() => {
    const getAccountRequirements1 = async () => {
      const response: AccountRequirementsResponse = await apiClient(
        `/api/protected/transfer/getAccountRequirements1/${orderId}`
      );
      setAccountRequirements(response);
    };
    if (transfer) getAccountRequirements1();
  }, [transfer]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!areRequirementsUpToDate) {
      const accountRequirements1 = {
        details: data,
      };
      const result: AccountRequirementsResponse = await apiClient(
        `/api/protected/transfer/getAccountRequirements2/${orderId}`,
        { method: "POST", body: JSON.stringify(accountRequirements1) }
      );
      setAccountRequirements(result);
      setAreRequirementsUpToDate(true);
    } else {
      if (accountRequirements) {
        const { accountHolderName, ...details } = data;
        const createRecipientDTO = {
          type: accountRequirements[0].type,
          currency: "EUR",
          accountHolderName,
          details,
        };
        const result = await apiClient(
          `/api/protected/transfer/sendTransfer/${orderId}`,
          { method: "POST", body: JSON.stringify({ createRecipientDTO }) }
        );
      } else {
        throw new Error("something went wrong");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Enter Your Banking Information
      </h1>
      <p className="mb-6">
        Thank you for your service. Please fill out the form below with your
        banking information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {accountRequirements &&
          accountRequirements[0].fields.map((field) =>
            field.group.map((group) => {
              if (
                group.refreshRequirementsOnChange ||
                areRequirementsUpToDate
              ) {
                const validationRules = {
                  required: group.required ? "This field is required" : false,
                  minLength: group.minLength || undefined,
                  maxLength: group.maxLength || undefined,
                  pattern: group.validationRegexp
                    ? {
                        value: new RegExp(group.validationRegexp),
                        message: "Invalid format",
                      }
                    : undefined,
                };

                switch (group.type) {
                  case "select":
                    return (
                      <div key={group.key} className="mb-4">
                        <label
                          htmlFor={group.key}
                          className="block text-sm font-medium mb-1"
                        >
                          {group.name}
                        </label>
                        <select
                          id={group.key}
                          {...register(group.key, validationRules)}
                          className="border rounded p-2 w-full"
                        >
                          {group.valuesAllowed?.map((value) => (
                            <option key={value.key} value={value.key}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors[group.key] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[group.key]?.message?.toString()}
                          </p>
                        )}
                      </div>
                    );

                  case "text":
                    return (
                      <div key={group.key} className="mb-4">
                        <label
                          htmlFor={group.key}
                          className="block text-sm font-medium mb-1"
                        >
                          {group.name}
                        </label>
                        <input
                          id={group.key}
                          type="text"
                          {...register(group.key, validationRules)}
                          placeholder={
                            group.example ? `Example: ${group.example}` : ""
                          }
                          className="border rounded p-2 w-full"
                        />
                        {errors[group.key] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[group.key]?.message?.toString()}
                          </p>
                        )}
                      </div>
                    );

                  case "date":
                    return (
                      <div key={group.key} className="mb-4">
                        <label
                          htmlFor={group.key}
                          className="block text-sm font-medium mb-1"
                        >
                          {group.name}
                        </label>
                        <input
                          id={group.key}
                          type="date"
                          {...register(group.key, validationRules)}
                          className="border rounded p-2 w-full"
                        />
                        {errors[group.key] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[group.key]?.message?.toString()}
                          </p>
                        )}
                      </div>
                    );

                  case "radio":
                    return (
                      <div key={group.key} className="mb-4">
                        <p className="block text-sm font-medium mb-1">
                          {group.name}
                        </p>
                        {group.valuesAllowed?.map((value) => (
                          <label
                            key={value.key}
                            className="inline-flex items-center mr-4"
                          >
                            <input
                              type="radio"
                              value={value.key}
                              {...register(group.key, validationRules)}
                              className="form-radio"
                            />
                            <span className="ml-2">{value.name}</span>
                          </label>
                        ))}
                        {errors[group.key] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[group.key]?.message?.toString()}
                          </p>
                        )}
                      </div>
                    );

                  default:
                    return null;
                }
              }

              return null;
            })
          )}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
