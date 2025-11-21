"use client";

import React from "react";
import { DeliveryForm } from "@/components/checkout/DeliveryForm";
import { Card } from "@/components/ui/card";
import { OrderSummary, OrderItem } from "@/components/OrderSummary";
import { PaymentForm } from "@/components/checkout/PaymentForm";

export default function CheckoutPage() {
  const mockCart: OrderItem[] = [
    { id: 1, name: "Truffle Margherita Pizza", quantity: 2, price: 18.99 },
    { id: 2, name: "Gourmet Beef Burger", quantity: 1, price: 16.99 },
    { id: 3, name: "Chocolate Lava Cake", quantity: 3, price: 8.99 },
  ];

  const placeOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Delivery + Payment */}
          <div className="flex-1 space-y-6">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Delivery Information
              </h2>
              <DeliveryForm />
            </Card>

            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Payment Method
              </h2>
              <PaymentForm />
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 w-full">
            <div className="lg:sticky lg:top-8">
              <OrderSummary items={mockCart} placeOrder={placeOrder} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
