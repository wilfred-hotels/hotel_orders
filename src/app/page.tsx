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
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Featured Dishes */}
      <FeaturedSection selectedCategory={selectedCategory} />
    </div>
  );
}
