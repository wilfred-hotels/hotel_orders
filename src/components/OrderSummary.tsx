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

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  placeOrder?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  placeOrder,
}) => {
  const router = useRouter();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-full flex flex-col">
      <CardHeader className="px-4 sm:px-6 py-3">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-4 sm:px-6 py-2 overflow-x-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm sm:text-base"
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600 ml-0 sm:ml-2 mt-1 sm:mt-0">
                x{item.quantity}
              </span>
            </div>
            <span className="whitespace-nowrap">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base sm:text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 sm:px-6 py-3">
        <Button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 sm:py-3 rounded-lg transition"
          onClick={() => {
            placeOrder?.();
            router.push("/checkout");
          }}
        >
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
};
