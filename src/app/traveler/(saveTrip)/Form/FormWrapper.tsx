"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import CustomTransition from "@/components/Transition";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { saveItinerary, State } from "../Utilis/saveItineraryAction";

interface FormWrapperProps {
  children: React.ReactNode;
}

export default function FormWrapper({ children }: FormWrapperProps) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();
  const [state, formAction, pending] = useActionState<State, FormData>(
    saveItinerary,
    null
  );

  //Get error messages
  useEffect(() => {
    if (state?.status === "failure" && state.errors) {
      const errors = Object.values(state.errors).filter(Boolean) as string[];
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
    }
  }, [state]);

  //Take the user to select-trip path after successfully saving their order details.
  useEffect(() => {
    if (!pending && state?.status === "success") {
      setTimeout(() => {
        router.replace("/traveler/select-trip");
      }, 300);
    }
  }, [pending, state]);

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* Form Fields */}
      {children}

      {/* Submit Button with Loading Spinner */}
      <div className="mt-6 flex items-center">
        <SubmitButton pending={pending} />
      </div>

      {/* Error Alert with Transition */}
      <CustomTransition show={errorMessages.length > 0}>
        <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold mb-2">
            There were some errors with your submission:
          </h2>
          <ul className="list-disc list-inside">
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </CustomTransition>

      {/* Success Message with Transition */}
      <CustomTransition show={state?.status === "success"}>
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Your itinerary has been successfully saved!
        </div>
      </CustomTransition>
    </form>
  );
}
