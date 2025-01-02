import Link from "next/link";
export default function ErrorPage() {
  return (
    <div class="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div class="max-w-md p-8 bg-white rounded-lg shadow-xl text-center">
        <div class="mb-4 text-red-500">
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
              d="M13 16h-1v-4h1m0-4h-1m4.618 3.382l1.089-1.089M6.343 6.343L7.432 7.432M21 12h-2M5 12H3m15.536 4.464l1.089 1.089M6.343 17.657l1.089-1.089M12 21v-2M12 5V3m6 6l2 2m-2-2l-2 2m-2-2l-2 2m2-2l2 2"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-red-700 mb-4">
          Oops, Something Went Wrong!
        </h1>
        <p class="text-gray-600 mb-8">
          We encountered an unexpected issue. Please try again later.
        </p>
        <Link
          href="/"
          class="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600"
        >
          Go To Home Page
        </Link>
      </div>
    </div>
  );
}
