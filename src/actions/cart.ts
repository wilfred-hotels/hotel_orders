"use server";

import { API } from './config';
import type { CartItem } from './types';

async function parseJsonSafe(res: Response) {
  // Consume body as text first to safely handle empty or non-JSON responses
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn('Failed to parse JSON response:', err);
    return null;
  }
}

export async function getCart(userId: string, token: string): Promise<CartItem[]> {
  const url = `${API.cart}?userId=${encodeURIComponent(userId)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch cart');
  const parsed = await parseJsonSafe(res);
  return Array.isArray(parsed) ? parsed : (parsed && Array.isArray((parsed as any).items) ? (parsed as any).items : []);
}

export async function addItemsToCart(userId: string, token: string, items: { productId: number; quantity: number }[]): Promise<any> {
  const body: any = { items, userId };
  const res = await fetch(API.items, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error('Add to cart failed:', await res.text());
    throw new Error('Failed to add items to cart');
  }
  return await parseJsonSafe(res);
}

export async function updateCartItem(userId: string, token: string, itemId: number, quantity: number): Promise<any> {
  const body: any = { quantity };
  const res = await fetch(API.itemUpdate(itemId, userId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to update cart item');
  return await parseJsonSafe(res);
}

export async function deleteCartItem(userId: string, token: string, itemId: number): Promise<any> {
  const url = API.item(itemId);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    console.error('Delete cart item failed:', await res.text());
    throw new Error('Failed to delete cart item');
  }
  return await parseJsonSafe(res);
}
