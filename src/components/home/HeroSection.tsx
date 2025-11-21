import Link from "next/link";
import React, { useState } from "react";
import AdvertMarquee from "../AdvertMarquee";
import { Search } from "lucide-react";
import SearchBar from "../SearchBar";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-fit py-24 bg-linear-to-r from-orange-600 to-orange-700 flex items-center justify-center">
        <div className="text-center text-white z-16 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Delicious meals, delivered fast
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-orange-100">
            Experience the finest cuisine at your doorstep
          </p>
          <Link href="/menu">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Order Now
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* Single-line Marquee */}
      <AdvertMarquee
        message1="✨ New arrivals have just dropped!"
        message2="💥 Limited-time deals—Shop the best picks now!"
      />

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </section>
    </>
  );
}
