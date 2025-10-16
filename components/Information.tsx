"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Calendar, Info } from "lucide-react";

type FormData = {
  tipoSolicitud: string;
  fechaSolicitud: string;
  numeroActa: string;
  fechaConsejo: string;
  nivel: string;
  unidadAcademica: string;
  programa: string;
  codigoPrograma: string;
};

type Unidad = {
  id: string;
  nombre: string;
};

type Programa = {
  id: string;
  nombre: string;
  codigo?: string;
  unidadId?: string;
};

export default function Information() {
  const [formData, setFormData] = useState<FormData>({
    tipoSolicitud: "",
    fechaSolicitud: "",
    numeroActa: "",
    fechaConsejo: "",
    nivel: "",
    unidadAcademica: "",
    programa: "",
    codigoPrograma: "",
  });

  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [loadingUnidades, setLoadingUnidades] = useState(false);
  const [errorUnidades, setErrorUnidades] = useState<string | null>(null);

  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loadingProgramas, setLoadingProgramas] = useState(false);
  const [errorProgramas, setErrorProgramas] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 🟡 Si se escribe código → buscar programa y unidad
    if (name === "codigoPrograma") {
      const valueNormalized = value.trim().toLowerCase();
      const found = programas.find(
        (p) =>
          (p.codigo && p.codigo.toLowerCase() === valueNormalized) ||
          p.id.toLowerCase() === valueNormalized
      );

      setFormData((prev) => ({
        ...prev,
        codigoPrograma: value,
        programa: found ? found.id : "",
        unidadAcademica: found ? (found.unidadId ?? prev.unidadAcademica) : prev.unidadAcademica,
      }));
      return;
    }

    // 🟢 Si se selecciona programa → autocompletar código y unidad
    if (name === "programa") {
      const selected = programas.find((p) => p.id === value);
      setFormData((prev) => ({
        ...prev,
        programa: value,
        codigoPrograma: selected?.codigo ?? "",
        unidadAcademica: selected?.unidadId ?? prev.unidadAcademica, // 👈 selecciona automáticamente la unidad
      }));
      return;
    }

    // 🟠 Si se cambia unidad → limpiar programa y código
    if (name === "unidadAcademica") {
      setFormData((prev) => ({
        ...prev,
        unidadAcademica: value,
        programa: "",
        codigoPrograma: "",
      }));
      return;
    }

    // Caso general
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Fetch unidades
  useEffect(() => {
    const ac = new AbortController();
    const fetchUnidades = async () => {
      setLoadingUnidades(true);
      setErrorUnidades(null);
      try {
        const res = await fetch("http://localhost:8080/api/academic-units", { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const list: Unidad[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: String(item.id ?? item.codigo ?? item._id ?? item.value ?? ""),
              nombre: String(item.nombre ?? item.name ?? item.title ?? item.label ?? item),
            }))
          : [];

        setUnidades(list);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching unidades:", err);
          setErrorUnidades("No se pudo cargar las unidades académicas.");
        }
      } finally {
        setLoadingUnidades(false);
      }
    };

    fetchUnidades();
    return () => ac.abort();
  }, []);

  // 🟡 Fetch programas
  useEffect(() => {
    const ac = new AbortController();
    const fetchProgramas = async () => {
      setLoadingProgramas(true);
      setErrorProgramas(null);
      try {
        const res = await fetch("http://localhost:8080/api/programs", { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const list: Programa[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: String(item.id ?? item.codigo ?? item._id ?? item.value ?? ""),
              nombre: String(item.nombre ?? item.name ?? item.titulo ?? item.label ?? item),
              codigo: String(item.codigo ?? item.code ?? item.programCode ?? "") || undefined,
              unidadId: String(
                item.unidadId ??
                item.unidad ??
                item.unitId ??
                item.unit ??
                item.unidadAcademica?.id ?? ""  // 👈 soporta relaciones tipo objeto
              ) || undefined,
            }))
          : [];

        setProgramas(list);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching programas:", err);
          setErrorProgramas("No se pudo cargar los programas.");
        }
      } finally {
        setLoadingProgramas(false);
      }
    };

    fetchProgramas();
    return () => ac.abort();
  }, []);

  // Filtrar programas por unidad seleccionada
  const programasFiltrados = formData.unidadAcademica
    ? programas.filter((p) => !p.unidadId || p.unidadId === formData.unidadAcademica)
    : programas;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Información general</h2>
        <div className="mt-2 h-[1px] w-full bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 justify-items-center">
        {/* Tipo de solicitud */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Tipo de solicitud</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="tipoSolicitud"
            value={formData.tipoSolicitud}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Seleccione una opción</option>
            <option value="nueva">Solicitud de apertura de cohorte</option>
            <option value="modificación">Solicitud de modificación de resolución de apertura de cohorte</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Fecha de la solicitud */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Fecha de la solicitud</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="date"
              name="fechaSolicitud"
              value={formData.fechaSolicitud}
              onChange={handleChange}
              className="w-full border border-green-300 bg-green-50 rounded-lg p-2.5 pr-10 text-gray-700 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
            />
            <Calendar size={18} className="absolute right-3 top-3 text-green-600 pointer-events-none" />
          </div>
        </div>

        {/* Número de acta */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Número de acta</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="text"
            name="numeroActa"
            value={formData.numeroActa}
            onChange={handleChange}
            placeholder="Ej: 123"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Fecha aprobación del consejo */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Fecha aprobación del consejo</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="date"
            name="fechaConsejo"
            value={formData.fechaConsejo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Nivel */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Nivel</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <select
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          >
            <option value="">Seleccione una opción</option>
            <option value="pregrado">Pregrado</option>
            <option value="posgrado">Posgrado</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Unidad académica */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Unidad académica</span>
            <Info size={16} className="text-gray-400" />
          </label>

          {loadingUnidades ? (
            <div className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm text-gray-600">Cargando...</div>
          ) : errorUnidades ? (
            <div className="w-full border border-red-300 rounded-lg p-2.5 bg-red-50 text-sm text-red-700">
              {errorUnidades}
            </div>
          ) : (
            <select
              name="unidadAcademica"
              value={formData.unidadAcademica}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
            >
              <option value="">Seleccione una unidad académica</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Programa */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Programa</span>
            <Info size={16} className="text-gray-400" />
          </label>

          {!programas.length && loadingProgramas ? (
            <div className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm text-gray-600">
              Cargando programas...
            </div>
          ) : errorProgramas ? (
            <div className="w-full border border-red-300 rounded-lg p-2.5 bg-red-50 text-sm text-red-700">
              {errorProgramas}
            </div>
          ) : (
            <select
              name="programa"
              value={formData.programa}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
            >
              <option value="">Seleccione un programa</option>
              {programasFiltrados.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>

        {/* Código programa */}
        <div className="w-full max-w-sm">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Código programa</span>
            <Info size={16} className="text-gray-400" />
          </label>
          <input
            type="text"
            name="codigoPrograma"
            value={formData.codigoPrograma}
            onChange={handleChange}
            placeholder="Ej: 123"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
          />
          <p className="text-xs text-red-500 mt-1">Required</p>
        </div>
      </div>
    </div>
  );
}
