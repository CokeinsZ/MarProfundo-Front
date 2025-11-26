import type { Metadata } from "next";
import "./globals.css";
import AdminSidebar from "@/components/organisms/adminSidebar";

export const metadata: Metadata = {
  title: "Admin - Mar Profundo",
  description: "Panel de administración para Mar Profundo",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
      </body>
    </html>
  );
}
