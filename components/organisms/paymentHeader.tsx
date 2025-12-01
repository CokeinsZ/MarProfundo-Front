"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// ...existing code...

export default function PaymentHeader() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Leer cookie accessToken en el cliente
    if (typeof document === "undefined") return;
    const cookies = document.cookie.split("; ").find((c) => c.startsWith("accessToken="));
    setHasToken(!!cookies);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Contenedor del fondo con la imagen de papel */}
      <div 
        className="absolute inset-0 -z-10 h-30"
        style={{
          backgroundImage: "url('/papel.png')",
          backgroundSize: "auto 1035%",       // Cubre todo el header
          backgroundPosition: "center 94%", // Fija el fondo al fondo del header
          backgroundRepeat: "no-repeat",
        }}
      />
      

      {/* Contenido del header */}
      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-32 h-16 mr-3 relative">
              <Image
                src="/logo.png"  
                alt="Logo MARPROFUNDO"
                width={400}      
                height={400}     
                className="object-contain -mt-2"
              />
            </div>
            <Link href="/home">
              <span className="text-xl font-bold text-gray-800 drop-shadow-sm">MAR ABIERTO</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}