// components/FileUploadField.tsx
"use client";

import { useState } from "react";
import { Download } from "lucide-react"; // 👈 Importar el ícono

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
    <div className="w-full p-4 border rounded-xl bg-gray-50">
      <label className="block text-sm font-semibold mb-2 text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <label
        className="flex items-center justify-center gap-2 w-40 h-10 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition" // 👈 agregado gap-2
      >
        {/* 👇 Ícono + texto */}
        <Download className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500 text-sm">
          {file ? file.name : "Upload Files"}
        </span>

        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          required={required}
        />
      </label>

      {required && !file && (
        <p className="text-red-500 text-xs mt-2">Required</p>
      )}
    </div>
  );
}
