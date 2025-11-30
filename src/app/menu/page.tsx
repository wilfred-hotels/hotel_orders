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
import { useProduct } from "@/hooks/useProductsHook";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Product } from "@/actions/types";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: products, isLoading, isError } = useProduct();

  const productItem = products ?? [];

  // const filteredMenu = filterByCategory(
  //   productItem,
  //   selectedCategory
  // );

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  const addToCart = (item: Product) => {
    const exists = cartItems.some((i) => i.id === item.id);
    if (!exists) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        // image: item.image,
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
              {isError ? (
                <div className="text-center py-12 text-red-500">
                  Failed to load menu items. Please try again
                </div>
              ): (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {isLoading ? (
                     Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
                  ): (
                    productItem.map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isInCart={cartItems.some((i) => i.id === item.id)}
                  imagePriority={index < 4}
                  onButtonClick={addToCart}
                />
              ))
                  )}
                </div>
              )}
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
