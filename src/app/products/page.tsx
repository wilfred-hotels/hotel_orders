"use client"

import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getProducts, createGuest } from "../../actions/actions";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Ensure we have a guestId for anonymous cart ownership
    (async () => {
      try {
        const existing = localStorage.getItem('guestId');
        if (!existing) {
          const guestId = await createGuest();
          localStorage.setItem('guestId', guestId);
          console.log('Created guestId', guestId);
        }
      } catch (e) {
        console.error('Could not create guest id', e);
      }
    })();

    getProducts()
      .then((prods) => {
        setProducts(prods);
        try { localStorage.setItem('products', JSON.stringify(prods)); } catch (e) { /* ignore */ }
      })
      .catch(console.error);
    console.log('ProductsPage loaded', products)
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

      <div className="space-y-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
      </div>
    </div>
  );
}
