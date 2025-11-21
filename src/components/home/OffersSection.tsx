"use client";

import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { promotions } from "@/constants/promos";

export default function OffersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
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
              slidesToScroll: 1,
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
                    id={promo.id}
                    title={promo.title}
                    description={promo.description}
                    image={promo.image}
                    discount={promo.discount}
                    onButtonClick={() => console.log("Claim today!")}
                    imagePriority={index < 3}
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
