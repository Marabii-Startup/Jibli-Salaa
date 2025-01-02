import "server-only";

import AboutSection from "@/components/HomePage/AboutSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import Dashboard from "@/components/HomePage/Dashboard";
import { Suspense } from "react";
import Tetromino from "@/components/Loading/Tetromino/Tetromino";

export default function HomePage() {
  return (
    <div className="font-sans bg-gray-50 dark:bg-primary text-gray-900 dark:text-white">
      {/* Dashboard Section*/}
      <Suspense fallback={<></>}>
        <Dashboard />
      </Suspense>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}
