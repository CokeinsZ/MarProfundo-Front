"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUserFromToken } from "@/hooks/useUserFromToken";

export default function Profile() {
  const { user, loading, error} = useUserFromToken();
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
  });

  // Actualizar el estado local cuando el usuario se carga
  useEffect(() => {
    if (user) {
      setUsuario({
        nombre: `${user.name} ${user.last_name}`,
        correo: user.email, // Mantener la foto existente
      });
    }
  }, [user]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUsuario({ ...usuario });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsuario({ ...usuario});
  };

  const handleSaveChanges = async () => {
    // Aquí puedes implementar la lógica para guardar los cambios
    console.log("Guardando cambios:", usuario);
    // Llamar a la API para actualizar el perfil
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-16 flex justify-center">
        <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl p-8 flex flex-col items-center">
          <p className="text-gray-600">Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-16 flex justify-center">
        <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl p-8 flex flex-col items-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-16 flex justify-center">
        <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl p-8 flex flex-col items-center">
          <p className="text-red-600">No se pudo cargar la información del usuario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-16 flex justify-center">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">👤 Mi Perfil</h1>

        {/* Nombre y correo */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{usuario.nombre}</h2>
          <p className="text-gray-600">{usuario.correo}</p>
          {user.phone && <p className="text-gray-500 mt-1">📞 {user.phone}</p>}
          {user.address && <p className="text-gray-500 mt-1">🏠 {user.address}</p>}
        </div>

        {/* Botón guardar cambios */}
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}