"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import edificiosImg from "/public/contru.jpeg";
import icono1 from "/public/servicios.svg";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Sección Video Hero Mejorada */}
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/oficialvideo.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

        {/* Contenido Hero */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="container mx-auto px-6 lg:px-20">
            <div
              className={`max-w-2xl transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-gradient-to-r from-[#2079AB]/90 to-[#0E3855]/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl border border-white/10">
                <div className="text-white">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <span className="text-sm font-semibold">Bienvenidos</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                    <span className="">Mawell </span>
                    <span className=" text-yellow-300">S.R.L</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                    Especialistas en{" "}
                    <span className="font-bold text-yellow-300">
                      Laboratorio, Procesos Químicos y Biotecnología
                    </span>
                    . Más de 20 años transformando la industria boliviana con
                    soluciones innovadoras.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => router.push("/pages/services")}
                      className="bg-white text-[#0E3855] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <span>Nuestros Servicios</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => router.push("/pages/equipment-types")}
                      className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#0E3855] transition-all duration-300"
                    >
                      Catálogo de Equipos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges flotantes */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Soporte 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">500+ Proyectos</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8">
          <div className="flex flex-col items-center text-white animate-bounce">
            <span className="text-sm mb-2">Explorar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Estadísticas Clave */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0E3855] to-[#2079AB] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  20+
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Años</h3>
              <p className="text-gray-600 text-sm">de Experiencia</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2079AB] to-[#1E6B96] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  500+
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Proyectos</h3>
              <p className="text-gray-600 text-sm">Completados</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E6B96] to-[#0E3855] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  150+
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Clientes</h3>
              <p className="text-gray-600 text-sm">Satisfechos</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0E3855] to-[#2079AB] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-white">
                  24/7
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Soporte</h3>
              <p className="text-gray-600 text-sm">Técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos Mejorada */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-[#2079AB]/20 to-[#0E3855]/20 rounded-2xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <Image
                  src={edificiosImg}
                  alt="Edificios MAWELL"
                  width={400}
                  height={400}
                  className="object-contain w-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-block bg-[#0E3855]/10 text-[#0E3855] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Líderes en Bolivia desde 2002
                </span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                  ¿Quiénes
                  <span className="block text-[#2079AB]">Somos?</span>
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#0E3855]">MAWELL</span> es
                  una empresa líder en Bolivia, presente en el mercado nacional
                  desde el 2002, especializada en servicios industriales de alta
                  tecnología.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Contribuimos aportando valor agregado con soluciones
                  innovadoras y sostenibles para nuestros clientes de diversos
                  rubros industriales, manteniendo siempre los más altos
                  estándares de calidad y certificación internacional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Certificación ISO 9001:2015
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Tecnología de Vanguardia
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Personal Altamente Calificado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Soluciones Sostenibles
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => router.push("/pages/about-us")}
                  className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white px-8 py-4 rounded-lg font-bold hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span>Conocer Más</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/Brochure Mawell 2025.pdf";
                    link.download = "Brochure Mawell 2025.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="border-2 border-[#0E3855] text-[#0E3855] px-8 py-4 rounded-lg font-bold hover:bg-[#0E3855] hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Descargar Brochure
                </button>
                <a
                  href="https://maps.app.goo.gl/pPUaG1UXuvuPKJsL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Ver Ubicación
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Objetivo */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#2079AB]/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#0E3855]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#2079AB]/3 to-[#0E3855]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header de la sección */}
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              Nuestros Valores Corporativos
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              Los Pilares que nos
              <span className="block text-[#2079AB]">Definen</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nuestra misión, visión y objetivo son la brújula que guía cada
              proyecto, cada decisión y cada relación con nuestros clientes.
            </p>
          </div>

          {/* Grid de valores */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Misión */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0E3855] to-[#2079AB] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0E3855] to-[#2079AB] rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  MISIÓN
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#0E3855] to-[#2079AB] mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Mantener una relación de confianza y fidelidad con nuestros
                  clientes brindando soluciones integrales a precios
                  competitivos, creciendo continuamente apoyados en personal
                  capacitado y tecnología de vanguardia. Trabajamos siempre con
                  calidad y creatividad guiados por los principios de Dios.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2079AB] to-[#1E6B96] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2079AB] to-[#1E6B96] rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  VISIÓN
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#2079AB] to-[#1E6B96] mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Alcanzar la satisfacción de nuestros clientes sustentada en el
                  reconocimiento de la calidad de todos los servicios y
                  productos que les brindamos.
                </p>
              </div>
            </div>

            {/* Objetivo */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E6B96] to-[#0E3855] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1E6B96] to-[#0E3855] rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  OBJETIVO
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#1E6B96] to-[#0E3855] mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Ayudar a nuestros clientes a obtener un rendimiento óptimo y
                  los mejores resultados en sus equipos y procesos, traducidos
                  en sistemas más eficientes que les permitan un ahorro
                  significativo al momento de analizar los frutos de la
                  inversión.
                </p>
              </div>
            </div>
          </div>

          {/* Elementos decorativos adicionales */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#0E3855] rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-[#2079AB] rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#1E6B96] rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Servicios Especializados */}
      <section className="bg-gradient-to-br from-[#0E3855] via-[#2079AB] to-[#1E6B96] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenido */}
            <div className="space-y-8">
              <div>
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Nuestros Servicios
                </span>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  Soluciones Integrales
                  <span className="block text-yellow-300">de Vanguardia</span>
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  En MAWELL, transformamos los desafíos industriales con líneas
                  especializadas que integran innovación, tecnología y
                  sostenibilidad para optimizar tus procesos.
                </p>
              </div>

              {/* Lista de servicios */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">Control y Manejo de Fluidos</h4>
                    <p className="text-sm text-white/80">
                      Asesoría en equipos de dosificación, instalación, soporte
                      y garantía.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">
                      Tecnología de Equipos, Insumos e Ingeniería
                    </h4>
                    <p className="text-sm text-white/80">
                      Diseño de plantas, insumos y accesorios.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">
                      Reactivos y Equipos de Laboratorio
                    </h4>
                    <p className="text-sm text-white/80">
                      Provisión de reactivos y análisis de aguas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">Especialidades Químicas</h4>
                    <p className="text-sm text-white/80">
                      Asesoramiento y venta de soluciones para tratamiento de
                      agua, productos para aplicaciones industriales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">Especialidades Biológicas</h4>
                    <p className="text-sm text-white/80">
                      Tratamiento de aguas residuales, grasas, suelos
                      contaminados, piscicultura, necesidades agronómicas, etc.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push("/pages/services")}
                  className="bg-white text-[#0E3855] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span>Ver Todos los Servicios</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => router.push("/pages/equipment-types")}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#0E3855] transition-all duration-300"
                >
                  Catálogo de Equipos
                </button>
              </div>
            </div>

            {/* Imagen */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-full h-full bg-white/10 rounded-3xl"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8">
                <Image
                  src={icono1}
                  alt="Servicios Industriales MAWELL"
                  width={400}
                  height={400}
                  className="object-contain w-full filter drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Casos de Éxito */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Casos de Éxito
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre cómo hemos ayudado a empresas líderes a optimizar sus
              procesos industriales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0E3855] to-[#2079AB] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl fIndustria Font-bold text-gray-900 mb-4">
                Industria Farmacéutica
              </h3>
              <p className="text-gray-600 mb-4">
                Implementación de sistema de filtración estéril que redujo
                contaminación en 99.8% para una planta farmacéutica líder.
              </p>
              <div className="flex items-center text-[#2079AB] font-semibold">
                <span onClick={() => window.open("https://www.facebook.com/share/19GPQKT4rW/", "_blank")}>Ver caso completo</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2079AB] to-[#1E6B96] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Minería</h3>
              <p className="text-gray-600 mb-4">
                Sistema de monitoreo predictivo que aumentó la disponibilidad de
                equipos críticos en 35% y redujo costos de mantenimiento.
              </p>
              <div className="flex items-center text-[#2079AB] font-semibold">
                <span onClick={() => window.open("https://www.facebook.com/share/19GPQKT4rW/", "_blank")}>Ver caso completo</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E6B96] to-[#0E3855] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tratamiento de Agua
              </h3>
              <p className="text-gray-600 mb-4">
                Automatización completa de planta de tratamiento que mejoró la
                eficiencia operativa en 45% y garantizó calidad del agua.
              </p>
              <div className="flex items-center text-[#2079AB] font-semibold">
                <span onClick={() => window.open("https://www.facebook.com/share/19GPQKT4rW/", "_blank")}>Ver caso completo</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              ¿Listo para Optimizar
              <span className="block text-yellow-300">
                tus Procesos Industriales?
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Únete a más de 150 empresas que ya confían en MAWELL para sus
              soluciones industriales. Nuestro equipo de especialistas está
              listo para transformar tu operación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://wa.me/59162200930"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515" />
                </svg>
                Contactar por WhatsApp
              </a>
              <button
                onClick={() => router.push("/pages/about-us")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#0E3855] transition-all duration-300"
              >
                Conocer Más Sobre Nosotros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  +20
                </div>
                <p className="text-white/80">Años de Experiencia</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  500+
                </div>
                <p className="text-white/80">Proyectos Exitosos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  24/7
                </div>
                <p className="text-white/80">Soporte Técnico</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
