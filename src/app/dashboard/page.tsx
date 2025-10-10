"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import ProgressBar from "../../../components/ProgressBar";
import Information from "../../../components/Information";
import Description from "../../../components/Description";
import Cohort from "../../../components/cohort";
import UploadSection1 from "../../../components/AnnexesOne";
import UploadSection2 from "../../../components/AnnexesTwo";
import SendStep from "../../../components/Send";

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
    <div className="min-h-screen">
      <header className="w-full bg-red-500 h-16 flex items-center p-4 fixed top-0 left-0 z-50">
        <div className="text-white font-semibold">HEADER</div>
      </header>

      <div className="pt-16 flex gap-4">
        <aside className="w-1/5 bg-green-500 p-4 h-[calc(100vh-4rem)] sticky top-16 z-30">
          <div className="text-white font-semibold">SIDEBAR</div>
        </aside>

        <main className="flex-1 p-4 min-h-[calc(100vh-4rem)] relative">
          {/* Barra de progreso */}
          <div className="fixed top-16 left-[20%] right-0 z-40 bg-white/80 p-4 backdrop-blur-sm">
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

            {/* === Botones (ya no fijos) === */}
            <div className="w-full bg-white py-4 flex justify-between items-center mt-6 px-6">
              {/* Botón ANTERIOR */}
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
                    onClick={() =>
                      setCurrentStep((p) => Math.min(p + 1, 6))
                    }
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
