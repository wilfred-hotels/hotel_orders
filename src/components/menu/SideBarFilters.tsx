import { categories } from "@/constants/categories";
import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  isMobileHorizontal?: boolean;
}

export default function SideBarFilters({
  selectedCategory,
  setSelectedCategory,
  isMobileHorizontal = false,
}: CategoryFilterProps) {
  if (isMobileHorizontal) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-sm font-semibold mb-2">Categories</h3>
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap px-3 py-2 rounded-md transition-colors text-xs sm:text-sm ${
                selectedCategory === category.id
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm sm:text-base ${
              selectedCategory === category.id
                ? "bg-orange-100 text-orange-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
