"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  User,
  ClipboardList,
  Calendar,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-md z-50 transition-transform duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">SIGEPOS</h1>
      </div>

      {/* Body */}
      <nav className="p-3 overflow-y-auto h-[calc(100vh-4rem)] space-y-2">
        {/* MENU: Inicio */}
        <div>
          <button
            onClick={() => toggleMenu("inicio")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Users size={18} /> Inicio
            </span>
            {openMenu === "inicio" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {openMenu === "inicio" && (
            <ul className="pl-8 mt-1 space-y-1">
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Sub menú 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Sub menú 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Sub menú 3
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* MENU: Account */}
        <div>
          <button
            onClick={() => toggleMenu("account")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <User size={18} /> Account
            </span>
            {openMenu === "account" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {openMenu === "account" && (
            <ul className="pl-8 mt-1 space-y-1">
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Perfil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Configuración
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cerrar sesión
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* MENU: Inscripciones */}
        <div>
          <button
            onClick={() => toggleMenu("inscripciones")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <ClipboardList size={18} /> Inscripciones
            </span>
            {openMenu === "inscripciones" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {openMenu === "inscripciones" && (
            <ul className="pl-8 mt-1 space-y-1">
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Nueva inscripción
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Ver inscripciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Reportes
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* MENU: Calendar */}
        <div>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Calendar size={18} /> Calendario
          </a>
        </div>

        {/* MENU: Documentación */}
        <div>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FileText size={18} /> Documentación
          </a>
        </div>
      </nav>
    </div>
  );
}
