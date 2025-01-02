// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white px-4 overflow-hidden">
      {/* Animated SVG Illustration */}
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="mb-8"
      >
        <svg
          className="w-40 h-40 mx-auto text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 21h22L12 2 1 21z" />
          <path d="M12 2v15" />
          <path d="M8 10h8" />
          <path d="M8 14h4" />
        </svg>
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        className="text-5xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! Page Not Found
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        className="text-lg mb-6 text-center max-w-md text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
      >
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          <FaHome className="mr-2 text-gray-800" />
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
