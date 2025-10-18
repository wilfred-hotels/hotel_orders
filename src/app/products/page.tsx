"use client"

import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getProducts } from "../../actions/actions";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    console.log('ProductsPage loaded' ,products)
  }, []);

  function addToCart(id: number) {
    const raw = localStorage.getItem("cart") || "{}";
    const cart: Record<string, number> = JSON.parse(raw);
    const product = products.find((p) => p.id === id);
    const current = cart[id] || 0;
    const desired = current + 1;

    if (product && typeof product.stock === "number" && desired > product.stock) {
      toast.error(`Only ${product.stock} available in stock`);
      return;
    }

    cart[id] = desired;
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to basket");
  }

  return (
    <div>
  <h1 className="text-3xl font-bold mb-4">Menu — Food & Refreshments</h1>
  <p className="text-muted mb-6">Order from our selection of beverages, snacks and meals. We offer in-room delivery or pickup.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
