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

  const handleSubmit = async () => {
  try {
    // 1️⃣ Leer datos del localStorage
    const information = JSON.parse(localStorage.getItem("formInformation") || "{}");
    const description = JSON.parse(localStorage.getItem("formDescription") || "{}");
    const cohort = JSON.parse(localStorage.getItem("cohortData") || "{}");
    const annexesOne = JSON.parse(localStorage.getItem("uploadSectionData") || "{}");
    const annexesTwo = JSON.parse(localStorage.getItem("uploadSectionData2") || "{}");

    const userId = localStorage.getItem("userId"); // ⚙️ si guardas el usuario logueado
    const programId = localStorage.getItem("programId"); // ⚙️ si guardas el programa logueado
   
    const payloadSolicitudCohorte = {
      numeroActa: information.numeroActa,
      fechaActaAprobacion: information.fechaConsejo,
      programa: {id: programId},
      perfilAspirante: description.perfilAspirante,
      correoDocumentacion: description.correoDocumentos,
      diasHabilesRecepcion: description.diasHabiles,
      puntajeMinimoCorte: description.puntajeMinimo,
      cupoMinCohorte: description.cupoMinimo,
      cupoMaxCohorte: description.cupoMaximo,
      cupoEstudiantes: description.cuposRiesgo,
      plazasDisponibles: "",
    }
    
    if(description.plazasDisponibles === "Sí"){
      payloadSolicitudCohorte.plazasDisponibles = "true";
    } else{
      payloadSolicitudCohorte.plazasDisponibles = "false";
    }


    const res = await fetch("http://localhost:8080/api/cohort-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadSolicitudCohorte),
    });

    if (!res.ok) throw new Error("Error al guardar la información general");












    localStorage.clear();
    setCurrentStep(1); // vuelve al inicio
  } catch (err) {
    console.error("Error al enviar:", err);
    alert("Error al enviar la solicitud. Revisa la consola.");
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
              onSubmit={handleSubmit}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
