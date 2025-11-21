import { menuItems } from "@/constants/menu";

// Utility to shuffle an array
export function shuffleArray<T>(arr: T[]): T[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Pick 6 featured items (mix of promos and regular)
export const featuredItems = shuffleArray(menuItems).slice(0, 6);
