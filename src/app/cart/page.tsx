"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemCard } from "@/components/cart/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { useCartStore } from "@/store/useCartStore";
import { useGuestStore } from "@/store/useGuestStore";
import { useGetCart, useUpdateCartItem } from "@/hooks/useCartHooks";
import { useEffect } from "react";
import { CartItemCardSkeleton } from "@/components/cart/cartItemSkeleton";
import {
  useHandleRemoveCartItem,
  useHandleUpdateCartItem,
} from "@/hooks/useCartHandlers";

export default function CartPage() {
  const guestId = useGuestStore((s) => s.guestId);
  const cartItems = useCartStore((s) => s.items);
  const setCartItems = useCartStore((s) => s.setCartItems);

  // Fetch cart from backend
  const { data: cart, isLoading, isError: error } = useGetCart(guestId);

  const updateItem = useUpdateCartItem();

  const updateQuantity = useHandleUpdateCartItem();
  const removeItem = useHandleRemoveCartItem();

  // Sync backend cart to local store
  useEffect(() => {
    if (cart?.items) {
      setCartItems(cart.items);
    }
  }, [cart, setCartItems]);

  const increment = (id: string, currentQty: number) => {
    if (!guestId) return;
    updateQuantity(id, currentQty + 1);
  };

  const decrement = (id: string, currentQty: number) => {
    if (!guestId) return;
    if (currentQty > 0) {
      updateQuantity(id, currentQty - 1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  // Filter items with valid products for display
  const validCartItems = cartItems.filter((item) => item.product !== null);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 md:px-24 flex flex-col gap-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
        <span>Your Cart</span>
      </h1>

      {validCartItems.length === 0 ? (
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
        <div className="flex flex-col md:flex-row lg:items-start gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CartItemCardSkeleton key={i} variant="cartPage" />
                ))
              : validCartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    incrementQuantity={() => increment(item.id, item.quantity)}
                    decrementQuantity={() => decrement(item.id, item.quantity)}
                    removeItem={() => handleRemoveItem(item.id)}
                    variant="cartPage"
                  />
                ))}
          </div>

          {/* Order Summary */}
          <div className="md:w-1/2 w-full">
            <div className="sticky top-4 w-full">
              <OrderSummary items={validCartItems} variant="cart" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
