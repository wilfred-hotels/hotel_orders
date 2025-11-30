export function filterByCategory<T extends { category: string }>(
  items: T[],
  selectedCategory?: string
): T[] {
  // If no selection or 'all' requested, return full list
  if (!selectedCategory) return items;
  const sel = selectedCategory.toLowerCase().trim();
  if (sel === "all") return items;

  // Normalize helper: lowercase and remove trailing plural 's' to handle
  // 'dessert' vs 'desserts' mismatches in some sources.
  const normalize = (s: string) => s.toLowerCase().trim().replace(/s$/, "");
  const target = normalize(sel);

  return items.filter((item) => normalize(item.category || "") === target);
}
