"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

export interface ProductCardProps {
  id: string | number;
  title?: string;
  name?: string;
  description: string;
  image?: string;
  discount?: string | number;
  isPromo?: boolean;
  price?: number;
  rating?: number;
  imagePriority?: boolean;
  onButtonClick?: () => void;
}

export function ProductCard({
  id,
  title,
  name,
  description,
  image,
  discount,
  isPromo = false,
  price,
  rating,
  imagePriority,
  onButtonClick,
}: ProductCardProps) {
  const displayTitle = title || name;
  const [imageError, setImageError] = useState(!image);

  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image / Placeholder */}
      <div className="relative w-full aspect-square md:aspect-4/3">
        {image && !imageError ? (
          <Image
            src={image}
            alt={displayTitle!}
            fill
            className="object-cover w-full h-full"
            priority={imagePriority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold p-2">
            {displayTitle}
          </div>
        )}

        {/* Promo badge */}
        {isPromo && discount && typeof discount === "number" && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
        <div>
          {/* Title & discount */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight line-clamp-1">
              {displayTitle}
            </h3>

            {discount && typeof discount === "string" && (
              <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded shadow ml-2 shrink-0">
                {discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>

          {/* Price & Rating */}
          {price !== undefined && (
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-orange-600 font-bold text-sm sm:text-base">
                  ${price.toFixed(2)}
                </span>
                {isPromo && discount && typeof discount === "number" && (
                  <span className="ml-2 text-gray-400 line-through text-xs sm:text-sm">
                    ${(price * (1 + discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              {rating !== undefined && (
                <div className="flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current shrink-0" />
                  <span className="ml-1 text-gray-600 text-xs sm:text-sm">
                    {rating}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer button - moved inside content div */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-2.5 rounded-lg transition text-xs sm:text-sm mt-3"
          onClick={onButtonClick}
        >
          {isPromo ? "Claim Today's Offer" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
}
