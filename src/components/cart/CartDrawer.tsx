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
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer({
  triggerAsChild = false,
  children,
}: {
  triggerAsChild?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  // ------------------ Totals ------------------
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
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

      <DrawerContent className="bg-white w-[90vw] max-w-md sm:w-[750px] h-full flex flex-col">
        <DrawerHeader className="px-4 py-4">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-lg font-bold">Your Cart</DrawerTitle>
          </div>
          <DrawerDescription className="text-sm text-gray-500 mt-1">
            Review your items and proceed to checkout.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                incrementQuantity={increaseQty}
                decrementQuantity={decreaseQty}
                removeItem={removeItem}
                variant="drawer"
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <DrawerFooter className="flex flex-col w-full px-4 py-3 space-y-3">
            <div className="flex justify-between items-center w-full text-base font-semibold">
              <span className="text-gray-500 ">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <DrawerClose asChild>
              <Button
                className="w-full bg-orange-500 text-white hover:bg-[#FF5722] font-semibold py-7 rounded-lg transition text-sm"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
