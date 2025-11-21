import { categories } from "@/constants/categoies";
import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export default function SideBarFilters({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <aside className="w-full md:w-64">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
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
    </aside>
  );
}
