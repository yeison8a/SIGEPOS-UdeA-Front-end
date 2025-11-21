"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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
          Sistema de Gestión de Inscripciones – Universidad de Antioquia 
        </p>
      </motion.div>

      {/* DESCRIPCIÓN + IMAGEN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 p-10 bg-white rounded-2xl shadow-md border border-green-200 flex flex-col md:flex-row items-center gap-10"
      >
        
        {/* IMAGEN IZQUIERDA */}
        <motion.img
          src="/udea.jpg"  
          alt="Ilustración SIGEPOS"
          className="w-72 md:w-96 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        />

        {/* DESCRIPCIÓN */}
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            ¿Qué es SIGEPOS?
          </h2>

          <p className="text-green-800 leading-relaxed text-lg">
            SIGEPOS es una plataforma que centraliza y automatiza el proceso de
            inscripción a programas de posgrado, permitiendo a los aspirantes
            diligenciar formularios, cargar documentos y gestionar su proceso de manera
            clara, moderna y eficiente.
          </p>
        </div>
      </motion.div>

      {/* FOOTER */}
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
