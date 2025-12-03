"use client";

import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import SortingDropdown from "@/components/menu/SortingDropdown";
import { useCartStore } from "@/store/useCartStore";
import FiltersWrapper from "@/components/menu/FiltersWrapper";
import MobileFiltersDrawer from "@/components/menu/MobileFiltersDrawer";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { useHandleAddToCart } from "@/hooks/useCartHandlers";
import { useGetCatalog } from "@/hooks/useCatalogHook";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: catalogs, isLoading, isError } = useGetCatalog();
  const catalogItems = catalogs ?? [];

  const cartItems = useCartStore((s) => s.items);
  const addToCart = useHandleAddToCart();

  const handleAddToCart = async (item: (typeof catalogItems)[number]) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.finalPriceCents / 100,
    };

    await addToCart(product);
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

            <div>
              {isError ? (
                <div className="text-center py-12 text-red-500">
                  Failed to load menu items. Please try again
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                      ))
                    : catalogItems.map((item, index) => (
                        <ProductCard
                          key={item.id}
                          item={item}
                          isInCart={cartItems.some(
                            (i) => i.productId === item.id
                          )}
                          imagePriority={index < 4}
                          onButtonClick={() => handleAddToCart(item)}
                        />
                      ))}
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
