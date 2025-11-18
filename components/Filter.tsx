"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCcw, Info } from "lucide-react";

export default function FiltrosBusqueda() {
  const [filtros, setFiltros] = useState({
    unidadId: "",
    programaId: "",
  });

  const [unidades, setUnidades] = useState<any[]>([]);
  const [programas, setProgramas] = useState<any[]>([]);
  const [programasFiltrados, setProgramasFiltrados] = useState<any[]>([]);
  const [cohortes, setCohortes] = useState<any[]>([]);
  const [cohortesFiltradas, setCohortesFiltradas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  // 🔹 Cargar unidades, programas y cohortes al inicio
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);

        const [resUnidades, resProgramas, resCohortes] = await Promise.all([
          fetch("http://localhost:8080/api/academic-units"),
          fetch("http://localhost:8080/api/programs"),
          fetch("http://localhost:8080/api/cohort-applications"),
        ]);

        if (!resUnidades.ok || !resProgramas.ok || !resCohortes.ok)
          throw new Error("Error cargando datos");

        setUnidades(await resUnidades.json());
        const programasData = await resProgramas.json();
        setProgramas(programasData);
        setProgramasFiltrados(programasData);
        const cohortesData = await resCohortes.json();
        setCohortes(cohortesData);
        setCohortesFiltradas(cohortesData);
      } catch (err) {
        console.error("Error al cargar:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // 🔹 Filtrar programas según la unidad seleccionada
  useEffect(() => {
    if (!filtros.unidadId) {
      setProgramasFiltrados(programas);
    } else {
      setProgramasFiltrados(
        programas.filter((p) => p.unidadAcademica?.id === filtros.unidadId)
      );
    }
    setFiltros((prev) => ({ ...prev, programaId: "" }));
  }, [filtros.unidadId, programas]);

  // 🔹 Filtrar cohortes al presionar consultar
  const filtrarCohortes = () => {
    let resultado = [...cohortes];

    if (filtros.unidadId) {
      resultado = resultado.filter(
        (c) => c.programa?.unidadAcademica?.id === filtros.unidadId
      );
    }

    if (filtros.programaId) {
      resultado = resultado.filter(
        (c) => c.programa?.id === filtros.programaId
      );
    }

    setCohortesFiltradas(resultado);
  };

  // 🔹 Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({ unidadId: "", programaId: "" });
    setProgramasFiltrados(programas);
    setCohortesFiltradas(cohortes);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-green-800 font-bold text-lg mb-4">
        Filtros de búsqueda
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* === PANEL IZQUIERDO === */}
        <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3 border border-gray-200">
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-3 rounded-md mb-4">
            <Info className="mt-1 w-5 h-5 text-green-600" />
            <p className="text-sm">
              Puede filtrar las cohortes por unidad académica y programa.
            </p>
          </div>

          <div className="space-y-4">
            {/* === Unidad académica === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidad académica
              </label>
              <select
                name="unidadId"
                value={filtros.unidadId}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* === Programa === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programa
              </label>
              <select
                name="programaId"
                value={filtros.programaId}
                onChange={handleChange}
                disabled={!programasFiltrados.length}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Seleccione una opción...</option>
                {programasFiltrados.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* === Botones === */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={limpiarFiltros}
              className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-200 transition flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              LIMPIAR
            </button>
            <button
              onClick={filtrarCohortes}
              disabled={cargando}
              className={`${
                cargando ? "bg-green-400" : "bg-green-700 hover:bg-green-800"
              } text-white font-semibold px-4 py-2 rounded-md transition flex items-center gap-2`}
            >
              <Search className="w-4 h-4" />
              {cargando ? "CARGANDO..." : "CONSULTAR"}
            </button>
          </div>
        </div>

        {/* === TABLA DERECHA === */}
        <div className="flex-1">
          <h2 className="text-green-800 font-bold text-lg mb-2">
            Resultados de búsqueda
          </h2>

          <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">N° Acta</th>
                  <th className="px-4 py-2 text-left">Fecha Aprobación</th>
                  <th className="px-4 py-2 text-left">Unidad Académica</th>
                  <th className="px-4 py-2 text-left">Programa</th>
                  <th className="px-4 py-2 text-left">Cupos</th>
                  <th className="px-4 py-2 text-left">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {cohortesFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-gray-500 italic"
                    >
                      {cargando
                        ? "Cargando resultados..."
                        : "No hay resultados disponibles."}
                    </td>
                  </tr>
                ) : (
                  cohortesFiltradas.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{c.numeroActa}</td>
                      <td className="px-4 py-2">
                        {new Date(c.fechaActaAprobacion).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {c.programa?.unidadAcademica?.nombre}
                      </td>
                      <td className="px-4 py-2">{c.programa?.nombre}</td>
                      <td className="px-4 py-2">
                        {c.cupoEstudiantes}/{c.cupoMaxCohorte}
                      </td>
                      <td className="px-4 py-2">{c.usuario?.nombre}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
