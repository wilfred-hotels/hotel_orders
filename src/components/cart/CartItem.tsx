"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  variant?: "drawer" | "cartPage";
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  updateQuantity,
  variant = "drawer",
}) => {
  const isDrawer = variant === "drawer";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm flex items-center gap-3 ${
        isDrawer ? "p-3" : "p-4 sm:p-6"
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${isDrawer ? "w-16 h-16" : "w-20 h-20"} shrink-0`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
          sizes={
            isDrawer ? "(max-width: 640px) 64px" : "(max-width: 1024px) 80px"
          }
        />
      </div>

      {/* Name & Price */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-gray-900 truncate ${
            isDrawer ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          {item.name}
        </h3>
        <p
          className={`text-orange-600 font-semibold ${
            isDrawer ? "text-sm" : "text-base"
          }`}
        >
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center justify-center p-0 rounded-md ${
            isDrawer ? "w-7 h-7" : "w-8 h-8"
          }`}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className={`${isDrawer ? "w-3 h-3" : "w-4 h-4"}`} />
        </Button>

        <span
          className={`${
            isDrawer ? "w-6 text-sm" : "w-8 text-base"
          } text-center`}
        >
          {item.quantity}
        </span>

        <Button
          variant="outline"
          size="sm"
          className={`flex items-center justify-center p-0 rounded-md ${
            isDrawer ? "w-7 h-7" : "w-8 h-8"
          }`}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className={`${isDrawer ? "w-3 h-3" : "w-4 h-4"}`} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center justify-center p-0 rounded-md text-red-600 hover:text-red-800 ${
            isDrawer ? "w-7 h-7" : "w-8 h-8"
          }`}
          onClick={() => updateQuantity(item.id, 0)}
        >
          <X className={`${isDrawer ? "w-4 h-4" : "w-5 h-5"}`} />
        </Button>
      </div>
    </div>
  );
};
