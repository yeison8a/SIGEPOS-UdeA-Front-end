"use client";

import { useState, useEffect, useRef } from "react";
import ProgressBar from "../../../components/ProgressBar";
import Information from "../../../components/Information";
import Description from "../../../components/Description";
import Cohort from "../../../components/Cohort";
import UploadSection1 from "../../../components/AnnexesOne";
import UploadSection2 from "../../../components/AnnexesTwo";
import SendStep from "../../../components/Send";
import Sidebar from "../../../components/Sidebar";
import StepsButtons from "../../../components/StepsButtons";

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Information onValidate={setIsValid} />;
      case 2:
        return <Description onValidate={setIsValid} />;
      case 3:
        return <Cohort onValidate={setIsValid} />;
      case 4:
        return <UploadSection1 onValidate={setIsValid} />;
      case 5:
        return <UploadSection2 onValidate={setIsValid} />;
      case 6:
        return <SendStep onValidate={setIsValid} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === SIDEBAR === */}
      <div className="fixed top-0 left-0 bottom-0 w-64 z-40">
        <Sidebar />
      </div>

      {/* === CONTENIDO PRINCIPAL === */}
      <div className="ml-64 flex-1 relative">
        <main className="p-4 min-h-screen relative">
          {/* === PROGRESS BAR === */}
          <ProgressBar
            compact
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          {/* === CONTENIDO SCROLLABLE === */}
          <div className="absolute top-28 left-0 right-0 bottom-20 z-10 px-6">
            <div
              ref={scrollRef}
              className="w-full h-full bg-white rounded-xl shadow p-8 overflow-y-auto"
            >
              {renderStepContent()}
            </div>
          </div>

          {/* === BOTONES === */}
          <div className="fixed bottom-0 left-64 right-0 z-30 bg-white shadow-inner">
            <StepsButtons
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isValid={isValid}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
