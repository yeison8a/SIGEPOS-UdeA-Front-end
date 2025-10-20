"use client";

import { useState, useEffect } from "react";
import { Plus, Info } from "lucide-react";
import FileUploadField from "./FileUploadField";

interface UploadSectionProps {
  onValidate: (isValid: boolean) => void;
}

const LOCAL_STORAGE_KEY = "uploadSectionData2";

export default function UploadSection({ onValidate }: UploadSectionProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    "Acta de aprobación del comité de ética": null,
    "Carta de aceptación del asesor": null,
    "Documento de viabilidad financiera": null,
  });

  // ✅ Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDescription(parsed.description || "");
        setFiles({
          "Acta de aprobación del comité de ética":
            parsed.files?.["Acta de aprobación del comité de ética"] || null,
          "Carta de aceptación del asesor":
            parsed.files?.["Carta de aceptación del asesor"] || null,
          "Documento de viabilidad financiera":
            parsed.files?.["Documento de viabilidad financiera"] || null,
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

      {/* Campo de descripción */}
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
        label="Acta de aprobación del comité de ética"
        required
        onFileSelect={(file) =>
          handleFileSelect("Acta de aprobación del comité de ética", file)
        }
      />

      <FileUploadField
        label="Carta de aceptación del asesor"
        required
        onFileSelect={(file) =>
          handleFileSelect("Carta de aceptación del asesor", file)
        }
      />

      <FileUploadField
        label="Documento de viabilidad financiera"
        required
        onFileSelect={(file) =>
          handleFileSelect("Documento de viabilidad financiera", file)
        }
      />
    </div>
  );
}
