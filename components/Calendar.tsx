"use client";

import { CalendarDays, BookOpen, ClipboardList, CheckCircle2, FileCheck, School, GraduationCap } from "lucide-react";

export default function CalendarView() {
  const events = [
    {
      title: "Publicación de la oferta",
      date: "01/AGO/2025",
      icon: <ClipboardList className="text-blue-500" size={22} />,
    },
    {
      title: "Matrículas",
      date: "Del 04/AGO/2025 al 05/AGO/2025",
      icon: <School className="text-green-600" size={22} />,
    },
    {
      title: "Ajustes",
      date: "Del 08/AGO/2025 al 21/AGO/2025",
      icon: <FileCheck className="text-amber-500" size={22} />,
    },
    {
      title: "Clases",
      date: "Del 12/AGO/2025 al 29/NOV/2025",
      icon: <BookOpen className="text-indigo-500" size={22} />,
    },
    {
      title: "Exámenes finales",
      date: "Del 01/DIC/2025 al 06/DIC/2025",
      icon: <CheckCircle2 className="text-red-500" size={22} />,
    },
    {
      title: "Validaciones",
      date: "Del 04/DIC/2025 al 09/DIC/2025",
      icon: <GraduationCap className="text-purple-500" size={22} />,
    },
    {
      title: "Habilitaciones",
      date: "Del 09/DIC/2025 al 15/DIC/2025",
      icon: <GraduationCap className="text-teal-600" size={22} />,
    },
    {
      title: "Terminación oficial",
      date: "17/DIC/2025",
      icon: <CalendarDays className="text-gray-600" size={22} />,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6 border-b pb-3">
          <CalendarDays size={28} className="text-emerald-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Calendario General Aprobado por RVD 17021
            </h2>
            <p className="text-sm text-gray-500">
              Resolución del 16 de mayo de 2025
            </p>
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">{event.icon}</div>
              <div>
                <p className="font-semibold text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer decorativo */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t pt-3">
          📅 Actualizado: Octubre 2025 — Universidad de Antioquia
        </div>
      </div>
    </div>
  );
}
