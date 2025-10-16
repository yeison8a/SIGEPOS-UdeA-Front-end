"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import ProgressBar from "../../../components/ProgressBar";
import Information from "../../../components/Information";
import Description from "../../../components/Description";
import Cohort from "../../../components/Cohort";
import UploadSection1 from "../../../components/AnnexesOne";
import UploadSection2 from "../../../components/AnnexesTwo";
import SendStep from "../../../components/Send";
import Sidebar from "../../../components/Sidebar";




export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Information />;
      case 2:
        return <Description />;
      case 3:
        return <Cohort />;
      case 4:
        return <UploadSection1 />;
      case 5:
        return <UploadSection2 />;
      case 6:
        return <SendStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* === SIDEBAR === */}
      <Sidebar />

      {/* === CONTENIDO PRINCIPAL === */}
      <div className="flex-1 ml-64">
        {/* Header fijo */}
        <header className="w-full bg-red-500 h-16 flex items-center p-4 fixed top-0 left-64 z-50">
          <div className="text-white font-semibold">HEADER</div>
        </header>

        {/* Contenido principal */}
        <main className="pt-20 p-4 min-h-screen bg-gray-50 relative">
          {/* Barra de progreso */}
          <div className="fixed top-16 left-64 right-0 z-40 bg-white/80 p-4 backdrop-blur-sm">
            <ProgressBar
              compact
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          {/* Contenido dinámico */}
          <div className="mt-28 overflow-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
              {renderStepContent()}
            </div>

            {/* Botones inferiores */}
            <div className="w-full bg-white py-4 flex justify-between items-center mt-6 px-6">
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

              <div className="flex gap-4">
                {currentStep < 6 && (
                  <button
                    onClick={() => alert("Guardado exitosamente")}
                    className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
                  >
                    <Save size={16} />
                    GUARDAR
                  </button>
                )}

                {currentStep < 6 ? (
                  <button
                    onClick={() => setCurrentStep((p) => Math.min(p + 1, 6))}
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
        </main>
      </div>
    </div>
  );
}
