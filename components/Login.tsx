'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModeChange = (register: boolean) => {
    setIsRegister(register);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isRegister && confirmPassword && e.target.value !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (isRegister && password && e.target.value !== password) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isRegister
      ? "http://localhost:8080/api/register"
      : "http://localhost:8080/api/login";

    const body = {
      correo: email,
      contrasena: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if(response.ok){
        localStorage.setItem('userId', data.usuario.id);
        router.push("/dashboard");
      } else {
        setError(data.message || "Credenciales inválidas");

      }

      if (isRegister) {
        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegister(false);
      } else {
        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        alert("Inicio de sesión exitoso");
        router.push("/dashboard"); 
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

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
            <span
              className={`text-2xl font-bold pb-1 mr-4 border-b-2 ${
                !isRegister
                  ? "text-green-900 border-green-900"
                  : "text-gray-700 border-transparent opacity-50 cursor-pointer hover:opacity-100 transition"
              }`}
              onClick={() => handleModeChange(false)}
              style={{ cursor: "pointer" }}
            >
              Iniciar Sesión
            </span>
            <span
              className={`text-2xl font-semibold pb-1 ${
                isRegister
                  ? "text-green-900 border-b-2 border-green-900"
                  : "text-gray-700 border-transparent opacity-50 cursor-pointer hover:opacity-100 transition"
              }`}
              onClick={() => handleModeChange(true)}
              style={{ cursor: "pointer" }}
            >
              Registrarse
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo"
              className="w-full mb-4 px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-green-900 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Contraseña */}
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-green-900 bg-transparent"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Confirmar contraseña */}
            {isRegister && (
              <div className="relative mb-6">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-green-900 bg-transparent"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
            )}

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2 rounded font-semibold hover:bg-green-800 transition"
              disabled={loading}
            >
              {loading
                ? "Procesando..."
                : isRegister
                ? "Registrarse"
                : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
