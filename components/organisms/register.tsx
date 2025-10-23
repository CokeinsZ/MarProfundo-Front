"use client";
import { useState } from "react";
import CraftyInput from "../atoms/craftyInput";
export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    numero: "",
    contrasena: "",
    pais: "",
    edad: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("✅ Registro enviado (aún no guarda en base de datos)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          📝 Registro
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <CraftyInput placeholder="Nombre" />
          </div>

          {/* Apellido */}
          <div>
            <CraftyInput placeholder="Apellido" />
          </div>

          {/* Correo */}
          <div>
            <CraftyInput placeholder="Correo" />

          </div>

          {/* Número */}
          <div>
            <CraftyInput placeholder="Número" />
          </div>

          {/* Contraseña */}
          <div>
            <CraftyInput placeholder="Contraseña" />
          </div>

          {/* País */}
          <div>
            <label className="block text-gray-700 mb-1">País</label>
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Seleccione un país</option>
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
              <option value="Chile">Chile</option>
            </select>
          </div>

          {/* Edad */}
          <div>
            <label className="block text-gray-700 mb-1">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
              min="1"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
