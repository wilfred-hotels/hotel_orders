"use server";


import { API } from './config';
import type { Hotel } from './types';
import { parseJsonSafe, ensureArrayOrItems } from './_utils';

export async function getHotels(): Promise<Hotel[]> {
  const res = await fetch(API.hotels);
  if (!res.ok) throw new Error('Failed to fetch hotels');
  const parsed = await parseJsonSafe(res);
  return ensureArrayOrItems(parsed) as Hotel[];
}

export async function getHotel(id: string): Promise<Hotel> {
  const res = await fetch(API.hotel(id));
  if (!res.ok) throw new Error('Failed to fetch hotel');
  return (await parseJsonSafe(res)) as Hotel;
}
