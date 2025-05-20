"use client";
import { useState } from "react";

export default function Navbar() {
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  return (
    <nav className="bg-linear-to-r/srgb from-[#2079AB] to-[#0E3855] opacity-90">
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-28">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white text-2xl font-bold">
                <img src="/mawell-icon.svg" alt="logo" className="w-40 h-40" />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/"
                className="text-white hover:bg-black hover:text-white  rounded-lg p-2"
              >
                Inicio
              </a>
              <a
                href="/"
                className="text-white hover:bg-black hover:text-white  rounded-lg p-2"
              >
                Servicios
              </a>
              <a
                href="/"
                className="text-white hover:bg-black hover:text-white  rounded-lg p-2"
              >
                Tipos de equipos
              </a>
              <a
                href="/"
                className="text-white hover:bg-black hover:text-white  rounded-lg p-2"
              >
                Nosotros
              </a>
              <a
                href="/"
                className="text-white hover:bg-black hover:text-white  rounded-lg p-2"
              >
                Asistente
              </a>
            </div>
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
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-black hover:text-white"
            >
              Asistente
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
