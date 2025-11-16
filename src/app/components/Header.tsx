"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Coffee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Run hydration and force light class
    setIsHydrated(true);
    try { document.documentElement.classList.remove("theme-dark"); } catch (e) { /* ignore */ }
    try { document.documentElement.classList.add("theme-light"); } catch (e) { /* ignore */ }

    // expose header height as CSS variable so layout can avoid overlap if needed
    function updateHeaderHeight() {
      try {
        const el = headerRef?.current || document.querySelector('header');
        if (!el) return;
        const h = (el as HTMLElement).offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      } catch (e) {
        // ignore
      }
    }

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // keep cart count in header (from localStorage or server when available)
    function updateCartCountFromLocal() {
      try {
        if (typeof window === 'undefined') return;
        const raw = localStorage.getItem('cart') || '{}';
        const parsed = JSON.parse(raw || '{}');
        if (parsed && typeof parsed === 'object') {
          const sum = Object.values(parsed).reduce((s: number, v: any) => s + (Number(v) || 0), 0);
          setCartCount(sum);
          return;
        }
      } catch (e) {
        // ignore
      }
      setCartCount(0);
    }

    updateCartCountFromLocal();
    if (typeof window !== 'undefined') window.addEventListener('storage', updateCartCountFromLocal);

    // cleanup listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', updateCartCountFromLocal);
        window.removeEventListener('resize', updateHeaderHeight);
      }
    };
  }, []);

  const navLinks = [
    { href: "/orders", label: "Orders", icon: <Coffee size={18} /> },
    { href: "/cart", label: "Basket", icon: <ShoppingCart size={18} />, count: cartCount },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-50 shadow-md border-b w-full`} 
      style={{ background: 'var(--header-bg)', backdropFilter: 'saturate(180%) blur(6px)' }}
    >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* ===== Logo Area ===== */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-1 rounded-full shadow-md flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-100 to-sky-100`}
          >
            <img src="/eCom.jpeg" alt="eCom logo" className="w-9 h-9 object-cover rounded-full" />
          </motion.div>
          <div>
            <div className={`text-lg font-bold text-slate-900`}>
              Food Order
            </div>
            <div className={`text-sm text-muted`}>
              Fresh & Delicious
            </div>
          </div>
        </Link>
        {/* Right area: small indicators only (counts) */}
        <div className="hidden lg:flex items-center gap-3">
          {isHydrated && (
            <div className="flex items-center gap-2">
              <Link href="/orders" className="px-3 py-2 rounded-md hover:bg-gray-100">Orders</Link>
              <Link href="/cart" className="relative px-3 py-2 rounded-md hover:bg-gray-100">
                    Basket
                    {cartCount > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-white text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-blue)' }}>{cartCount}</span>}
                  </Link>
                </div>
          )}
        </div>
      </div>
      {/* Top marquee */}
      <div className="w-full overflow-hidden border-t border-transparent">
        <div className="py-2">
          <div className="animate-marquee text-sm text-brand-blue">Order fresh meals • Fast delivery • Secure checkout • Best prices • Order now and enjoy!</div>
        </div>
      </div>

      {/* Secondary marquee */}
      <div className="w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-center py-2 text-sm text-brand-blue">
          Welcome to Food Order — Fresh & Delicious — Order now for fast delivery —&nbsp;
        </div>
      </div>

      {/* ===== Animated Gradient Line (bottom shimmer) ===== */}
      <motion.div
        className="h-[3px] w-full"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ background: `linear-gradient(90deg, var(--brand-1), var(--brand-2))`, backgroundSize: "200% 200%" }}
      />
    </motion.header>
  );
}
