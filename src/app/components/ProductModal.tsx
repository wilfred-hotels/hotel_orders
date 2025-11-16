"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProductModal({ product, open, onClose, onAdd, isAdding }: {
  product: any;
  open: boolean;
  onClose: () => void;
  onAdd: (id: number) => void;
  isAdding?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 flex items-start justify-between border-b">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100"><X /></button>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-64 relative rounded-md overflow-hidden bg-gray-50">
            <Image src={product.image || '/food-placeholder.jpg'} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted mb-4">{product.description || 'Delicious and freshly prepared.'}</p>
            <div className="text-2xl font-bold mb-4">${product.price?.toFixed(2)}</div>
            <div className="flex gap-3">
              <button onClick={() => onAdd(product.id)} className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold">{isAdding ? 'Adding…' : 'Add to basket'}</button>
              <button onClick={onClose} className="px-4 py-2 rounded-lg border">Close</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
