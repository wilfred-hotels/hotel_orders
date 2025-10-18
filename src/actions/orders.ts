"use server";


import { API } from './config';
import type { Order, OrderItem } from './types';
import { parseJsonSafe, ensureArrayOrItems } from './_utils';

export async function getOrders(token: string): Promise<Order[]> {
  const res = await fetch(API.orders, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch orders');
  const parsed = await parseJsonSafe(res);
  return ensureArrayOrItems(parsed) as Order[];
}

// createOrder now expects cartId and userId in the body and uses Authorization header
export async function createOrder(token: string, cartId: string, userId: string): Promise<Order> {
  const res = await fetch(API.orders_place, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ cartId, userId }),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return (await parseJsonSafe(res)) as Order;
}
