"use client";

import { motion } from "framer-motion";
import { GraduationCap, ClipboardList, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur bg-white/60 p-8 rounded-2xl shadow-sm border border-green-200"
      >
        <h1 className="text-4xl font-bold text-green-700 flex items-center gap-3">
          <GraduationCap size={40} /> Bienvenido a SIGEPOS
        </h1>
        <p className="text-lg text-green-800 mt-2">
          Sistema de Gestión de Inscripciones – Universidad de Antioquia 🍃
        </p>
      </motion.div>

      {/* GRID DE OPCIONES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

        {/* CARD 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md border border-green-200 hover:shadow-xl transition cursor-pointer"
        >
          <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-xl">
            <ClipboardList size={32} className="text-green-700" />
          </div>
          <h2 className="text-2xl text-green-700 font-semibold mt-4">
            Nueva inscripción
          </h2>
          <p className="text-green-600 mt-2">
            Inicia tu proceso de inscripción en pocos pasos.
          </p>

          <div className="mt-4 flex items-center text-green-700 font-medium">
            Ingresar <ArrowRight className="ml-2" />
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md border border-green-200 hover:shadow-xl transition cursor-pointer"
        >
          <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-xl">
            <GraduationCap size={32} className="text-green-700" />
          </div>
          <h2 className="text-2xl text-green-700 font-semibold mt-4">
            Inscripciones activas
          </h2>
          <p className="text-green-600 mt-2">
            Consulta el estado y progreso de tus solicitudes.
          </p>

          <div className="mt-4 flex items-center text-green-700 font-medium">
            Ver inscripciones <ArrowRight className="ml-2" />
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md border border-green-200 hover:shadow-xl transition cursor-pointer"
        >
          <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-xl">
            <Calendar size={32} className="text-green-700" />
          </div>
          <h2 className="text-2xl text-green-700 font-semibold mt-4">
            Calendario académico
          </h2>
          <p className="text-green-600 mt-2">
            Fechas clave del proceso de admisiones.
          </p>

          <div className="mt-4 flex items-center text-green-700 font-medium">
            Ver calendario <ArrowRight className="ml-2" />
          </div>
        </motion.div>

      </div>

      {/* FOOTER DECORATIVO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-16 text-center text-green-700"
      >
        <p className="text-sm opacity-80">
          Universidad de Antioquia • Facultad de Ingeniería • © {new Date().getFullYear()}
        </p>
      </motion.div>

    </div>
  );
}
