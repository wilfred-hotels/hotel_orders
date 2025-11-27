"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  variant?: "cart" | "checkout";
  onQuantityChange?: (id: number, newQty: number) => void; // for cart
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  variant = "cart",

  onQuantityChange,
}) => {
  const router = useRouter();

  // Totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const tax = 0;
  const total = subtotal + deliveryFee + tax;

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-4 py-2 overflow-x-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start text-sm"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600 text-xs mt-1">
                x{item.quantity}
              </span>

              {variant === "cart" && onQuantityChange && (
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      onQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <span className="whitespace-nowrap text-sm">
              {variant === "checkout"
                ? `$${item.price.toFixed(2)} x ${item.quantity} = $${(
                    item.price * item.quantity
                  ).toFixed(2)}`
                : `$${(item.price * item.quantity).toFixed(2)}`}
            </span>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal?.toFixed(2)}</span>
          </div>
          {variant === "checkout" && (
            <>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Total</span>
                <span>${total?.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>

      {variant === "cart" && (
        <CardFooter className="px-4 py-3">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition text-sm"
            onClick={() => {
              router.push("/checkout");
            }}
          >
            Place Order
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
