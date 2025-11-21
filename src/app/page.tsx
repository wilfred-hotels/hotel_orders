"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import OffersSection from "@/components/home/OffersSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategoryFilter from "@/components/home/CategoryFilter";

export default function LandingAsFood() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Promotions */}
      <OffersSection />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Browse Categories
        </h2>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* Featured Dishes */}
      <FeaturedSection selectedCategory={selectedCategory} />
    </div>
  );
}
