"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatBubble from "@/components/FloatingChatBubble";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {pathname !== "/chat" && <Navbar />}
        <main>{children}</main>
        {pathname !== "/chat" && <Footer />}
        {/* Floating Chat Bubble - aparece en todas las páginas excepto en /chat */}
        {pathname !== "/chat" && <FloatingChatBubble />}
      </body>
    </html>
  );
}
