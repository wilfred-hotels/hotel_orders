import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { getHotel } from "../actions/actions";

export const metadata: Metadata = {
  title: "Grand Harbor Hotel",
  description: "Grand Harbor Hotel — rooms, dining and room service",
};

const HOTELS = {
  1: { name: "Grand Harbor Hotel" },
  2: { name: "Sunset Bay Resort" },
  3: { name: "Mountain View Inn" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Attempt to derive hotelId from the request URL and fetch hotel server-side.
  // This makes header/footer accurate and avoids client-only heuristics.
  let hotel = null;
  try {
    const url = process.env.NEXT_PUBLIC_REQUEST_URL || '';
    // When Next provides request info in server components, you can use headers()/cookies(),
    // but here we fall back to environment hint or no-op. We still support common case where
    // the path includes /hotel/:id and we can parse it from the runtime URL when available.
    const path = typeof url === 'string' && url ? new URL(url).pathname : undefined;
    const match = path ? path.match(/\/hotel\/(\d+)/) : null;
    const hotelId = match ? match[1] : null;
    if (hotelId) {
      hotel = await getHotel(hotelId).catch(() => null);
    }
  } catch (e) {
    // ignore — fall back to null hotel
    hotel = null;
  }
  return (
    <html lang="en" className="theme-light">
      <body className={`antialiased bg-[linear-gradient(180deg,#fff7ed,#fff)]`}>
        {/* Inline script to set theme class before React hydrates to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.remove('theme-light','theme-dark');document.documentElement.classList.add(t==='dark'?'theme-dark':'theme-light')}catch(e){}})()`}} />
        <div className="min-h-screen flex flex-col">
          <Header hotel={hotel || undefined} />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            {children}
          </main>
          {/* react-hot-toast Toaster placed top-center */}
          <Toaster position="top-center" containerStyle={{ top: 16 }} />
          <footer className="text-sm text-center py-6 text-slate-600">
            © {new Date().getFullYear()} {hotel?.name}
          </footer>
        </div>
      </body>
    </html>
  );
}
