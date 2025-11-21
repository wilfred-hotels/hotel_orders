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
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          size="sm"
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`shrink-0 px-6 py-3 rounded-full text-sm sm:text-base font-medium ${
            selectedCategory === category.id
              ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-700"
              : "bg-white text-gray-700 border-gray-300 hover:border-orange-400 hover:text-orange-600"
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
