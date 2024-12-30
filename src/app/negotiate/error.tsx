"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto p-4 mt-12 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-red-500 text-xl font-semibold mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-700 mb-6">
        We're having trouble loading this page. Please try refreshing or contact
        support if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Try Again
      </button>
    </div>
  );
}
