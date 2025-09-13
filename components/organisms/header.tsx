// components/organisms/header.tsx
"use client";
import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
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
            <span className="text-xl font-bold text-gray-800">MARPROFUNDO</span>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Categorias</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Aqualog</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Mi pecera</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">redes</a>
          </nav>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Sign In
            </button>
          </div>

          {/* Menú móvil */}
          <button className="md:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}