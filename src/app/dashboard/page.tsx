"use client";
import { useState } from "react";
import ProgressBar from "../../../components/ProgressBar";
import Information from "../../../components/Information";
import Description from "../../../components/Description";
import Cohort from "../../../components/Cohort";
import UploadSection1 from "../../../components/AnnexesOne";
import UploadSection2 from "../../../components/AnnexesTwo";
import Send from "../../../components/Send";

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
        return <Send />;
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
          <div className="fixed top-16 left-[20%] right-0 z-40 bg-white/80 p-4 backdrop-blur-sm">
            <ProgressBar
              compact
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          <div className="mt-28 overflow-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
              {renderStepContent()}
            </div>

            <div className="sticky bottom-0 left-0 w-full bg-white/80 py-4 flex justify-end gap-3 mt-6 backdrop-blur-sm">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
                aria-label="Atrás"
              >
                Atrás
              </button>
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                aria-label="Siguiente"
              >
                Siguiente
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
