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
import { Home } from "lucide-react";
import { LogOut } from "lucide-react";

export default function Sidebar({
  onSelectView,
}: {
  onSelectView: (view: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.clear();        //  Limpia todo el localStorage
    sessionStorage.clear();      // (Opcional)
    window.location.href = "/login"; //  Redirige al login
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-md z-50 transition-transform duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">SIGEPOS</h1>
      </div>
      

      <div className="p-3 overflow-y-auto h-[calc(100vh-4rem)] flex flex-col">

        {/* CONTENEDOR DE MENÚS */}
        <div className="space-y-2 flex-1">
          
          {/* MENU: Inicio */}
          <div>
            <button
              onClick={() => onSelectView("inicio")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <Home size={18} /> Inicio
              </span>
            </button>
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
              {openMenu === "inscripciones" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openMenu === "inscripciones" && (
              <ul className="pl-8 mt-1 space-y-1">
                <li>
                  <button
                    onClick={() => onSelectView("nueva-inscripcion")}
                    className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800 w-full text-left"
                  >
                    Nueva inscripción
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectView("ver-inscripciones")}
                    className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-800 w-full text-left"
                  >
                    Ver inscripciones
                  </button>
                </li>
              </ul>
            )}
          </div>
            {/* MENU: Calendario */}
            <div>
              <button
                disabled
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 w-full text-left cursor-not-allowed"
              >
                <Calendar size={18} /> Calendario
              </button>
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
              {openMenu === "account" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openMenu === "account" && (
              <ul className="pl-8 mt-1 space-y-1">
                <li>
                  <button
                    disabled
                    className="block px-2 py-1 text-sm text-gray-400 w-full text-left cursor-not-allowed"
                  >
                    Perfil
                  </button>
                </li>
                <li>
                  <button
                    disabled
                    className="block px-2 py-1 text-sm text-gray-400 w-full text-left cursor-not-allowed"
                  >
                    Configuración
                  </button>
                </li>
              </ul>
            )}
          </div>


          
        </div>

        

        {/* BOTÓN FINAL: CERRAR SESIÓN */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-black-600 hover:text-black-800 w-full px-3 py-2"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
