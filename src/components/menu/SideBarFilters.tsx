import { categories } from "@/constants/categories";
import React from "react";

interface SideBarFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedPrice: string;
  setSelectedPrice: (id: string) => void;
}

export default function SideBarFilters({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: SideBarFiltersProps) {
  return (
    <div className="sticky top-24 bg-white md:rounded-2xl md:shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategory(category.id);
                  } else {
                    setSelectedCategory("all");
                  }
                }}
                className="mr-3 text-[#FF5722]"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Prices" },
            { value: "0-500", label: "KSh 0 - 500" },
            { value: "500-1000", label: "KSh 500 - 1,000" },
            { value: "1000-1500", label: "KSh 1,000 - 1,500" },
            { value: "1500+", label: "KSh 1,500+" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={selectedPrice === option.value}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="mr-3 text-[#FF5722]"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Tags */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Dietary</h4>
        <div className="space-y-2">
          {["Vegetarian", "Non-Veg", "Halal"].map((diet) => (
            <label key={diet} className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-3 text-[#FF5722]" />
              <span className="text-gray-700">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Delivery Time</h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "Any Time" },
            { value: "15-30", label: "15-30 min" },
            { value: "30-45", label: "30-45 min" },
            { value: "45+", label: "45+ min" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="time"
                value={option.value}
                className="mr-3 text-[#FF5722]"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-4">Rating</h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Ratings" },
            { value: "4+", label: "4+ Stars" },
            { value: "4.5+", label: "4.5+ Stars" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                value={option.value}
                className="mr-3 text-[#FF5722]"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
