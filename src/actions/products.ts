"use server";


import { API } from './config';
import type { Product } from './types';
import { parseJsonSafe, ensureArrayOrItems } from './_utils';

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API.products);
    if (!res.ok) {
      console.error('getProducts: server returned', res.status);
      return [];
    }
    const parsed = await parseJsonSafe(res);
    return ensureArrayOrItems(parsed) as Product[];
  } catch (err) {
    console.error('getProducts error', err);
    return [];
  }
}

export async function getProductsForHotel(hotelId: string): Promise<Product[]> {
  const url = API.products_for_hotel(hotelId);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('getProductsForHotel: server returned', res.status);
      return [];
    }
    const parsed = await parseJsonSafe(res);
    return ensureArrayOrItems(parsed) as Product[];
  } catch (err) {
    console.error('getProductsForHotel error', err);
    return [];
  }
}
