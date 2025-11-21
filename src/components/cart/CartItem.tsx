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
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  updateQuantity,
}) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-3">
      {/* Image */}
      <div className="relative w-full sm:w-20 h-20 sm:h-20 shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 80px, 96px"
        />
      </div>

      {/* Name & Price */}
      <div className="flex-1 w-full">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
          {item.name}
        </h3>
        <p className="text-orange-600 font-semibold text-sm sm:text-base">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center p-0"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <span className="w-8 text-center text-sm sm:text-base">
          {item.quantity}
        </span>

        <Button
          variant="outline"
          size="sm"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center p-0"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-800"
          onClick={() => updateQuantity(item.id, 0)}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
};
