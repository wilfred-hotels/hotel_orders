"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemCard, CartItem } from "@/components/cart/CartItem";
import { OrderSummary, OrderItem } from "@/components/OrderSummary";

// Demo cart data
const demoCart: CartItem[] = [
  {
    id: 1,
    name: "Truffle Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1601924928360-72f0b2c7e7d3?auto=format&fit=crop&w=400&q=80",
    price: 18.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Gourmet Beef Burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    price: 16.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1613145995206-9a8d8c6dcb2d?auto=format&fit=crop&w=400&q=80",
    price: 8.99,
    quantity: 3,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(demoCart);

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const orderItems: OrderItem[] = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          <span>Your Cart</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-base sm:text-lg text-gray-600">
              Your cart is empty
            </p>
            <Button
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm"
              onClick={() => alert("Go to menu")}
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 w-full">
              <div className="lg:sticky lg:top-8">
                <OrderSummary
                  items={orderItems}
                  placeOrder={() => alert("Proceed to checkout")}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
