'use client'
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full h-[80vh]">
        {/* Imagen */}
        <div className="w-1/2 hidden md:block">
          <Image
            src="/imgs/imgLogin.jpg"
            alt="Universidad"
            width={400}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-green-900 text-xl font-semibold mb-2 text-center">
            Bienvenido al Portal de Inscripciones de Posgrados
          </h2>
          <div className="flex items-center justify-center mb-6">
            <span className="text-green-900 text-2xl font-bold border-b-2 border-green-900 pb-1 mr-4">
              Iniciar Sesión
            </span>
            <span className="text-gray-700 text-2xl font-semibold opacity-50 cursor-pointer hover:opacity-100 transition">
              Registrarse
            </span>
          </div>
          <form>
            <input
              type="email"
              placeholder="Correo"
              className="w-full mb-4 px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-green-900 bg-transparent"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-green-900 bg-transparent"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={0}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  // Ojo abierto
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Ojo cerrado
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.568A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2 rounded font-semibold hover:bg-green-800 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}