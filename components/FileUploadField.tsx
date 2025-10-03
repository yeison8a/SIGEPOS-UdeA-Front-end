// components/FileUploadField.tsx
"use client";

import { useState } from "react";
import { Info } from "lucide-react"; // 👈 importamos el ícono de información
import { ArrowDownToLine } from "lucide-react"; // 👈 icono de descarga

interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  onFileSelect?: (file: File | null) => void;
}

export default function FileUploadField({
  label,
  required = false,
  onFileSelect,
}: FileUploadFieldProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  return (
    <div className="w-full p-4 border-[0.5px] border-gray-300 rounded-xl bg-gray-50">
      {/* Encabezado con texto a la izquierda e ícono info a la derecha */}
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Área de Upload */}
      <label
        className="flex items-center justify-center gap-2 w-44 h-12 border-[2px] border-gray-500 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition"
      >
        <ArrowDownToLine className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500 text-sm">
          {file ? file.name : "Upload File"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          required={required}
        />
      </label>

      {/* Texto de requerido */}
      {required && !file && (
        <p className="text-red-500 text-xs mt-2">Required</p>
      )}
    </div>
  );
}
