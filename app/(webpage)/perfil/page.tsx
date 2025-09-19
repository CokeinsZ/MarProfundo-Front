// app/perfil/page.tsx
"use client";
import { useState } from "react";

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    correo: "juan@example.com",
    descripcion: "Amante de la pesca y los acuarios 🐟",
    foto: "", // URL de la foto
  });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUsuario({ ...usuario, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsuario({ ...usuario, descripcion: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-16 flex justify-center">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">👤 Mi Perfil</h1>

        {/* Foto de perfil */}
        <div className="mb-6">
          {usuario.foto ? (
            <img
              src={usuario.foto}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border-4 border-blue-400 shadow-md">
              Foto
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="mt-2"
          />
        </div>

        {/* Nombre y correo */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{usuario.nombre}</h2>
          <p className="text-gray-600">{usuario.correo}</p>
        </div>

        {/* Descripción */}
        <div className="w-full mb-6">
          <label className="block text-gray-700 mb-1">Descripción</label>
          <textarea
            value={usuario.descripcion}
            onChange={handleDescripcionChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            rows={3}
          />
        </div>

        {/* Botón guardar cambios */}
        <button
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
