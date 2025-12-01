"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchSuggestions from "./SearchSuggestions";


// ...existing code...

export default function Header() {
  const [hasToken, setHasToken] = useState(false);
  const [query, setQuery] = useState("");

  
  useEffect(() => {
  const checkAuth = () => {
    if (typeof document === "undefined") return;
    const cookies = document.cookie.split("; ").find((c) => c.startsWith("accessToken="));
    setHasToken(!!cookies);
  };

  checkAuth();
  
  window.addEventListener('storage', checkAuth);
  return () => window.removeEventListener('storage', checkAuth);
}, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Contenedor del fondo con la imagen de papel */}
      <div
        className="absolute inset-0 -z-10 h-30"
        style={{
          backgroundImage: "url('/papel.png')",
          backgroundSize: "auto 1035%", // Cubre todo el header
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
              <span className="text-xl font-bold text-gray-800 drop-shadow-sm">
                MAR ABIERTO
              </span>
            </Link>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Home</Link>
            <Link href="/pCategories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Categorias</Link>
            <Link href="/manuals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Manuales</Link>
            <Link href="/aqualog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Aqualog</Link>
            <Link href="/fishbowl" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Pecera</Link>
            <Link href="/redes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">redes</Link>
          </nav>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            {/* 🔍 Buscador con sugerencias */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar peces o productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />

              {query.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 text-white rounded-xl shadow-xl border border-gray-700 z-50 max-h-96 overflow-y-auto">
                  <SearchSuggestions query={query} />
                </div>
              )}
            </div>

            <button className="text-gray-700 hover:text-blue-600 transition-colors drop-shadow-sm">
              <Link href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </Link>
            </button>

            {/* Condicional Login / Perfil */}
            {hasToken ? (
              <Link
                href="/profile"
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors drop-shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 18.042A9 9 0 1118.042 1.958 9 9 0 01.458 18.042zm9.544-2.29a6.5 6.5 0 00-5.656-3.752 8 8 0 0111.416 0 6.5 6.5 0 00-5.76 3.752z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 font-bold">Perfil</span>
              </Link>
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors drop-shadow-md">
                <Link href="/login" className="text-white font-bold">
                  Login
                </Link>
              </button>
            )}
          </div>

          {/* Menú móvil */}
          <button className="md:hidden text-gray-700 drop-shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
// ...existing code...