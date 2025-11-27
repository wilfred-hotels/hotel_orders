"use client";

import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { filterByCategory } from "../../../utils/filterItems";
import { combinedFeaturedAndMenuItems } from "@/constants/menu";
import SortingDropdown from "@/components/menu/SortingDropdown";
import { useCartStore } from "@/store/useCartStore";
import { cartProduct } from "@/types/cart";
import FiltersWrapper from "@/components/menu/FiltersWrapper";
import MobileFiltersDrawer from "@/components/menu/MobileFiltersDrawer";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredMenu = filterByCategory(
    combinedFeaturedAndMenuItems,
    selectedCategory
  );

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  const addToCart = (item: cartProduct) => {
    const exists = cartItems.some((i) => i.id === item.id);
    if (!exists) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <FiltersWrapper
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <SortingDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              onOpenFilters={() => setDrawerOpen(true)}
            />

            {/* Desktop sidebar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredMenu.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isInCart={cartItems.some((i) => i.id === item.id)}
                  imagePriority={index < 4}
                  onButtonClick={addToCart}
                />
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* Mobile Drawer */}
      <MobileFiltersDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
    </div>
  );
}
