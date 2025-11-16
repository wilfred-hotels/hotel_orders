import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from './components/Sidebar';
import { SettingsProvider } from './components/SettingsContext';
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
        <SettingsProvider>
          <div className="min-h-screen flex flex-col lg:flex-row">
            <Header />
            <div className="flex-1 flex lg:items-start">
              <Sidebar />
              <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-12">
                {children}
              </main>
            </div>

            {/* react-hot-toast Toaster placed top-center */}
            <Toaster position="top-center" containerStyle={{ top: 16 }} />
            <Footer />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
