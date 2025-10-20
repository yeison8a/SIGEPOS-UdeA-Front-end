"use client";

import { useState, useEffect } from "react";
import { Plus, Info } from "lucide-react";
import FileUploadField from "./FileUploadField";

interface UploadSectionProps {
  onValidate: (isValid: boolean) => void;
}

const LOCAL_STORAGE_KEY = "uploadSectionData";

export default function UploadSection({ onValidate }: UploadSectionProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    "Aval del Consejo de Unidad Académica": null,
    "Aval del estudio de costos de la Vicerrectoría de Investigación": null,
  });

  // ✅ Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDescription(parsed.description || "");
        setFiles({
          "Aval del Consejo de Unidad Académica":
            parsed.files?.["Aval del Consejo de Unidad Académica"] || null,
          "Aval del estudio de costos de la Vicerrectoría de Investigación":
            parsed.files?.[
              "Aval del estudio de costos de la Vicerrectoría de Investigación"
            ] || null,
        });
      } catch {
        console.warn("Error al leer localStorage");
      }
    }
  }, []);

  // ✅ Guardar en localStorage cada vez que cambia algo
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ files, description })
    );
  }, [files, description]);

  // ✅ Validar que todos los archivos requeridos estén completos
  useEffect(() => {
    const allFilled = Object.values(files).every((f) => f !== null);
    onValidate(allFilled);
  }, [files, onValidate]);

  // ✅ Maneja selección de archivos
  const handleFileSelect = (label: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [label]: file }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Botón para mostrar/ocultar descripción */}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          handleFileSelect(
            "Aval del estudio de costos de la Vicerrectoría de Investigación",
            file
          )
        }
      />
    </div>
  );
}
