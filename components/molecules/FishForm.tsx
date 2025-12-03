"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { Fish } from "@/hooks/useFishAdmin";

type Props = {
  initialData?: Fish | null;
  onClose: () => void;
  onSubmit: (data: Fish) => Promise<void> | void;
  submitLabel?: string;
};

export default function FishForm({
  initialData = null,
  onClose,
  onSubmit,
  submitLabel = "Guardar",
}: Props) {
  const [form, setForm] = useState<Fish>({
    common_name: "",
    scientific_name: "",
    habitat: "",
    mean_size: 0,
    mean_weight: 0,
    diet: "",
    img: "",
  });

  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setForm({
        common_name: initialData.common_name || "",
        scientific_name: initialData.scientific_name || "",
        habitat: initialData.habitat || "",
        mean_size: Number(initialData.mean_size) || 0,
        mean_weight: Number(initialData.mean_weight) || 0,
        diet: initialData.diet || "",
        img: initialData.img || "",
      });
    }
  }, [initialData]);

  const handleChange = (k: keyof Fish, v: any) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-gray-900 text-gray-200 rounded-xl shadow-2xl w-full max-w-xl p-8 border border-gray-700 relative">
        <h3 className="text-2xl font-bold mb-6 text-blue-400 tracking-wide">
          {isEdit ? "Editar Pez" : "Crear Pez"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre común"
              value={form.common_name}
              onChange={(e) => handleChange("common_name", e.target.value)}
              required
            />
            <input
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre científico"
              value={form.scientific_name}
              onChange={(e) => handleChange("scientific_name", e.target.value)}
              required
            />
          </div>

          <input
            className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Hábitat"
            value={form.habitat}
            onChange={(e) => handleChange("habitat", e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tamaño promedio (cm)"
              type="number"
              value={String(form.mean_size)}
              onChange={(e) =>
                handleChange("mean_size", Number(e.target.value))
              }
              required
            />
            <input
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Peso promedio (kg)"
              type="number"
              value={String(form.mean_weight)}
              onChange={(e) =>
                handleChange("mean_weight", Number(e.target.value))
              }
              required
            />
          </div>

          <input
            className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dieta"
            value={form.diet}
            onChange={(e) => handleChange("diet", e.target.value)}
            required
          />

          <div className="flex gap-4 items-center">
            <input
              className="flex-1 p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL imagen"
              value={form.img}
              onChange={(e) => handleChange("img", e.target.value)}
              required
            />

            {form.img && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-700 shadow">
                <Image
                  src={form.img}
                  alt="preview"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 transition shadow-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              {saving ? "Guardando..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
