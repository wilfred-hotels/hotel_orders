"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, ShoppingCart, Coffee, Settings } from 'lucide-react';
import SettingsPanel from './SettingsPanel';

export default function Sidebar() {
  const path = usePathname();
  const [openSettings, setOpenSettings] = useState(false);

  const nav = [
    { href: '/', label: 'Menu' },
    { href: '/cart', label: 'Basket' },
    { href: '/orders', label: 'Orders' },
  ];

  return (
    <aside className="w-64 border-r pr-4 hidden lg:block sticky top-20 h-[calc(100vh-4rem)]">
      <div className="py-6 space-y-6">
        <div className="px-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-tr from-blue-100 to-sky-100 rounded-full shadow-sm">
              <Menu size={18} />
            </div>
            <div className="font-bold text-lg">Menu</div>
          </div>
          <nav className="flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={`px-3 py-2 rounded-md ${path === n.href ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-2">
          <button onClick={() => setOpenSettings(true)} className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      <SettingsPanel open={openSettings} onClose={() => setOpenSettings(false)} />
    </aside>
  );
}
