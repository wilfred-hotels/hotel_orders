"use client";

import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdvertMarquee from "./AdvertMarquee";
import { CartDrawer } from "./cart/CartDrawer";

const pages = [
  { key: "", label: "Home" },
  { key: "menu", label: "Menu" },
  { key: "orders", label: "Orders", desktopOnly: true }, // desktop only
  { key: "cart", label: "Basket", mobileOnly: true }, // mobile only
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinkButton = ({
    pageKey,
    label,
    className = "",
  }: {
    pageKey: string;
    label: string;
    className?: string;
  }) => {
    const active = pathname === `/${pageKey}`;
    return (
      <Button
        asChild
        size="sm"
        variant={active ? "default" : "ghost"}
        className={`
          px-3 py-2 rounded-md text-sm sm:text-base font-medium
          transition-colors
          ${className}
          ${active ? "bg-orange-100 text-orange-500" : "text-orange-600"}
          hover:bg-orange-200 hover:text-orange-400
          md:hover:bg-orange-100 md:hover:text-orange-400
          md:hover:cursor-pointer
          pointer-events-auto
          md:pointer-events-auto
        `}
      >
        <Link href={`/${pageKey}`} onClick={() => setMobileMenuOpen(false)}>
          {label}
        </Link>
      </Button>
    );
  };

  return (
    <header className="bg-orange-50 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-orange-600">
            FoodHub
          </h1>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8">
            {pages
              .filter((p) => !p.mobileOnly)
              .map((page) => (
                <NavLinkButton
                  key={page.key}
                  pageKey={page.key}
                  label={page.label}
                />
              ))}
          </div>

          {/* Shopping cart icon desktop */}
          <div className="hidden md:flex items-center">
            <CartDrawer triggerAsChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-full text-orange-500 md:hover:bg-orange-600"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </CartDrawer>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-orange-600"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-200">
            <div className="flex flex-col space-y-2">
              {pages
                .filter((p) => !p.desktopOnly)
                .map((page) => (
                  <NavLinkButton
                    key={page.key}
                    pageKey={page.key}
                    label={page.label}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Marquee */}
      <AdvertMarquee
        message1="🔥 Get 20% off all orders this week only!"
        message2="🚚 Free shipping on orders over $50"
      />

      {/* Gradient shimmer */}
      <div className="h-[3px] w-full bg-linear-to-r from-orange-300 via-orange-500 to-orange-600 animate-gradient-x bg-200" />
    </header>
  );
}
