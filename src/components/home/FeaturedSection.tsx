import React from "react";
import { ProductCard } from "../ProductCard";
import { filterByCategory } from "../../../utils/filterItems";
import { featuredItems } from "../../../utils/shuffleArray";

interface FeaturedSectionProps {
  selectedCategory: string;
}

export default function FeaturedSection({
  selectedCategory,
}: FeaturedSectionProps) {
  // Filter featured items by selected category
  const filteredItems = filterByCategory(featuredItems, selectedCategory);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Featured Dishes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.slice(0, 8).map((item, index) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              isPromo={item.isPromo}
              discount={item.discount} // number for % off
              price={item.price}
              rating={item.rating}
              onButtonClick={() => console.log("Add to cart")}
              imagePriority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
