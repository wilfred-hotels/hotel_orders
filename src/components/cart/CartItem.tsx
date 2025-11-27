"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  variant?: "drawer" | "cartPage";
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  variant = "drawer",
}) => {
  const isDrawer = variant === "drawer";

  return (
    <div
      className={`
        bg-white rounded-lg shadow-xs border border-gray-300 flex
        ${isDrawer ? "p-0" : "p-0 sm:p-0"}
        overflow-hidden
      `}
    >
      {/* Left Image */}
      <div className={`${isDrawer ? "w-24" : "w-26"} relative shrink-0`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-l-lg"
        />
      </div>

      {/* Right Content */}
      <div className={`flex flex-col justify-between flex-1 p-3 sm:p-4 gap-3`}>
        {/* Name & Price */}
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base md:text-base">
            {item.name}
          </h3>
          <p className="text-orange-600 font-semibold text-sm sm:text-base md:text-base">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-1 shrink-0 self-start">
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center justify-center p-0 rounded-md ${
              isDrawer ? "w-7 h-7" : "w-8 h-8"
            }`}
            onClick={() => decrementQuantity(item.id)}
          >
            <Minus className={`${isDrawer ? "w-3 h-3" : "w-4 h-4"}`} />
          </Button>

          <span
            className={`text-center ${
              isDrawer
                ? "w-6 text-xs sm:text-sm md:text-base"
                : "w-8 text-sm sm:text-base md:text-base"
            }`}
          >
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="sm"
            className={`flex items-center justify-center p-0 rounded-md ${
              isDrawer ? "w-7 h-7" : "w-8 h-8"
            }`}
            onClick={() => incrementQuantity(item.id)}
          >
            <Plus className={`${isDrawer ? "w-3 h-3" : "w-4 h-4"}`} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center justify-center p-0 rounded-md text-red-600 hover:text-red-800 ${
              isDrawer ? "w-7 h-7" : "w-8 h-8"
            }`}
            onClick={() => removeItem(item.id)}
          >
            <X className={`${isDrawer ? "w-4 h-4" : "w-5 h-5"}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
