'use client'

import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getOrders } from '@/actions/orders'; // Import your getOrders function
import { Order } from '@/actions/types';

export function useOrders(token: string) {
  return useQuery<Order[], Error>({
    queryKey: ['orders', token], 
    queryFn: () => getOrders(token), 
    enabled: !!token, 
    staleTime: 1000 * 60 * 10,  
    retry: 1,  
    onSuccess: (data) => {
      console.log('Fetched orders:', data);
    },
    onError: (error) => {
      console.error('Error fetching orders:', error.message);
    },
  });
}



export function useCreateOrder() {
  return useMutation(
    (args: { token: string; cartId: string; userId: string }) => 
      createOrder(args.token, args.cartId, args.userId),
    {
      onSuccess: (data) => {
        // Handle successful order creation
        console.log('Order created successfully:', data);
      },
      onError: (error) => {
        // Handle error during order creation
        console.error('Failed to create order:', error);
      },
    }
  );
}