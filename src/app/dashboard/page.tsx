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

  const [uploadFiles, setUploadFiles] = useState<{ [key: string]: File | null }>({
    "Aval del Consejo de Unidad Académica": null,
    "Aval del estudio de costos de la Vicerrectoría de Investigación": null,
  });

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
        return <UploadSection1 onValidate={setIsValid} setParentFiles={setUploadFiles} />;
      case 5:
        return <UploadSection2 onValidate={setIsValid} />;
      case 6:
        return <SendStep onValidate={setIsValid} />;
      default:
        return null;
    }
  };

  // ✅ CORREGIDO: handleSubmit sin useState dentro
  const handleSubmit = async () => {
    try {
      const information = JSON.parse(localStorage.getItem("formInformation") || "{}");
      const description = JSON.parse(localStorage.getItem("formDescription") || "{}");
      const cohort = JSON.parse(localStorage.getItem("cohortData") || "{}");

      const userId = localStorage.getItem("userId");
      const programId = localStorage.getItem("programId");

      if (!userId) {
        alert("No hay userId en localStorage");
        return;
      }

      const payloadSolicitudCohorte = {
        numeroActa: information.numeroActa,
        fechaActaAprobacion: information.fechaConsejo,
        programa: { id: programId },
        perfilAspirante: description.perfilAspirante,
        correoDocumentacion: description.correoDocumentos,
        diasHabilesRecepcion: description.diasHabiles,
        puntajeMinimoCorte: description.puntajeMinimo,
        cupoMinCohorte: description.cupoMinimo,
        cupoMaxCohorte: description.cupoMaximo,
        cupoEstudiantes: description.cuposRiesgo,
        plazasDisponibles: description.plazasDisponibles === "Sí",
      };

      const res = await fetch(`http://localhost:8080/api/cohort-applications?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payloadSolicitudCohorte),
      });

      const text = await res.text();
      console.log("Respuesta backend:", res.status, text);

      if (!res.ok) throw new Error(`Error al guardar la información general: ${res.status}`);

      localStorage.removeItem("formInformation");
      localStorage.removeItem("formDescription");
      localStorage.removeItem("cohortData");

      setCurrentStep(1);
      alert("Solicitud de cohorte enviada correctamente");
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      alert("Error al enviar la solicitud.");
    }
  };

  const handleSaveDocuments = async () => {
    try {
      const formData = new FormData();
      Object.values(uploadFiles).forEach((file) => {
        if (file) formData.append("archivos", file);
      });

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No hay userId en localStorage");
        return;
      }

      const res = await fetch(`http://localhost:8080/api/user/${userId}/documents`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      console.log("Respuesta documentos:", res.status, text);

      if (!res.ok) throw new Error(`Error al guardar los documentos: ${text}`);

      alert("Documentos guardados exitosamente");
    } catch (err) {
      console.error("Error al guardar los documentos:", err);
      alert("Error al guardar los documentos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 bottom-0 w-64 z-40">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 relative">
        <main className="p-4 min-h-screen relative">
          <ProgressBar compact currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <div className="absolute top-28 left-0 right-0 bottom-20 z-10 px-6">
            <div ref={scrollRef} className="w-full h-full bg-white rounded-xl shadow p-8 overflow-y-auto">
              {renderStepContent()}
            </div>
          </div>
          <div className="fixed bottom-0 left-64 right-0 z-30 bg-white shadow-inner">
            <StepsButtons
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isValid={isValid}
              onSubmit={handleSubmit}
              onSave={handleSaveDocuments}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
