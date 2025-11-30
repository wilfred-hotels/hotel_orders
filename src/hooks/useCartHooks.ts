"use client";

import { addItemsToCart, deleteCartItem, getCart, updateCartItem } from "@/actions/cart";
import { CartItem } from "@/actions/types";
import { useMutation } from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";

export function useCart(userId: string, token: string) {
  return useQuery<CartItem[]>(["cartItems", userId, token], {
    queryFn: () => getCart(userId, token), 
    retry: 1,
  });
}



export function useAddItemsToCart() {
  return useMutation(
    (args: { userId: string; token: string; items: { productId: number; quantity: number }[] }) =>
      addItemsToCart(args.userId, args.token, args.items),
    {
      onSuccess: (data) => {
        // Handle successful mutation
        console.log('Items added to cart:', data);
      },
      onError: (error) => {
        // Handle error during the mutation
        console.error('Failed to add items:', error);
      },
    }
  );
}


export function useUpdateCartItem() {
  return useMutation(
    (args: { userId: string; token: string; itemId: number; quantity: number }) =>
      updateCartItem(args.userId, args.token, args.itemId, args.quantity),
    {
      onSuccess: (data) => {
        // Handle successful mutation
        console.log('Cart item updated:', data);
      },
      onError: (error) => {
        // Handle error during the mutation
        console.error('Failed to update cart item:', error);
      },
    }
  );
}



export function useDeleteCartItem() {
  return useMutation(
    (args: { userId: string; token: string; itemId: number }) =>
      deleteCartItem(args.userId, args.token, args.itemId),
    {
      onSuccess: (data) => {
        // Handle successful deletion
        console.log('Cart item deleted:', data);
      },
      onError: (error) => {
        // Handle error during the mutation
        console.error('Failed to delete cart item:', error);
      },
    }
  );
}