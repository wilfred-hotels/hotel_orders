import React from "react";
import { ProductCard } from "../ProductCard";
import { filterByCategory } from "../../../utils/filterItems";
import { featuredItems } from "../../../utils/shuffleArray";
import { useCartStore } from "@/store/useCartStore";
import { cartProduct } from "@/types/cart";

interface FeaturedSectionProps {
  selectedCategory: string;
}

export default function FeaturedSection({
  selectedCategory,
}: FeaturedSectionProps) {
  // Filter featured items by selected category
  const filteredItems = filterByCategory(featuredItems, selectedCategory);

  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  // Add to Cart
  const addToCart = (item: cartProduct) => {
    const exists = cartItems.some((i) => i.id === item.id);
    if (!exists) {
      addItem({
        id: item.id,
        name: item.name,
        // price: parseFloat(item.price), converts price returned as string to number
        price: item.price,
        image: item.image,
      });
    }
  };

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Items
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.slice(0, 8).map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              isInCart={cartItems.some((i) => i.id === item.id)}
              imagePriority={index < 4}
              onButtonClick={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
