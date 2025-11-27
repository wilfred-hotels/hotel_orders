"use client";

import SideBarFilters from "./SideBarFilters";

interface FiltersWrapperProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedPrice: string;
  setSelectedPrice: (id: string) => void;
}

export default function FiltersWrapper({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: FiltersWrapperProps) {
  // Just render filters UI, no drawer logic here
  return (
    <SideBarFilters
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
    />
  );
}
