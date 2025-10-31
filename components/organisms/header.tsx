"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
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

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Home</Link>
            <Link href="/pCategories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Categorias</Link>
            <Link href="/aqualog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Aqualog</Link>
            <Link href="/fishbowl" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">Pecera</Link>
            <Link href="/redes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors drop-shadow-sm">redes</Link>
          </nav>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors drop-shadow-sm">
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors drop-shadow-sm">
              <Link href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors drop-shadow-md">
              <Link href="/login" className="text-white font-bold">
                Login
              </Link> 
              </button>
          </div>

          {/* Menú móvil */}
          <button className="md:hidden text-gray-700 drop-shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}