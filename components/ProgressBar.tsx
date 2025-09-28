"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  "Información",
  "Descripción",
  "Cohorte",
  "Anexos",
  "Accesos",
  "Enviar",
];

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full flex items-center justify-center py-16 relative">
      <div className="flex items-center w-full max-w-5xl relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Línea conectora con cuerpo */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-4 -z-10 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 shadow-inner">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isCompleted ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="h-4 rounded-full origin-left bg-gradient-to-r from-green-400 to-green-600 shadow-md"
                  />
                </div>
              )}

              {/* Círculo */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted ? "#16a34a" : "#fff",
                  borderColor: isActive || isCompleted ? "#16a34a" : "#d1d5db",
                  boxShadow: isActive
                    ? "0px 0px 14px rgba(34,197,94,0.6)"
                    : "0px 3px 6px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-full border-4 flex items-center justify-center z-10"
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-white text-lg font-bold"
                  >
                    ✓
                  </motion.span>
                ) : isActive ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className="w-4 h-4 rounded-full bg-green-600"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">
                    {stepNumber}
                  </span>
                )}
              </motion.div>

              {/* Cajita con punta */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`relative mt-4 px-4 py-1.5 rounded-lg text-sm font-medium shadow-md ${
                  isCompleted || isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-8 ${
                    isCompleted || isActive
                      ? "border-b-green-600 border-l-transparent border-r-transparent"
                      : "border-b-gray-200 border-l-transparent border-r-transparent"
                  }`}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Botones de prueba */}
      <div className="absolute bottom-6 flex gap-3">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded shadow"
        >
          Atrás
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
          }
          className="px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
