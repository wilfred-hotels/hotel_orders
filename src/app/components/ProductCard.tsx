"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2 } from "lucide-react";
import ProductModal from './ProductModal';
import { useState } from 'react';

export default function ProductCard({
  product,
  onAdd,
  isAdding,
}: {
  product: any;
  onAdd: (id: number) => void;
  isAdding?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card-element overflow-hidden flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-md"
    >
      {/* ====== Product Image ====== */}
      <div className="relative w-full md:w-72 h-48 overflow-hidden group cursor-pointer" onClick={() => setOpen(true)}>
        <Image
          src={product.image || "/eCom.jpeg"}
          alt={product.name}
          width={400}
          height={250}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition"></div>

        {/* Floating watermark */}
        <motion.div
          className="absolute bottom-3 right-3 text-xs text-white/90 bg-black/30 px-2 py-1 rounded-full"
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          #{product.category || "Delight"}
        </motion.div>
      </div>

      {/* ====== Card Details ====== */}
  <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl text-slate-800 tracking-tight">
            {product.name}
          </h3>
          <span className="card-price text-sm px-3 py-1 rounded-full shadow-md">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm card-muted line-clamp-2">
          {product.description || "A delicious treat made fresh just for you!"}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className={`text-sm font-medium ${product.stock > 0 ? 'available' : 'unavailable'}`}>
            {product.stock > 0 ? `Available: ${product.stock} pcs` : "Sold Out"}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 6px 24px rgba(255, 159, 128, 0.28)",
            }}
            onClick={() => onAdd(product.id)}
            disabled={product.stock <= 0}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${product.stock > 0 ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {isAdding ? <Loader2 className="animate-spin" size={18} /> : <ShoppingBag size={18} />}
            {product.stock > 0 ? (isAdding ? "Adding..." : "Add to basket") : "Unavailable"}
          </motion.button>
        </div>
      </div>
      <ProductModal product={product} open={open} onClose={() => setOpen(false)} onAdd={onAdd} isAdding={isAdding} />
    </motion.div>
  );
}
