import React from "react";
import { SlidersHorizontal } from "lucide-react";
import FiltersWrapper from "./FiltersWrapper";

interface SortingDropdownProps {
  sortBy: string;
  setSortBy: (id: string) => void;
  onOpenFilters?: () => void;
}

export default function SortingDropdown({
  sortBy,
  setSortBy,
  onOpenFilters,
}: SortingDropdownProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center justify-between w-full">
        {/* Title */}
        <h2 className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl">
          Menu Items
        </h2>

        {/* Mobile Filter Button */}
        {onOpenFilters && (
          <>
            <button
              onClick={onOpenFilters}
              className="md:hidden px-4 py-2 bg-orange-600 text-white rounded-lg flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </>
        )}
      </div>

      {/* Dropdown */}
      <div className="relative w-full md:w-1/2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent text-sm sm:text-base"
        >
          <option value="popular">Sort by: Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
        {/* Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <i className="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>
    </div>
  );
}
