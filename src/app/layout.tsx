import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "hotel e-comm",
  description: "this is the client side for the hotels it is for booking foods in the hotels and other refreshments",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-light">
      <body className={`antialiased bg-[linear-gradient(180deg,#fff7ed,#fff)]`}>
        {/* Inline script to set theme class before React hydrates to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.remove('theme-light','theme-dark');document.documentElement.classList.add(t==='dark'?'theme-dark':'theme-light')}catch(e){}})()`}} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            {children}
          </main>
          {/* react-hot-toast Toaster placed top-center */}
          <Toaster position="top-center" containerStyle={{ top: 16 }} />
          <Footer />
        </div>
      </body>
    </html>
  );
}
