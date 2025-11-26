"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { categories } from "@/constants/categories";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-row overflow-x-auto py-2.5 gap-1 scrollbar-none px-1.5 md:justify-center
 "
    >
      {categories.map((category) => (
        <Button
          key={category.id}
          size="sm"
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`shrink-0 px-8 py-5 rounded-full shadow-md hover:shadow-lg text-sm sm:text-base font-medium transition-all duration-300 hover:transform hover:-translate-y-1  ${
            selectedCategory === category.id
              ? "bg-[#FF5722] text-white border-orange-600 hover:bg-orange-400"
              : "bg-white text-gray-700 border border-gray-200 hover:shadow-[#FF5722]/20 hover:text-orange-600"
          }`}
          onClick={() => {
            setSelectedCategory(category.id);
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
