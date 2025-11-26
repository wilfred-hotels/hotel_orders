"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdvertMarquee from "./AdvertMarquee";
import { CartDrawer } from "./cart/CartDrawer";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/store/useCartStore";

const pages = [
  { key: "", label: "Home" },
  { key: "menu", label: "Menu" },
  { key: "orders", label: "Orders", desktopOnly: true },
  { key: "cart", label: "Basket", mobileOnly: true },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinkButton = ({ pageKey, label }: any) => {
    const active = pathname === `/${pageKey}`;

    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={`
          px-3 py-2 rounded-md
          text-sm md:text-base
          font-medium
          ${active ? "text-orange-500 bg-orange-100" : "text-gray-700"}
          hover:bg-orange-200 hover:text-orange-600
        `}
      >
        <Link href={`/${pageKey}`} onClick={() => setMobileMenuOpen(false)}>
          {label}
        </Link>
      </Button>
    );
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row py-3">
          {/* Logo + search container */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 gap-3">
            {/* Logo + mobile toggle */}
            <div className="flex items-center justify-between w-full">
              <Link
                href="/"
                className="
                  text-xl sm:text-2xl md:text-3xl
                  font-bold text-gray-900
                "
              >
                <span className="text-[#FF5722]">Food</span>Express
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-orange-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="w-full">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>

          {/* Desktop nav + cart */}
          <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
            <div className="flex space-x-4">
              {pages
                .filter((p) => !p.mobileOnly)
                .map((p) => (
                  <NavLinkButton key={p.key} pageKey={p.key} label={p.label} />
                ))}
            </div>

            {/* Cart */}
            <CartDrawer triggerAsChild>
              <div className="relative">
                <ShoppingCart
                  className="text-gray-600 hover:text-[#f0531f] transition-colors"
                  size={24}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {totalItems}
                  </span>
                )}
              </div>
            </CartDrawer>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-200">
            <div className="flex flex-col space-y-2">
              {pages
                .filter((p) => !p.desktopOnly)
                .map((p) => (
                  <NavLinkButton key={p.key} pageKey={p.key} label={p.label} />
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

      <div className="h-[3px] w-full bg-linear-to-r from-orange-300 via-orange-500 to-orange-600 animate-gradient-x" />
    </nav>
  );
}
