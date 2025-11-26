"use client";

import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { promotions } from "@/constants/promos";
import { useCartStore } from "@/store/useCartStore";
import { cartProduct } from "@/types/cart";

export default function OffersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

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
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Special Offers
        </h2>

        <div className="relative max-w-screen-2xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              loop: true,
              align: "start",

              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3 py-3">
              {promotions.map((promo, index) => (
                <CarouselItem
                  key={promo.id}
                  className="pl-2 sm:pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard
                    key={promo.id}
                    item={promo}
                    isInCart={cartItems.some((i) => i.id === promo.id)}
                    imagePriority={index < 4}
                    onButtonClick={addToCart}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Dots Indicator for Mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-6 sm:mt-8">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
