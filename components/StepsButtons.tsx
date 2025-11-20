"use client";

import { on } from "events";
import { s } from "framer-motion/client";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import React from "react";
import { useState } from "react";

interface StepButtonsProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isValid?: boolean;
  onSubmit?: () => void;
  onSave?: () => Promise<void>;
  plazasDisponibles?: boolean;
  tipoSolicitud?: string;
}


export default function StepsButtons({
  currentStep,
  setCurrentStep,
  isValid = true,
  onSubmit,
  onSave,
  plazasDisponibles = true,
  tipoSolicitud = "",
}: StepButtonsProps) {

  return (
    <div className="w-full bg-white py-2 flex justify-between items-center px-6">
      
      {/* Botón Anterior */}
      {currentStep > 1 ? (
        <button
          onClick={() => {
            if(!plazasDisponibles && currentStep === 4) {
              setCurrentStep(2);
            } else if(!plazasDisponibles && currentStep === 5 && tipoSolicitud === "modificación") {
              setCurrentStep(2);
            }else if(plazasDisponibles && currentStep === 5 && tipoSolicitud === "modificación"){
              setCurrentStep(3);
            }
            else if(currentStep === 6 && tipoSolicitud === "nueva"){
              setCurrentStep(4);
            }else{
              setCurrentStep((p) => Math.max(p - 1, 1))}
          }
          }
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
            onClick={onSave}
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
          >
            <Save size={16} />
            GUARDAR
          </button>
        )}

        {currentStep < 6 ? (
          <button
            disabled={!isValid}
            onClick={() => {
              console.log("tipoSolicitud:", tipoSolicitud);
              console.log("plazasDisponibles desde padre:", plazasDisponibles);
              if(currentStep === 2 && !plazasDisponibles && tipoSolicitud === "nueva") {
                setCurrentStep(4);
            } else if (currentStep === 2 && !plazasDisponibles && tipoSolicitud === "modificación") {
              setCurrentStep(5);
            }else if(currentStep === 3 && tipoSolicitud === "modificación") {
              setCurrentStep(5);
            } else if(currentStep === 4 && tipoSolicitud === "nueva"){
              setCurrentStep(6);
            }else {
            setCurrentStep((p) => Math.min(p + 1, 6));
          }
          }}
            className={`flex items-center gap-2 text-white text-sm font-semibold px-6 py-2 rounded-lg transition 
              ${isValid ? "bg-green-800 hover:bg-green-900" : "bg-gray-400 cursor-not-allowed"}`}
          >
            SIGUIENTE
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={onSubmit}
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
