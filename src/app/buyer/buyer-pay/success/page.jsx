import Link from "next/link";

export default function SuccessPage() {
  return (
    <div class="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div class="max-w-md p-8 bg-white rounded-lg shadow-xl text-center">
        <div class="mb-4 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-16 h-16 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-green-700 mb-4">Success!</h1>
        <p class="text-gray-600 mb-8">
          Your operation was completed successfully.
        </p>
        <Link
          href="/"
          class="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
