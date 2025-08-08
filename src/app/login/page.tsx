"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const response = await apiClient.login(correo, contraseña);
        alert(`Login exitoso: ${response.user_name}`);

        // Verificar si es admin y redirigir apropiadamente
        if (response.user_role === 1) {
          router.push("/admin");
        } else {
          router.push("/chat"); // o la página que corresponda para usuarios normales
        }
      } else {
        // Para registro, necesitamos adaptar la estructura
        const registerData = {
          nombre_completo: nombre,
          correo: correo,
          password: contraseña,
          rol_id: 2, // Usuario normal por defecto
        };

        // Hacer request directo para registro (apiClient no tiene método register)
        const response = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error en el registro");
        }

        const user = await response.json();
        alert(`Registro exitoso: ${user.nombre_completo}`);
        setIsLogin(true); // Vuelve al login tras registrarse
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0E3855] to-[#2079AB]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="nombre" className="block font-semibold mb-2">
              Nombre:
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="correo" className="block font-semibold mb-2">
            Correo electrónico:
          </label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="contraseña" className="block font-semibold mb-2">
            Contraseña:
          </label>
          <input
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition duration-300"
          disabled={loading}
        >
          {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <p className="mt-4 text-center">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </span>
        </p>
      </form>
    </div>
  );
}
