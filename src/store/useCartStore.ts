import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { productItem } from "@/lib/schema/catalogSchema";
import { addItemToCart, updateCartItemQty } from "@/actions/cart";

// Cart item with quantity
export type CartItem = {
  id: string; // cart item ID
  productId: number; // catalog product ID
  quantity: number;
  product: {
    name: string;
    price: number;
  };
};


// Cart store type
export type CartStore = {
  userId: string;
  items: CartItem[];

  setUser: (userId: string) => void;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  increaseQty: (id: string) => Promise<void>;
  decreaseQty: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;

  totalItems: () => number;
  totalPrice: () => number;
};

// Persist config type
type CartPersist = PersistOptions<CartStore>;

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set: (state: Partial<CartStore>) => void, get: () => CartStore) => ({
      userId: "",
      items: [],

      setUser: (userId: string) => set({ userId }),

      addItem: async (item: CartItem) => {
        try {
          const { userId, items } = get();
          if (!userId) throw new Error("User not set");

          const existingItem = items.find((i) => i.id === item.id);
          const quantityToAdd = 1;

          if (existingItem) {
            const updated = await updateCartItemQty(item.id, userId, "PUT");
            set({
              items: items.map((i: CartItem) =>
                i.id === item.id ? { ...i, quantity: updated.quantity } : i
              ),
            });
          } else {
            const updatedCart = await addItemToCart(userId, item.id, quantityToAdd);
            set({
              items: updatedCart.items.map((i: CartItem) => ({
                ...i,
                quantity: i.quantity,
              })),
            });
          }
        } catch (err) {
          console.error("Failed to add item:", err);
        }
      },

      increaseQty: async (id: string) => {
        try {
          const { userId, items } = get();
          if (!userId) throw new Error("User not set");

          const updated = await updateCartItemQty(id, userId, "PUT");
          set({
            items: items.map((i: CartItem) =>
              i.id === id ? { ...i, quantity: updated.quantity } : i
            ),
          });
        } catch (err) {
          console.error("Failed to increase quantity:", err);
        }
      },

      decreaseQty: async (id: string) => {
        try {
          const { userId, items } = get();
          if (!userId) throw new Error("User not set");

          const updated = await updateCartItemQty(id, userId, "PUT");
          set({
            items:
              updated.quantity <= 0
                ? items.filter((i: CartItem) => i.id !== id)
                : items.map((i: CartItem) =>
                    i.id === id ? { ...i, quantity: updated.quantity } : i
                  ),
          });
        } catch (err) {
          console.error("Failed to decrease quantity:", err);
        }
      },

      removeItem: async (id: string) => {
        try {
          const { userId, items } = get();
          if (!userId) throw new Error("User not set");

          await updateCartItemQty(id, userId, "DELETE");
          set({
            items: items.filter((i: CartItem) => i.id !== id),
          });
        } catch (err) {
          console.error("Failed to remove item:", err);
        }
      },

      clearCart: async () => {
        try {
          const { userId } = get();
          if (!userId) throw new Error("User not set");

          await fetch(`/cart/clear?userId=${userId}`, { method: "POST" });
          set({ items: [] });
        } catch (err) {
          console.error("Failed to clear cart:", err);
        }
      },

      totalItems: () => get().items.reduce((t, i: CartItem) => t + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((t, i: CartItem) => t + i.product.price * i.quantity, 0),
    }),
    {
      name: "cart-storage",
    } as CartPersist
  )
);
