"use client";

import React from "react";
import { Plus, Info, ChevronDown, Save, ArrowRight, ArrowLeft, GripVertical } from "lucide-react";

export default function Cohorte() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8">
      {/* Título */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Estudiante instructor</h2>
        <div className="mt-2 h-[1px] w-full bg-gray-200" />
      </div>

      {/* Botón agregar descripción */}
      <div className="mb-8 flex items-center">
        <button className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition">
          AGREGAR DESCRIPCIÓN
          <Plus size={16} className="text-white" />
          <Info size={16} className="text-white" />
        </button>
      </div>

      {/* Lista de descripciones */}
      <div className="flex flex-col gap-4 mb-10">
        {/* Card 1 */}
        <div className="w-full border border-gray-200 rounded-lg flex items-center justify-between p-3 hover:shadow-sm transition">
          <div className="flex items-start gap-3">
            <GripVertical size={16} className="text-gray-500 mt-1" />
            <span className="text-gray-800 text-sm font-medium">
              Información sobre el Estímulo Estudiante Instructor
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-500" />
        </div>

        {/* Card 2 */}
        <div className="w-full border border-gray-200 rounded-lg flex items-center justify-between p-3 hover:shadow-sm transition">
          <div className="flex items-start gap-3">
            <GripVertical size={16} className="text-gray-500 mt-1" />
            <span className="text-gray-800 text-sm font-medium">
              Número de plazas de estudiante instructor que el programa va a ofrecer en esta cohorte
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}
