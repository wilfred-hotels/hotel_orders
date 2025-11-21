"use client";

import { ProductCard } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import { filterByCategory } from "../../../utils/filterItems";
import { menuItems } from "@/constants/menu";
import SideBarFilters from "@/components/menu/SideBarFilters";

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMenu = filterByCategory(menuItems, selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <SideBarFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>

          {/* Menu Items */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMenu.map((item, index) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  isPromo={item.isPromo}
                  discount={item.discount}
                  price={item.price}
                  rating={item.rating}
                  onButtonClick={() => console.log("Add to cart")}
                  imagePriority={index < 4}
                />
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
