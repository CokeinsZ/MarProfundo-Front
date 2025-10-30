// ...existing code...
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CraftyInput from "@/components/atoms/craftyInput";
import { useLogin } from "@/hooks/useLogin";
import { LoginScheme } from "@/schemas/login";
import { LoginDTO } from "@/interfaces/user";

export default function Login() {
  const { loginUser, loading, mensaje } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginScheme),
  });

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    const payload: LoginDTO = {
      user_id: 0,
      name: "",
      last_name: "",
      national_id: "",
      email: data.email,
      password: data.password,
      phone: "",
      address: "",
      // status y rol opcionales
    };

    loginUser(payload);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">🔐 Iniciar sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Correo</label>
            <CraftyInput {...register("email")} placeholder="Correo" />
            {errors.email && <p className="text-red-600 text-sm">{String(errors.email?.message)}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <CraftyInput {...register("password")} placeholder="Contraseña" />
            {errors.password && <p className="text-red-600 text-sm">{String(errors.password?.message)}</p>}
          </div>

          {mensaje && <p className="text-red-600 text-sm">{mensaje}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
// ...existing code...