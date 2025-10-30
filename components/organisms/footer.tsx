import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                {/* simple octopus mark */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-blue-700">
                  <path d="M12 2C9 2 7 4 7 7v1H6a3 3 0 00-3 3v1a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2v-1a3 3 0 00-3-3h-1V7c0-3-2-5-5-5z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800">MAR ABIERTO</h3>
                <p className="text-sm text-gray-600">Todo para tu mar y tu acuario</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-600 max-w-md">
              Tienda online de accesorios y insumos para pesca, acuarios y vida marina.
              Envíos a todo el país y atención especializada.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Navegación</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><Link className="hover:text-blue-700" href="/">Inicio</Link></li>
                <li><Link className="hover:text-blue-700" href="/categorias">Categorías</Link></li>
                <li><Link className="hover:text-blue-700" href="/productos">Productos</Link></li>
                <li><Link className="hover:text-blue-700" href="/contacto">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Categorías</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a className="hover:text-blue-700" href="/categorias/canas">Cañas</a></li>
                <li><a className="hover:text-blue-700" href="/categorias/señuelos">Señuelos</a></li>
                <li><a className="hover:text-blue-700" href="/categorias/acuarios">Acuarios</a></li>
                <li><a className="hover:text-blue-700" href="/categorias/alimento">Alimento</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Contacto</h4>
              <address className="not-italic text-sm text-gray-600 space-y-2">
                <div>📍 Calle Falsa 123, Ciudad</div>
                <div>📞 +57 300 000 0000</div>
                <div>✉️ <a className="hover:text-blue-700" href="mailto:info@marprofundo.com">info@marabierto.com</a></div>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} MarAbierto. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <a aria-label="Instagram" href="#" className="text-gray-500 hover:text-blue-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/></svg>
            </a>
            <a aria-label="Facebook" href="#" className="text-gray-500 hover:text-blue-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a aria-label="Twitter" href="#" className="text-gray-500 hover:text-blue-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}