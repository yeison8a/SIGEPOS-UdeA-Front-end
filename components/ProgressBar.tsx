"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  currentStep: number;
  setCurrentStep: (n: number) => void;
  compact?: boolean;
};

const steps = [
  { number: 1, label: "Información" },
  { number: 2, label: "Descripción" },
  { number: 3, label: "Cohorte" },
  { number: 4, label: "Anexos" },
  { number: 5, label: "Revisión" },
  { number: 6, label: "Enviar" },
];

export default function ProgressBar({ currentStep, setCurrentStep, compact = false }: Props) {
  const pct = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Línea de fondo */}
        <div className="absolute left-[3.2rem] right-[2.7rem] top-1/2 -translate-y-1/2 z-0">
          <div className="relative w-full">
            <div
              className="absolute top-1/2 left-0 w-full h-[14px] rounded-full -translate-y-1/2 
              bg-gradient-to-b from-gray-300 to-gray-200 shadow-[inset_0_5px_8px_rgba(0,0,0,0.15)]"
            />
            <motion.div
              className="absolute top-1/2 left-0 h-[14px] bg-green-700 rounded-full -translate-y-1/2 z-0"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Círculos */}
        <div className="flex items-end justify-between w-full relative z-10">
          {steps.map(({ number, label }) => {
            const isCompleted = number < currentStep;
            const isActive = number === currentStep;

            return (
              <div key={number} className="relative flex flex-col items-center justify-center cursor-default select-none">
                <div className="relative flex flex-col items-center translate-y-[28px]">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-300 bg-gray-200 shadow-[inset_0_8px_8px_rgba(0,0,0,0.25)]"
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-700 text-white"
                          : isActive
                          ? "bg-white border-[3px] border-green-700"
                          : "bg-gray-400 text-white border-2 border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={16} strokeWidth={3} />
                      ) : !isActive ? (
                        <span className="text-white font-extrabold text-[20px]">{number}</span>
                      ) : null}
                    </div>
                  </motion.div>
                  <div
                    className={`absolute top-full mt-1 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px]
                    ${
                      isActive
                        ? "border-l-transparent border-r-transparent border-b-green-700"
                        : "border-l-transparent border-r-transparent border-b-gray-400"
                    }`}
                  />
                </div>
                <div
                  className={`mt-12 px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-300 ${
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
  );
}