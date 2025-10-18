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

  const trackHeight = "h-[5px]";
  const leftOffset = "left-[2rem]";
  const rightOffset = "right-[2rem]";
  const circleWrap = "w-8 h-8";
  const innerCircle = "w-5 h-5";
  const innerIconSize = 12;
  const translateY = "translate-y-[14px]";
  const labelClass = "mt-6 px-2 py-[1px] text-[10px]";
  const containerMax = "max-w-5xl";
  const containerPy = "py-1.5";

  return (
    <div className={`fixed top-0 left-64 right-0 z-40 ${containerPy}`}>
      <div className={`relative w-full ${containerMax} mx-auto flex flex-col items-center`}>
        {/* Línea de progreso */}
        <div className={`absolute ${leftOffset} ${rightOffset} top-1/2 -translate-y-1/2 z-0`}>
          <div className="relative w-full">
            <div
              className={`absolute top-1/2 left-0 w-full ${trackHeight} rounded-full -translate-y-1/2 bg-gray-200`}
            />
            <motion.div
              className={`absolute top-1/2 left-0 ${trackHeight} bg-green-700 rounded-full -translate-y-1/2 z-0`}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Círculos y etiquetas */}
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
                    className={`${circleWrap} rounded-full flex items-center justify-center border border-gray-300 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-green-600`}
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      boxShadow: isActive
                        ? "0 0 10px rgba(16, 185, 129, 0.5)"
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`flex items-center justify-center ${innerCircle} rounded-full transition-all duration-250
                        ${
                          isCompleted
                            ? "bg-green-700 text-white"
                            : isActive
                            ? "bg-white border-[2px] border-green-700"
                            : "bg-gray-400 text-white border border-gray-300"
                        }`}
                    >
                      {isCompleted ? (
                        <Check size={innerIconSize} strokeWidth={3} />
                      ) : !isActive ? (
                        <span className="text-white font-extrabold text-[12px]">{number}</span>
                      ) : null}
                    </div>
                  </motion.div>

                  {/* Flechita inferior */}
                  <div
                    className={`absolute top-full mt-[2px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px]
                      ${
                        isActive
                          ? "border-l-transparent border-r-transparent border-b-green-700"
                          : "border-l-transparent border-r-transparent border-b-gray-400"
                      }`}
                  />
                </div>

                {/* Etiquetas */}
                <div
                  className={`${labelClass} font-medium transition-all duration-200 ${
                    isActive ? "text-green-700 font-semibold" : "text-gray-500"
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

