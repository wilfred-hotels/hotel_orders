"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Coffee, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authCheck, authRefresh } from "../../actions/actions";

export default function Header({ hotel }: { hotel?: { name?: string; address?: string; city?: string; country?: string; phone?: string } }) {
  const path = usePathname();
  const params = useParams();
  const hotelId = params?.hotelId;
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Run hydration and auth check flow
    (async () => {
      setIsHydrated(true);
      const stored = (localStorage.getItem("theme") as "light" | "dark") || "light";
      setTheme(stored);
      document.documentElement.classList.remove("theme-light", "theme-dark");
      document.documentElement.classList.add(stored === "dark" ? "theme-dark" : "theme-light");

      // Auth flow: check access token -> refresh if needed
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      setUser(null);
          // if unauthenticated and not on allowed pages, redirect back to hotel menu or home
          const allowedPaths = [
            '/',
            hotelId ? `/hotel/${hotelId}` : null,
            hotelId ? `/hotel/${hotelId}/menu` : null,
          ].filter(Boolean) as string[];
          if (!allowedPaths.includes(path)) {
            if (hotelId) router.replace(`/hotel/${hotelId}`);
            else router.replace('/');
          }
          return;
      }

      try {
        const ok = await authCheck(accessToken);
        if (ok) {
          const username = localStorage.getItem("username");
          setUser(username ? { name: username } : null);
          return;
        }

        // access token invalid, try refresh
        if (!refreshToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          return;
        }
 
        const refreshed = await authRefresh(refreshToken);
        if (!refreshed || !refreshed.access_token) {
          // refresh failed (401 or other) -> clear tokens and redirect if needed
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          toast.error('Session expired — please sign in');
          const allowedPaths = [
            '/',
            hotelId ? `/hotel/${hotelId}` : null,
            hotelId ? `/hotel/${hotelId}/menu` : null,
          ].filter(Boolean) as string[];
          if (!allowedPaths.includes(path)) {
            if (hotelId) router.replace(`/hotel/${hotelId}`);
            else router.replace('/');
          }
          return;
        }

        // update access token and set user
        localStorage.setItem("accessToken", refreshed.access_token);
        toast.success('Session refreshed');
        const username = localStorage.getItem("username");
        setUser(username ? { name: username } : null);
      } catch (e) {
        console.error('Auth check error', e);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        toast.error('Auth validation failed — please sign in');
      }
      finally {
        setIsCheckingAuth(false);
      }
    })();
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(next === "dark" ? "theme-dark" : "theme-light");
  }

  const navLinks = hotelId
    ? [
        { href: `/hotel/${hotelId}/menu`, label: "Menu", icon: <Utensils size={18} /> },
        { href: `/hotel/${hotelId}/orders`, label: "Orders", icon: <Coffee size={18} /> },
        { href: `/hotel/${hotelId}/cart`, label: "Basket", icon: <ShoppingCart size={18} /> },
      ]
    : [];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 shadow-md border-b`} 
      style={{ background: 'var(--header-bg)', backdropFilter: 'saturate(180%) blur(6px)' }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* ===== Logo Area ===== */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-2 rounded-full shadow-md
              ${theme === "dark" 
                ? "bg-gradient-to-tr from-amber-400/30 to-pink-500/40"
                : "bg-gradient-to-tr from-amber-100 to-pink-100"}
            `}
          >
            <Utensils className="text-rose-500" size={22} />
          </motion.div>
          <div>
            <div className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {hotel ? hotel.name : "Grand Harbor Hotel"}
            </div>
            <div className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-muted"}`}>
              Dining & Room Service
            </div>
          </div>
        </Link>

        {/* ===== Nav/Auth Links ===== */}
        <nav className="hidden sm:flex items-center gap-3">
          {isHydrated && isCheckingAuth ? (
            // simple placeholder while checking auth
            <div className="h-9 w-40 bg-gray-100 animate-pulse rounded-xl" />
          ) : isHydrated && !user ? (
            <>
              <Link href="/signin" className="ml-4 px-4 py-2 rounded-xl font-medium text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition">Sign In</Link>
              <Link href="/signup" className="ml-2 px-4 py-2 rounded-xl font-medium text-sm bg-rose-50 text-rose-700 hover:bg-rose-100 transition">Sign Up</Link>
            </>
          ) : (
            <>
              {navLinks.map((link) => {
                const isActive = path.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? theme === "dark"
                          ? "bg-slate-700/70 text-amber-300 shadow-inner"
                          : "bg-gradient-to-r from-amber-100 to-rose-100 text-rose-600 shadow-md"
                        : theme === "dark"
                          ? "text-slate-200 hover:text-amber-300 hover:bg-slate-800/50"
                          : "hover:bg-amber-50 hover:text-amber-600 text-slate-700"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
              <span className="ml-4 px-4 py-2 rounded-xl font-medium text-sm bg-emerald-50 text-emerald-700">{user?.name ?? 'User'}</span>
              <button
                className="ml-2 px-4 py-2 rounded-xl font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                onClick={() => {
                      // clear all individual fields on sign out
                      localStorage.removeItem('userId');
                      localStorage.removeItem('username');
                      localStorage.removeItem('role');
                      localStorage.removeItem('hotelId');
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                      setUser(null);
                      // redirect to home or hotel menu
                      if (hotelId) router.replace(`/hotel/${hotelId}`);
                      else router.replace('/');
                }}
              >Sign Out</button>
            </>
          )}
        </nav>
      </div>

      {/* ===== Animated Gradient Line (bottom shimmer) ===== */}
      <motion.div
        className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-pink-500 to-sky-400"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
    </motion.header>
  );
}
