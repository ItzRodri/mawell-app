"use client";
import { useState } from "react";
import { loginUser } from "@/app/api/auth/login";
import { registerUser } from "@/app/api/auth/register";

export default function AuthPage() {
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
        const response = await loginUser(correo, contraseña);
        alert(`Login exitoso: Usuario ID: ${response.usuario_id}`);
        // Redirigir o manejar estado global aquí
      } else {
        const user = await registerUser(nombre, correo, contraseña, 1); // rol_id por defecto
        alert(`Registro exitoso: Usuario ID: ${user.id}`);
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
