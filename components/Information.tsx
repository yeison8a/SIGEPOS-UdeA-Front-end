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
  unidadAcademica?: { id: string; nombre: string };
};

interface InformationProps {
  onValidate: (isValid: boolean) => void;
}

const LOCAL_STORAGE_KEY = "formInformation";

export default function Information({ onValidate }: InformationProps) {
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error al parsear localStorage:", e);
        }
      }
    }
    return {
      tipoSolicitud: "",
      fechaSolicitud: "",
      numeroActa: "",
      fechaConsejo: "",
      nivel: "",
      unidadAcademica: "",
      programa: "",
      codigoPrograma: "",
    };
  });

  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [loadingUnidades, setLoadingUnidades] = useState(false);
  const [errorUnidades, setErrorUnidades] = useState<string | null>(null);

  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loadingProgramas, setLoadingProgramas] = useState(false);
  const [errorProgramas, setErrorProgramas] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const allFilled = Object.values(formData).every((v) => v.trim() !== "");
    onValidate(allFilled);
  }, [formData, onValidate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "codigoPrograma") {
      const valueNormalized = value.trim().toLowerCase();
      const found = programas.find(
        (p) =>
          (p.codigo && String(p.codigo).toLowerCase() === valueNormalized) ||
          p.id.toLowerCase() === valueNormalized
      );

      const updated = {
        ...formData,
        codigoPrograma: value,
        programa: found ? found.id : "",
        unidadAcademica: found
          ? found.unidadId ?? found.unidadAcademica?.id ?? formData.unidadAcademica
          : formData.unidadAcademica,
      };

      setFormData(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated)); 
      return;
    }


    if (name === "programa") {
      const selected = programas.find((p) => p.id === value);
      const updated = {
        ...formData,
        programa: value,
        codigoPrograma: selected?.codigo ?? "",
        unidadAcademica: selected?.unidadId ?? selected?.unidadAcademica?.id ?? formData.unidadAcademica,
      };
      setFormData(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

      if (selected) {
        localStorage.setItem("programId", selected.id);
      }
      
      return;
    }

    if (name === "unidadAcademica") {
      const updated = {
        ...formData,
        unidadAcademica: value,
        programa: "",
        codigoPrograma: "",
      };
      setFormData(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return;
    }

    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

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
              id: String(item.id ?? ""),
              nombre: String(item.nombre ?? ""),
              codigo: String(item.codigo ?? "") || undefined,
              unidadId: String(item.unidadAcademica?.id ?? ""),
              unidadAcademica: item.unidadAcademica,
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

  const programasFiltrados = formData.unidadAcademica
    ? programas.filter((p) => !p.unidadId || p.unidadId === formData.unidadAcademica)
    : programas;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Información general</h2>
        <div className="mt-2 h-[1px] w-full bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 justify-items-center">
        {/* Tipo de solicitud */}
        <FieldSelect
          label="Tipo de solicitud"
          name="tipoSolicitud"
          value={formData.tipoSolicitud}
          onChange={handleChange}
          required
          options={[
            { value: "", label: "Seleccione una opción" },
            { value: "nueva", label: "Solicitud de apertura de cohorte" },
            { value: "modificación", label: "Solicitud de modificación de resolución de apertura de cohorte" },
          ]}
        />

        {/* Fecha de la solicitud */}
        <FieldDate
          label="Fecha de la solicitud"
          name="fechaSolicitud"
          value={formData.fechaSolicitud}
          onChange={handleChange}
          required
        />

        {/* Número de acta */}
        <FieldInput
          label="Número de acta"
          name="numeroActa"
          value={formData.numeroActa}
          onChange={handleChange}
          placeholder="Ej: 123"
          required
        />

        {/* Fecha aprobación del consejo */}
        <FieldDate
          label="Fecha aprobación del consejo"
          name="fechaConsejo"
          value={formData.fechaConsejo}
          onChange={handleChange}
          required
        />

        {/* Nivel */}
        <FieldSelect
          label="Nivel"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          required
          options={[
            { value: "", label: "Seleccione una opción" },
            { value: "pregrado", label: "Pregrado" },
            { value: "posgrado", label: "Posgrado" },
          ]}
        />

        {/* Unidad académica */}
        <div className="w-full max-w-sm">
          <LabelWithInfo text="Unidad académica" />
          {loadingUnidades ? (
            <div className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm text-gray-600">
              Cargando...
            </div>
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
          <LabelWithInfo text="Programa" />
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
        <FieldInput
          label="Código programa"
          name="codigoPrograma"
          value={formData.codigoPrograma}
          onChange={handleChange}
          placeholder="Ej: 50270"
          required
        />
      </div>
    </div>
  );
}

function LabelWithInfo({ text }: { text: string }) {
  return (
    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
      <span>{text}</span>
      <Info size={16} className="text-gray-400" />
    </label>
  );
}

function FieldInput({ label, name, value, onChange, placeholder, required }: any) {
  return (
    <div className="w-full max-w-sm">
      <LabelWithInfo text={label} />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
      />
      {required && <p className="text-xs text-red-500 mt-1">Required</p>}
    </div>
  );
}

function FieldDate({ label, name, value, onChange, required }: any) {
  return (
    <div className="w-full max-w-sm">
      <LabelWithInfo text={label} />
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-green-300 bg-green-50 rounded-lg p-2.5 pr-10 text-gray-700 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
        />
        <Calendar size={18} className="absolute right-3 top-3 text-green-600 pointer-events-none" />
      </div>
      {required && <p className="text-xs text-red-500 mt-1">Required</p>}
    </div>
  );
}

function FieldSelect({ label, name, value, onChange, options, required }: any) {
  return (
    <div className="w-full max-w-sm">
      <LabelWithInfo text={label} />
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {required && <p className="text-xs text-red-500 mt-1">Required</p>}
    </div>
  );
}
