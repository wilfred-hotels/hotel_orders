"use client";

import FiltersWrapper from "./FiltersWrapper";

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedPrice: string;
  setSelectedPrice: (id: string) => void;
}

export default function MobileFiltersDrawer({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: MobileFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 md:hidden" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 w-72 h-screen bg-white shadow-xl z-50 p-6 overflow-y-auto md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button className="text-gray-600" onClick={onClose}>
            Close
          </button>
        </div>
        <FiltersWrapper
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      </div>
    </>
  );
}
