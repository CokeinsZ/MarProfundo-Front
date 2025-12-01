import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(webpage)/globals.css";
import PaymentHeader from "@/components/organisms/paymentHeader";
import Footer from "@/components/organisms/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {/* Header */}
        <PaymentHeader />

        {/* Main Content */}
        <main className="mx-auto max-w-6xl p-6">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
