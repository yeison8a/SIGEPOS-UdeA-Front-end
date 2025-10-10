"use client";

import { Info } from "lucide-react";

export default function Enviar() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg">
      {/* ===== Título con línea separadora ===== */}
      <h2 className="text-gray-800 text-lg font-semibold">
        Solicitud de modificación de resolución
      </h2>
      <div className="w-full h-[1px] bg-gray-200 my-3" />

      {/* ===== Caja de descripción ===== */}
      <div className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
        <Info className="text-gray-500 w-5 h-5 mt-1 shrink-0" />

        <div className="text-gray-700 text-sm leading-relaxed">
          <p>
            Para solicitar la modificación de resolución de apertura de una
            cohorte, recuerde tener a la mano lo siguiente para adjuntarlo al
            final de la solicitud:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>
              Carta del Consejo de su Unidad Académica dando aval a la
              modificación de resolución de apertura de cohorte.
            </li>
            <li>
              Aval por parte de Vicerrectoría Administrativa al estudio de
              costos (si la modificación es de disminución de cupo mínimo).
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
