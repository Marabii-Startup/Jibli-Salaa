"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Connect with Travelers, Get Products Delivered
          </motion.h1>
          <motion.p
            className="text-lg mb-8 text-balance"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Jibli is a platform that connects buyers with travelers for seamless
            delivery of products, both locally and internationally.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              href="#how-it-works"
              className="inline-flex font-bold items-center bg-purple-500 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600 transition"
            >
              Learn How It Works <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
        {/* SVG Illustration */}
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img className="rounded-3xl" src={"/Hero.png"} alt={"hero Image"} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
