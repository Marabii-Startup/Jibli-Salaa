"use client";

import useErrors from "@/components/Form/useErrors";
import CustomTransition from "@/components/Transition";

export default function FormErrorHandler() {
  const errorMessages = useErrors();
  return (
    <>
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
    </>
  );
}
