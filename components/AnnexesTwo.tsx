"use client";

import { useState } from "react";
import { Plus, Info } from "lucide-react"; 
import FileUploadField from "./FileUploadField";

export default function UploadSection() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Botón superior */}
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
      >
        AGREGAR DESCRIPCIÓN
        <Plus size={18} />
        <Info size={16} className="text-white/70" />
      </button>

      {/* Campo de descripción opcional */}
      {showDescription && (
        <textarea
          placeholder="Escribe la descripción aquí..."
          className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-600"
        />
      )}

      {/* Campos de subida de archivos */}

      <FileUploadField label="Acta de aprobación del comité de ética" required />
      <FileUploadField label="Carta de aceptación del asesor"  required />
      <FileUploadField label="Documento de viabilidad financiera" required />

    </div>
  );
}

