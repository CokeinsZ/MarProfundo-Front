"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/register";
import { RegisterDTO, User } from "@/interfaces/user";
import { useRegister } from "@/hooks/useRegister";
import CraftyInput from "@/components/atoms/craftyInput";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
  });

  const { registerUser, user, loading, mensaje } = useRegister();

  const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
    const payload = {
      user_id: 0,
      name: data.name,
      last_name: data.last_name,
      national_id: data.national_id,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };

    registerUser(payload);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">📝 Registro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
            <CraftyInput {...register("name")} placeholder="Nombre" />
            {errors.name && <p className="text-red-600 text-sm">{String(errors.name.message)}</p>}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 mb-1">Apellido</label>
            <CraftyInput {...register("last_name")} placeholder="Apellido" />
            {errors.last_name && <p className="text-red-600 text-sm">{String(errors.last_name.message)}</p>}
          </div>

          {/* Correo */}
          <div>
            <label className="block text-gray-700 mb-1">Correo</label>
            <CraftyInput {...register("email")} placeholder="Correo" />
            {errors.email && <p className="text-red-600 text-sm">{String(errors.email.message)}</p>}
          </div>

          {/* Número */}
          <div>
            <label className="block text-gray-700 mb-1">Número</label>
            <CraftyInput {...register("phone")} placeholder="Número" />
            {errors.phone && <p className="text-red-600 text-sm">{String(errors.phone.message)}</p>}
          </div>

          {/* Identificación */}
          <div>
            <label className="block text-gray-700 mb-1">Documento</label>
            <CraftyInput {...register("national_id")} placeholder="Documento" />
            {errors.national_id && <p className="text-red-600 text-sm">{String(errors.national_id.message)}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 mb-1">Dirección</label>
            <CraftyInput {...register("address")} placeholder="Dirección" />
            {errors.address && <p className="text-red-600 text-sm">{String(errors.address.message)}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <CraftyInput {...register("password")} placeholder="Contraseña" />
            {errors.password && <p className="text-red-600 text-sm">{String(errors.password.message)}</p>}
          </div>

          {/* Mensajes */}
          {mensaje && <p className="text-red-600 text-sm">{mensaje}</p>}
          {user && <p className="text-green-600 text-sm">Usuario registrado correctamente.</p>}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>
      </div>
    </div>
  );
}