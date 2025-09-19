// app/login/page.tsx
"use client";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intento de login:", formData);
    alert("✅ Login enviado (aún no autenticado)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          🔐 Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Correo */}
          <div>
            <label className="block text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>

          {/* Enlace a registro */}
          <p className="text-center text-gray-600 mt-2">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Regístrate aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
