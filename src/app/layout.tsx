import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "hotel e-comm",
  description:
    "Client-side interface for hotel food ordering and refreshments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-light">
      <body className="antialiased">
        <Toaster richColors position="top-right" />

        {/* Header */}
        <Header />

        {/* Main content */}
        <main className=" bg-gray-50">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
