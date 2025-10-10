"use client";

import React, { useState, ChangeEvent } from "react";
import { Calendar, Info } from "lucide-react";

type FormData = {
  tipoSolicitud: string;
  fechaSolicitud: string;
  numeroActa: string;
  fechaConsejo: string;
  nivel: string;
  unidadAcademica: string;
  programa: string;
  codigoPrograma: string;
};

export default function InformacionGeneral() {
  const [formData, setFormData] = useState<FormData>({
    tipoSolicitud: "",
    fechaSolicitud: "",
    numeroActa: "",
    fechaConsejo: "",
    nivel: "",
    unidadAcademica: "",
    programa: "",
    codigoPrograma: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8  ">
      {/* Título y línea divisoria */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Información general
        </h2>
        <div className="mt-2 h-[1px] w-full bg-gray-200" />
      </div>

      {/* Grid con campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-45 gap-y-6 justify-items-center">
        {/* Tipo de solicitud */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Tipo de solicitud</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="tipoSolicitud"
            value={formData.tipoSolicitud}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Select an option..</option>
            <option value="nueva">Nueva</option>
            <option value="modificación">Modificación</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Fecha de la solicitud */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Fecha de la solicitud</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="date"
              name="fechaSolicitud"
              value={formData.fechaSolicitud}
              onChange={handleChange}
              className="w-full border border-green-300 bg-green-50 rounded-lg p-2.5 pr-10 text-gray-700 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
            />
            <Calendar
              size={18}
              className="absolute right-3 top-3 text-green-600 pointer-events-none"
            />
          </div>
        </div>

        {/* Número de acta */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Número de acta</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="text"
            name="numeroActa"
            value={formData.numeroActa}
            onChange={handleChange}
            placeholder="Write a long text here..."
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Fecha aprobación del consejo */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Fecha aprobación del consejo</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="date"
            name="fechaConsejo"
            value={formData.fechaConsejo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Nivel */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Nivel</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Select an option..</option>
            <option value="pregrado">Pregrado</option>
            <option value="posgrado">Posgrado</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Unidad académica */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Unidad académica</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="unidadAcademica"
            value={formData.unidadAcademica}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Select an option..</option>
            <option value="ingeniería">Facultad de Ingeniería</option>
            <option value="ciencias">Facultad de Ciencias</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Programa */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Programa</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="programa"
            value={formData.programa}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Select an option..</option>
            <option value="sistemas">Ingeniería de Sistemas</option>
            <option value="civil">Ingeniería Civil</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Código programa */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Código programa</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="text"
            name="codigoPrograma"
            value={formData.codigoPrograma}
            onChange={handleChange}
            placeholder="Required"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>
      </div>
    </div>
  );
}
