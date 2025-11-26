"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { cartProduct } from "@/types/cart";

export interface ProductCardProps {
  item: cartProduct;
  isInCart: boolean;
  imagePriority?: boolean;
  onButtonClick: (item: cartProduct) => void;
}

export function ProductCard({
  item,
  isInCart,
  imagePriority,
  onButtonClick,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(!item?.image);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full aspect-square md:aspect-4/3">
        {item?.image && !imageError ? (
          <Image
            src={item?.image}
            alt={item?.name}
            fill
            className="object-cover"
            priority={imagePriority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold p-2">
            {item?.name}
          </div>
        )}

        {/* Numeric promo badge */}
        {item?.isPromo &&
          item?.discount &&
          typeof item?.discount === "number" && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-xs md:text-sm font-semibold px-2 py-1 rounded shadow">
              {item?.discount}% OFF
            </div>
          )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
        <div>
          {/* Title */}
          <div className="flex justify-between items-start mb-2">
            <h3
              className="font-bold text-gray-900 leading-tight line-clamp-1 
              text-xs sm:text-sm md:text-base"
            >
              {item?.name}
            </h3>

            {/* String-based discount badge */}
            {item?.discount && typeof item?.discount === "string" && (
              <span className="bg-orange-600 text-white text-xs sm:text-xs md:text-sm font-bold px-2 py-1 rounded shadow ml-2 shrink-0">
                {item?.discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-gray-700 line-clamp-2 mb-3 
          text-xs sm:text-sm "
          >
            {item?.description}
          </p>

          {/* Price + rating */}
          {item?.price !== undefined && (
            <div className="flex items-center justify-between mb-2">
              <div>
                <span
                  className="text-orange-600 font-bold 
                   text-xs sm:text-sm md:text-base"
                >
                  ${item?.price.toFixed(2)}
                </span>

                {item?.isPromo && typeof item?.discount === "number" && (
                  <span
                    className="ml-2 text-gray-400 line-through 
                   text-xs sm:text-sm md:text-base"
                  >
                    ${(item?.price * (1 + item?.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              {item?.rating !== undefined && (
                <div className="flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current shrink-0" />
                  <span
                    className="ml-1 text-gray-600 
                    text-xs sm:text-sm md:text-base"
                  >
                    {item?.rating}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Button */}
        <Button
          className={`w-full font-semibold py-2 sm:py-2.5 rounded-lg transition
    text-xs sm:text-sm md:text-base ${
      isInCart
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#f0531f] hover:bg-[#d84700] cursor-pointer"
    } mt-3`}
          onClick={() => onButtonClick(item)}
          disabled={isInCart}
        >
          {isInCart
            ? "In Cart"
            : item?.isPromo
            ? "Claim Today's Offer"
            : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
