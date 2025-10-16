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

export default function ProgressBar({ currentStep, setCurrentStep, compact = true }: Props) {
  const pct = ((currentStep - 1) / (steps.length - 1)) * 100;

  // tamaños según modo compact
  const trackHeight = compact ? "h-[8px]" : "h-[10px]";
  const leftOffset = compact ? "left-[2.5rem]" : "left-[3.5rem]";
  const rightOffset = compact ? "right-[2rem]" : "right-[2.9rem]";
  const circleWrap = compact ? "w-10 h-10" : "w-12 h-12";
  const innerCircle = compact ? "w-6 h-6" : "w-8 h-8";
  const innerIconSize = compact ? 14 : 16;
  const translateY = compact ? "translate-y-[20px]" : "translate-y-[24px]";
  const labelClass = compact ? "mt-8 px-2 py-[1px] text-xs" : "mt-10 px-3 py-[2px] text-xs";
  const containerMax = compact ? "max-w-4xl" : "max-w-6xl";
  const containerPy = compact ? "py-2" : "py-3";

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md ${containerPy}`}>
      <div className={`relative w-full ${containerMax} mx-auto flex flex-col items-center`}>
        {/* Línea de fondo */}
        <div className={`absolute ${leftOffset} ${rightOffset} top-1/2 -translate-y-1/2 z-0`}>
          <div className="relative w-full">
            <div
              className={`absolute top-1/2 left-0 w-full ${trackHeight} rounded-full -translate-y-1/2 
              bg-gradient-to-b from-gray-300 to-gray-200 shadow-[inset_0_4px_6px_rgba(0,0,0,0.12)]`}
            />
            <motion.div
              className={`absolute top-1/2 left-0 ${trackHeight} bg-green-700 rounded-full -translate-y-1/2 z-0`}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Círculos */}
        <div className="flex items-end justify-between w-full relative z-10">
          {steps.map(({ number, label }) => {
            const isCompleted = number < currentStep;
            const isActive = number === currentStep;

            return (
              <div
                key={number}
                className="relative flex flex-col items-center justify-center cursor-default select-none"
              >
                <div className={`relative flex flex-col items-center ${translateY}`}>
                  <motion.div
                    className={`${circleWrap} rounded-full flex items-center justify-center border border-gray-300 bg-gray-200 shadow-[inset_0_6px_8px_rgba(0,0,0,0.16)]`}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div
                      className={`flex items-center justify-center ${innerCircle} rounded-full transition-all duration-250
                        ${isCompleted ? "bg-green-700 text-white" : isActive ? "bg-white border-[3px] border-green-700" : "bg-gray-400 text-white border-2 border-gray-300"}`}
                    >
                      {isCompleted ? (
                        <Check size={innerIconSize} strokeWidth={3} />
                      ) : !isActive ? (
                        <span className="text-white font-extrabold" style={{ fontSize: compact ? 16 : 20 }}>
                          {number}
                        </span>
                      ) : null}
                    </div>
                  </motion.div>

                  <div
                    className={`absolute top-full mt-1 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px]
                      ${isActive ? "border-l-transparent border-r-transparent border-b-green-700" : "border-l-transparent border-r-transparent border-b-gray-400"}`}
                  />
                </div>

                <div
                  className={`${labelClass} rounded-full font-medium shadow-sm transition-all duration-200 ${
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