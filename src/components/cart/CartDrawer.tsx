"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItemCard } from "./CartItem";

// Demo cart data
const demoCart = [
  {
    id: 1,
    name: "Truffle Margherita Pizza",
    price: 18.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1601924572877-3f0f2d5db77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    name: "Gourmet Beef Burger",
    price: 16.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1601050690065-07db29a6eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export function CartDrawer({
  triggerAsChild = false,
  children,
}: {
  triggerAsChild?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [cart, setCart] = useState(demoCart);

  const updateQuantity = (id: number, qty: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: qty } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild={triggerAsChild}>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full text-orange-600"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        )}
      </DrawerTrigger>

      <DrawerContent className="bg-white w-[90vw] max-w-md sm:w-[500px] h-full flex flex-col">
        <DrawerHeader className="px-4 py-4">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-lg font-bold">Your Cart</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription className="text-sm text-gray-500 mt-1">
            Review your items and proceed to checkout.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                variant="drawer"
              />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <DrawerFooter className="flex flex-col w-full px-4 py-3 space-y-3">
            <div className="flex justify-between items-center w-full text-base font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold py-2 rounded-lg transition text-sm"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
