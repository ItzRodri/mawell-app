"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // Estado para el menú desplegable
  const router = useRouter();

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuario_id");
    setIsLoggedIn(!!usuarioId);
  }, []);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario_id");
    setIsLoggedIn(false);
    router.push("/"); // Redirige al home al cerrar sesión
  };

  const handleRedirect = () => {
    router.push("/chat");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#2079AB]/95 to-[#0E3855]/95 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-28">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white text-2xl font-bold">
                <img
                  src="/mawell-icon.svg"
                  alt="logo"
                  className="w-24 h-auto"   
                />
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Inicio
            </a>
            {/* Servicios con menú desplegable */}
            <div
              className="relative"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <a
                href="/pages/services"
                className="text-white hover:bg-black hover:text-white rounded-lg p-2"
              >
                Servicios
              </a>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 w-48">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/pages/services/service1">MF</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/pages/services/service2">MT</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/pages/services/service3">ML</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/pages/services/service4">MQ</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/pages/services/service5">MB</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <a
              href="/chat"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Tipos de equipos
            </a>
            <a
              href="/pages/about-us"
              className="text-white hover:bg-black hover:text-white rounded-lg p-2"
            >
              Nosotros
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleRedirect}
                className="ml-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full flex items-center transition duration-300"
              >
                Asistente
              </button>
            ) : (
              <a
                href="/login"
                className="ml-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
              >
                Logéate
              </a>
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
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Inicio
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Servicios
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Tipos de equipos
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Nosotros
            </a>
            {/* Botón de login en mobile */}
            {isLoggedIn ? (
              <button
                onClick={handleRedirect}
                className="block rounded-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-900 text-center mt-2 w-full"
              >
                Asistente
              </button>
            ) : (
              <a
                href="/login"
                className="block rounded-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-900 text-center mt-2"
              >
                Logéate
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
