"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorHomePage({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
