"use client";

import CheckoutForm from "@/components/checkout/DeliveryForm";
import { Card } from "@/components/ui/card";
import { OrderSummary } from "@/components/OrderSummary";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Delivery + Payment */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <Card className="p-3 sm:p-4">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Delivery Information
              </h2>
              <CheckoutForm />
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 w-full">
            <div className="lg:sticky lg:top-8">
              <OrderSummary items={cartItems} variant="checkout" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
