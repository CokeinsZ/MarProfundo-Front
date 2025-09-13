// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/organisms/header";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mar abierto",
  description: "proyecto front end para la universidad autónoma de manizales",
};

export default function webpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Fondo fijo */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/fondo.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}