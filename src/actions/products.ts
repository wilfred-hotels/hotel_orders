"use server";


import { API } from './config';
import type { Product } from './types';
import { parseJsonSafe, ensureArrayOrItems } from './_utils';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API.products);
  if (!res.ok) throw new Error('Failed to fetch products');
  const parsed = await parseJsonSafe(res);
  return ensureArrayOrItems(parsed) as Product[];
}

export async function getProductsForHotel(hotelId: string): Promise<Product[]> {
  const url = API.products_for_hotel(hotelId);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products for hotel');
  const parsed = await parseJsonSafe(res);
  return ensureArrayOrItems(parsed) as Product[];
}
