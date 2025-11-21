export function filterByCategory<T extends { category: string }>(
  items: T[],
  selectedCategory: string
): T[] {
  if (selectedCategory === "all") return items;
  return items.filter((item) => item.category === selectedCategory);
}
