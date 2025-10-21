"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Info } from "lucide-react";

type FormData = {
  perfilAspirante: string;
  correoDocumentos: string;
  diasHabiles: string;
  puntajeMinimo: string;
  cupoMinimo: string;
  cupoMaximo: string;
  cuposRiesgo: string;
  plazasDisponibles: string;
};

interface DescriptionProps {
  onValidate: (isValid: boolean) => void;
}

const LOCAL_STORAGE_KEY = "formDescription";

export default function Description({ onValidate }: DescriptionProps) {
  // ✅ Cargar desde localStorage
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {
            perfilAspirante: "",
            correoDocumentos: "",
            diasHabiles: "",
            puntajeMinimo: "",
            cupoMinimo: "",
            cupoMaximo: "",
            cuposRiesgo: "",
            plazasDisponibles: "",
          };
        }
      }
    }
    return {
      perfilAspirante: "",
      correoDocumentos: "",
      diasHabiles: "",
      puntajeMinimo: "",
      cupoMinimo: "",
      cupoMaximo: "",
      cuposRiesgo: "",
      plazasDisponibles: "",
    };
  });

  const validateForm = (data: FormData) =>
    Object.values(data).every((v) => v.trim() !== "");

  useEffect(() => {
    onValidate(validateForm(formData));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    onValidate(validateForm(formData));
  }, [formData, onValidate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-0">
      {/* Encabezado */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Descripción</h2>
        <div className="mt-2 h-[1px] w-full bg-gray-200" />
      </div>

      {/* Perfil del aspirante */}
      <div className="mb-8 relative">
        <label className="relative block text-sm font-medium text-gray-700 mb-2 pr-6">
          <span className="block leading-tight">Perfil del aspirante</span>
          <Info
            size={18}
            className="absolute right-0 top-0 text-gray-400 cursor-pointer hover:text-gray-600 transition"
          />
        </label>
        <textarea
          name="perfilAspirante"
          value={formData.perfilAspirante}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
        />
        <p className="text-xs text-red-500 mt-1">Required</p>
      </div>

      {/* Campos en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {[
          {
            label: "Correo para envío de documentos",
            name: "correoDocumentos",
            type: "input",
            placeholder: "ejemplo@correo.com",
          },
          {
            label:
              "Número de días hábiles disponibles para la recepción de documentos una vez finalizado el período de inscripciones",
            name: "diasHabiles",
            type: "input",
            placeholder: "Ej: 10",
          },
          {
            label: "Puntaje mínimo requerido como punto de corte",
            name: "puntajeMinimo",
            type: "input",
            placeholder: "Ej: 350",
          },
          {
            label:
              "Cupo mínimo para la cohorte según el estudio de costos avalado por la Vicerrectoría Administrativa",
            name: "cupoMinimo",
            type: "input",
            placeholder: "Ej: 10",
          },
          {
            label: "Cupo máximo para la cohorte",
            name: "cupoMaximo",
            type: "input",
            placeholder: "Ej: 30",
          },
          {
            label:
              "Cupos que serán destinados para estudiantes de reingreso, transferencias o cambio de programa",
            name: "cuposRiesgo",
            type: "input",
            placeholder: "Ej: 30"
          },
          {
            label:
              "El programa tiene plazas disponibles de estudiante instructor y desea ofrecerlas en esta cohorte",
            name: "plazasDisponibles",
            type: "select",
            options: ["Sí", "No"],
          },
        ].map((field) => (
          <div key={field.name} className="w-full max-w-sm relative">
            <label className="relative block text-sm font-medium text-gray-700 mb-1 pr-6 leading-snug">
              <span className="block">{field.label}</span>
              <Info
                size={18}
                className="absolute right-0 top-0 text-gray-400 cursor-pointer hover:text-gray-600 transition"
              />
            </label>

            {field.type === "input" ? (
              <input
                type="text"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
              />
            ) : (
              <select
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
              >
                <option value="">Seleccione una opción...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-red-500 mt-1">Required</p>
          </div>
        ))}
      </div>
    </div>
  );
}
