"use client";

import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import React from "react";

interface StepButtonsProps {
  currentStep: number;
  // ✅ ahora acepta número o función (setter real)
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isValid?: boolean;
}

export default function StepsButtons({
  currentStep,
  setCurrentStep,
  isValid = true,
}: StepButtonsProps) {
  return (
    <div className="w-full bg-white py-2 flex justify-between items-center px-6">
      
      {/* Botón Anterior */}
      {currentStep > 1 ? (
        <button
          onClick={() => setCurrentStep((p) => Math.max(p - 1, 1))}
          className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
        >
          <ArrowLeft size={16} />
          ANTERIOR
        </button>
      ) : (
        <div />
      )}

      {/* Botones derechos */}
      <div className="flex gap-4">
        {currentStep < 6 && (
          <button
            onClick={() => alert("Guardado exitosamente")}
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
          >
            <Save size={16} />
            GUARDAR
          </button>
        )}

        {currentStep < 6 ? (
          <button
            disabled={!isValid}
            onClick={() => setCurrentStep((p) => Math.min(p + 1, 6))}
            className={`flex items-center gap-2 text-white text-sm font-semibold px-6 py-2 rounded-lg transition 
              ${isValid ? "bg-green-800 hover:bg-green-900" : "bg-gray-400 cursor-not-allowed"}`}
          >
            SIGUIENTE
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => alert("Formulario enviado")}
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
          >
            ENVIAR
            <Send size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
