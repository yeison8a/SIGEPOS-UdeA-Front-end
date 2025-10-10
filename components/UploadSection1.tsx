"use client";

import { useState } from "react";
import { Plus, Info } from "lucide-react"; 
import FileUploadField from "./FileUploadField";

export default function UploadSection() {
  const [showDescription, setShowDescription] = useState(false);

  // Estado para los archivos
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  // Maneja cuando un FileUploadField selecciona un archivo
  const handleFileSelect = (label: string, file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [label]: file,
    }));
  };

  // Enviar todos los archivos al backend
  const handleSubmit = async () => {
    const userId = "d7d5d8a1-7b29-4f6a-a04a-9f1a5e9f1234"; // reemplaza con UUID real

    const formData = new FormData();

    // Agregamos todos los archivos seleccionados
    Object.entries(files).forEach(([label, file]) => {
      if (file) {
        formData.append("archivo", file); // tu backend espera "archivo"
      }
    });

    try {
      const res = await fetch(`http://localhost:8080/user/${userId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir archivos");

      const data = await res.json();
      console.log("Subida exitosa:", data);
      alert("Archivos enviados correctamente ✅");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar los archivos ❌");
    }
  };

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
      <FileUploadField
        label="Aval del Consejo de Unidad Académica"
        required
        onFileSelect={(file) =>
          handleFileSelect("Aval del Consejo de Unidad Académica", file)
        }
      />

      <FileUploadField
        label="Aval del estudio de costos de la Vicerrectoría de Investigación"
        required
        onFileSelect={(file) =>
          handleFileSelect("Aval del estudio de costos de la Vicerrectoría de Investigación", file)
        }
      />


    </div>
  );
}
