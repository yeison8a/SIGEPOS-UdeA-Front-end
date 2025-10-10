"use client";

import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import InformacionGeneral from "./Information";
import Description from "./description";
import Cohorte from "./cohort";
import Enviar from "./Send";
import AnnexesOne from "./AnnexesOne";
import AnnexesTwo from "./AnnexesTwo";


// ===== Ejemplo de tus pasos =====
const steps = [
  { number: 1, label: "Información" },
  { number: 2, label: "Descripción" },
  { number: 3, label: "Cohorte" },
  { number: 4, label: "Anexos" },
  { number: 5, label: "Revisión" },
  { number: 6, label: "Enviar" },
];

export default function StepProgressLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const pct = ((currentStep - 1) / (steps.length - 1)) * 100;

  // ===== Render del contenido dinámico =====
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <InformacionGeneral />;
      case 2:
        return <Description />;
      case 3:
        return <Cohorte />;
      case 4:
        return <AnnexesOne />;
      case 5:
        return <AnnexesTwo />;
      case 6:
        return <Enviar />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white relative">
      {/* ===== PROGRESS BAR FIJO ===== */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-6">
        <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Línea de fondo */}
          <div className="absolute left-[3.5rem] right-[2.9rem] top-1/2 -translate-y-1/2 z-0">
            <div className="relative w-full">
              <div
                className="absolute top-1/2 left-0 w-full h-[18px] rounded-full -translate-y-1/2 
                bg-gradient-to-b from-gray-300 to-gray-200 shadow-[inset_0_6px_10px_rgba(0,0,0,0.15)]"
              />
              <div
                className="absolute top-1/2 left-0 h-[18px] bg-green-700 rounded-full -translate-y-1/2 transition-all duration-500 ease-in-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Círculos */}
          <div className="flex items-end justify-between w-full relative z-10">
            {steps.map(({ number, label }) => {
              const isCompleted = number < currentStep;
              const isActive = number === currentStep;
              return (
                <div key={number} className="relative flex flex-col items-center justify-center">
                  <div className="relative flex flex-col items-center translate-y-[33px]">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border border-gray-300 bg-gray-200 shadow-[inset_0_10px_10px_rgba(0,0,0,0.25)]`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-700 text-white"
                            : isActive
                            ? "bg-white border-[4px] border-green-700"
                            : "bg-gray-400 text-white border-2 border-gray-300"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={18} strokeWidth={3} />
                        ) : !isActive ? (
                          <span className="text-white font-extrabold text-[23px]">
                            {number}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={`absolute top-full mt-1 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[12px]
                      ${
                        isActive
                          ? "border-l-transparent border-r-transparent border-b-green-700"
                          : "border-l-transparent border-r-transparent border-b-gray-400"
                      }`}
                    />
                  </div>
                  <div
                    className={`mt-15 px-4 py-1 rounded-full text-sm font-medium shadow-sm transition-all duration-300 ${
                      isActive ? "bg-green-700 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CONTENIDO VARIABLE ===== */}
      <div className="flex-grow mt-[180px] mb-[100px] px-4">{renderStepContent()}</div>

      {/* ===== BOTONES FIJOS ABAJO ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* Botón ANTERIOR (oculto en primer paso) */}
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((p) => Math.max(p - 1, 1))}
              className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
            >
              <ArrowLeft size={16} />
              ANTERIOR
            </button>
          ) : (
            <div />
          )}

          {/* Botones DERECHA */}
          <div className="flex gap-4">
            {currentStep < steps.length && (
              <button
                onClick={() => alert("Guardado exitosamente")}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
              >
                <Save size={16} />
                GUARDAR
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep((p) => Math.min(p + 1, steps.length))}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
              >
                SIGUIENTE
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => alert("Formulario enviado")}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
              >
                ENVIAR
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
