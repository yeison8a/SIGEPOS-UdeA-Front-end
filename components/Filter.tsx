"use client";

import { useState } from "react";
import { Search, RefreshCcw, Info } from "lucide-react";

export default function FiltrosBusqueda() {
  const [filtros, setFiltros] = useState({
    fecha: "",
    programa: "",
    rol: "",
    estado: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha: "",
      programa: "",
      rol: "",
      estado: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-green-800 font-bold text-lg mb-4">
        Filtros de búsqueda
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* === PANEL IZQUIERDO === */}
        <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3 border border-gray-200">
          {/* Mensaje de información */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-3 rounded-md mb-4">
            <Info className="mt-1 w-5 h-5 text-green-600" />
            <p className="text-sm">
              Recuerde que puede filtrar la búsqueda con 1 o más parámetros.
            </p>
          </div>

          {/* Campos de filtro */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <select
                name="fecha"
                value={filtros.fecha}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                <option>01/AGO/2025</option>
                <option>04/AGO/2025</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programa
              </label>
              <select
                name="programa"
                value={filtros.programa}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                <option>Ingeniería</option>
                <option>Medicina</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                name="rol"
                value={filtros.rol}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                <option>Estudiante</option>
                <option>Docente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={filtros.estado}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                <option>Activo</option>
                <option>Finalizado</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={limpiarFiltros}
              className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-200 transition flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              LIMPIAR FILTROS
            </button>
            <button
              className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              CONSULTAR
            </button>
          </div>
        </div>

        {/* === TABLA DERECHA === */}
        <div className="flex-1">
          <h2 className="text-green-800 font-bold text-lg mb-2">
            Filtros de búsqueda
          </h2>

          <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha solicitud</th>
                  <th className="px-4 py-2 text-left">Sól. no.</th>
                  <th className="px-4 py-2 text-left">Unidad académica</th>
                  <th className="px-4 py-2 text-left">Programa</th>
                  <th className="px-4 py-2 text-left">Nivel</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    No hay resultados disponibles.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            © Universidad de Antioquia
          </p>
        </div>
      </div>
    </div>
  );
}
