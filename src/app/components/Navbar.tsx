"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: number;
}

export default function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // Estado para el menú desplegable
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userDataStr = localStorage.getItem("user_data");

    if (token && userDataStr) {
      try {
        const parsedUserData: UserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
      }
    }
  }, []);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };
  const handleAdmin = () => {
    router.push("/admin");
  };
  const handleLogout = () => {
    // Limpiar todos los datos de autenticación
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("usuario_id"); // Por compatibilidad
    setIsLoggedIn(false);
    setUserData(null);
    router.push("/"); // Redirige al home al cerrar sesión
  };

  const handleRedirect = () => {
    if (userData?.role === 1) {
      // Si es admin, ir al dashboard
      router.push("/admin");
    } else {
      // Si es usuario normal, ir al chat
      router.push("/chat");
    }
  };

  const getButtonText = () => {
    if (!userData) return "Iniciar sesión";
    return userData.role === 1 ? "Dashboard" : "Asistente";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#2079AB]/95 to-[#0E3855]/95 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-28">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-2xl font-bold">
                <img
                  src="/mawell-icon.svg"
                  alt="logo"
                  className="w-24 h-auto"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Inicio
            </Link>
            {/* Servicios con menú desplegable */}
            <div
              className="relative group" // Añadido group para efectos
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <Link
                href="/pages/services"
                className="text-white hover:bg-black hover:text-white rounded-lg p-2 group-hover:bg-black"
              >
                Servicios
              </Link>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 w-64 transition-all duration-300 ease-in-out">
                  <ul className="py-2">
                    <li className="hover:bg-gray-100 transition-colors duration-200">
                      <Link
                        href="/pages/services/mf"
                        className="px-4 py-3 flex items-center space-x-3"
                      >
                        <span className="font-semibold text-gray-800">MF</span>
                        <span className="text-sm text-gray-600">
                          Mantenimiento y Filtración
                        </span>
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-200">
                      <Link
                        href="/pages/services/mt"
                        className="px-4 py-3 flex items-center space-x-3"
                      >
                        <span className="font-semibold text-gray-800">MT</span>
                        <span className="text-sm text-gray-600">
                          Mantenimiento Técnico
                        </span>
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-200">
                      <Link
                        href="/pages/services/ml"
                        className="px-4 py-3 flex items-center space-x-3"
                      >
                        <span className="font-semibold text-gray-800">ML</span>
                        <span className="text-sm text-gray-600">
                          Mantenimiento de Laboratorio
                        </span>
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-200">
                      <Link
                        href="/pages/services/mq"
                        className="px-4 py-3 flex items-center space-x-3"
                      >
                        <span className="font-semibold text-gray-800">MQ</span>
                        <span className="text-sm text-gray-600">
                          Mantenimiento de Química
                        </span>
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 transition-colors duration-200">
                      <Link
                        href="/pages/services/mb"
                        className="px-4 py-3 flex items-center space-x-3"
                      >
                        <span className="font-semibold text-gray-800">MB</span>
                        <span className="text-sm text-gray-600">
                          Mantenimiento Biológico
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Link
              href="/pages/equipment-types"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Tipos de equipos
            </Link>
            <Link
              href="/pages/about-us"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Nosotros
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                >
                  Cerrar Sesión
                </button>
                <button
                  onClick={handleAdmin}
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                >
                  Admin
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
              >
                {getButtonText()}
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 sm:space-y-1">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Inicio
            </Link>
            <Link
              href="/pages/services"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Servicios
            </Link>
            <Link
              href="/pages/equipment-types"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Tipos de equipos
            </Link>
            <Link
              href="/pages/about-us"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Nosotros
            </Link>
            {/* Botón de login en mobile */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleRedirect}
                  className="block rounded-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-900 text-center mt-2 w-full"
                >
                  {getButtonText()}
                </button>
                <button
                  onClick={handleLogout}
                  className="block rounded-full px-3 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 text-center mt-2 w-full"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-900 text-center mt-2"
              >
                {getButtonText()}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
