"use client";
import { useState } from "react";
import Image from "next/image";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("historia");

  return (
    <>
      {/* Hero Section - Quiénes Somos */}
      <section className="bg-gradient-to-br from-[#0E3855] via-[#2079AB] to-[#1E6B96] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Contenido principal */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">
                  Bienvenidos
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                MAWELL
                <span className="block text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                  Servicios Industriales
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Más de <span className="font-bold text-white">20 años</span>{" "}
                liderando el mercado boliviano en mantenimiento industrial
                especializado. Somos el socio estratégico de confianza para
                empresas que requieren soluciones técnicas de alta calidad y
                cumplimiento normativo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#0E3855] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2">
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
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0E3855] transition-all duration-300">
                  Contáctanos
                </button>
              </div>
            </div>

            {/* Imagen */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/about-us/about-us-portada.svg"
                  alt="MAWELL Servicios Industriales"
                  className="w-full max-w-md lg:max-w-lg h-auto filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Estadísticas Clave */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#0E3855] mb-2">
                20+
              </div>
              <p className="text-gray-600 font-medium">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#2079AB] mb-2">
                500+
              </div>
              <p className="text-gray-600 font-medium">Proyectos Completados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#1E6B96] mb-2">
                150+
              </div>
              <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#0E3855] mb-2">
                24/7
              </div>
              <p className="text-gray-600 font-medium">Soporte Técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación por Tabs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestra Empresa
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce más sobre MAWELL: nuestra historia, valores y compromiso
              con la excelencia en servicios industriales
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 max-w-2xl mx-auto shadow-lg">
            <button
              onClick={() => setActiveTab("historia")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "historia"
                  ? "bg-[#0E3855] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0E3855]"
              }`}
            >
              Historia
            </button>
            <button
              onClick={() => setActiveTab("valores")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "valores"
                  ? "bg-[#0E3855] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0E3855]"
              }`}
            >
              Valores
            </button>
            <button
              onClick={() => setActiveTab("certificaciones")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "certificaciones"
                  ? "bg-[#0E3855] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0E3855]"
              }`}
            >
              Certificaciones
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 min-h-[500px]">
            {activeTab === "historia" && (
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Nuestra Historia
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#0E3855] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        2002
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          Fundación
                        </h4>
                        <p className="text-gray-600">
                          MAWELL inicia operaciones en Bolivia, especializándose
                          en servicios industriales de mantenimiento.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#2079AB] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        2010
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          Expansión de Servicios
                        </h4>
                        <p className="text-gray-600">
                          Incorporamos servicios especializados en filtración,
                          laboratorio y procesos químicos.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1E6B96] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        2018
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          Certificación ISO
                        </h4>
                        <p className="text-gray-600">
                          Obtuvimos la certificación ISO 9001:2015, consolidando
                          nuestro compromiso con la calidad.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#0E3855] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        2024
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          Líderes del Mercado
                        </h4>
                        <p className="text-gray-600">
                          Más de 20 años liderando el mercado boliviano con
                          tecnología de vanguardia y personal altamente
                          calificado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img
                    src="/about-us/about-us.jpg"
                    alt="Historia MAWELL"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === "valores" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Nuestros Valores Corporativos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* MISIÓN */}
                  <div className="group bg-gradient-to-br from-[#0E3855] to-[#2079AB] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/about-us/mision.svg"
                        alt="Misión"
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">MISIÓN</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Proporcionar soluciones integrales de mantenimiento
                      industrial que maximicen la eficiencia operativa de
                      nuestros clientes, manteniendo los más altos estándares de
                      calidad y seguridad.
                    </p>
                  </div>

                  {/* VISIÓN */}
                  <div className="group bg-gradient-to-br from-[#2079AB] to-[#1E6B96] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/about-us/vision.svg"
                        alt="Visión"
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">VISIÓN</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Ser la empresa líder en servicios industriales
                      especializados en América Latina, reconocida por nuestra
                      innovación tecnológica y excelencia en el servicio al
                      cliente.
                    </p>
                  </div>

                  {/* VALORES */}
                  <div className="group bg-gradient-to-br from-[#1E6B96] to-[#0E3855] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/about-us/objetivo.svg"
                        alt="Valores"
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">VALORES</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Integridad, Excelencia, Innovación, Compromiso con el
                      cliente y Responsabilidad social y ambiental guían cada
                      una de nuestras acciones.
                    </p>
                  </div>

                  {/* COMPROMISO ODS */}
                  <div className="group bg-gradient-to-br from-[#0E3855] to-[#2079AB] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="/about-us/impacto.svg"
                        alt="ODS"
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">COMPROMISO ODS</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Alineados con los Objetivos de Desarrollo Sostenible,
                      trabajamos por un futuro más sostenible y responsable para
                      las futuras generaciones.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "certificaciones" && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Certificaciones y Estándares
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                      Certificaciones de Calidad
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-[#0E3855] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            ISO
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">ISO 9001:2015</h5>
                          <p className="text-gray-600">
                            Sistema de Gestión de Calidad certificado
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-[#2079AB] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            GMP
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">
                            Good Manufacturing Practices
                          </h5>
                          <p className="text-gray-600">
                            Buenas prácticas de manufactura farmacéutica
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-[#1E6B96] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            FDA
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">FDA Compliance</h5>
                          <p className="text-gray-600">
                            Cumplimiento de regulaciones farmacéuticas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                      Nuestros Servicios Especializados
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#0E3855]/10 to-[#2079AB]/10 rounded-lg">
                        <span className="w-8 h-8 bg-[#0E3855] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          MF
                        </span>
                        <span className="font-medium">
                          Mantenimiento y Filtración
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2079AB]/10 to-[#1E6B96]/10 rounded-lg">
                        <span className="w-8 h-8 bg-[#2079AB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          MT
                        </span>
                        <span className="font-medium">
                          Mantenimiento Técnico
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#1E6B96]/10 to-[#0E3855]/10 rounded-lg">
                        <span className="w-8 h-8 bg-[#1E6B96] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          ML
                        </span>
                        <span className="font-medium">
                          Mantenimiento de Laboratorio
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#0E3855]/10 to-[#2079AB]/10 rounded-lg">
                        <span className="w-8 h-8 bg-[#0E3855] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          MQ
                        </span>
                        <span className="font-medium">
                          Mantenimiento Químico
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2079AB]/10 to-[#1E6B96]/10 rounded-lg">
                        <span className="w-8 h-8 bg-[#2079AB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          MB
                        </span>
                        <span className="font-medium">
                          Mantenimiento Biológico
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Nuestro Equipo Profesional
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Contamos con un equipo multidisciplinario de ingenieros y técnicos
              especializados, certificados internacionalmente en las más
              avanzadas tecnologías industriales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Ingeniería Especializada
              </h3>
              <p className="text-white/90 text-center text-sm">
                Ingenieros certificados en mantenimiento predictivo,
                confiabilidad operacional y tecnologías Industry 4.0
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Certificaciones Internacionales
              </h3>
              <p className="text-white/90 text-center text-sm">
                Personal certificado por NIST, ISO, FDA y otras organizaciones
                internacionales de reconocido prestigio
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Formación Continua
              </h3>
              <p className="text-white/90 text-center text-sm">
                Programa permanente de capacitación en las últimas tecnologías y
                metodologías del mantenimiento industrial
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Áreas de Especialización
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">MF</span>
                  </div>
                  <p className="text-xs text-white/90">Filtración Industrial</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">MT</span>
                  </div>
                  <p className="text-xs text-white/90">Mantenimiento 4.0</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">ML</span>
                  </div>
                  <p className="text-xs text-white/90">Equipos Analíticos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">MQ</span>
                  </div>
                  <p className="text-xs text-white/90">Procesos Químicos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">MB</span>
                  </div>
                  <p className="text-xs text-white/90">Biotecnología</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Contáctanos" Mejorada */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para Optimizar tus Operaciones?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contáctanos hoy mismo y descubre cómo nuestras soluciones
              especializadas pueden mejorar la eficiencia de tus sistemas
              industriales.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Información de Contacto */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0E3855] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
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
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        Oficina Central
                      </h4>
                      <p className="text-gray-600">La Paz, Bolivia</p>
                      <p className="text-gray-600">
                        Zona Sur, Edificio Empresarial
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2079AB] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        Teléfono
                      </h4>
                      <p className="text-gray-600">+591 2 XXX-XXXX</p>
                      <p className="text-gray-600">
                        Soporte 24/7: +591 7 XXX-XXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E6B96] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Email</h4>
                      <p className="text-gray-600">info@mawell.com.bo</p>
                      <p className="text-gray-600">soporte@mawell.com.bo</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <img
                    src="/about-us/about-us.jpg"
                    alt="Ubicación MAWELL"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* Formulario Mejorado */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Solicita una Cotización
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition"
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition"
                        placeholder="+591 XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servicio de Interés
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition">
                        <option value="">Seleccionar servicio</option>
                        <option value="mf">
                          Mantenimiento y Filtración (MF)
                        </option>
                        <option value="mt">Mantenimiento Técnico (MT)</option>
                        <option value="ml">
                          Mantenimiento de Laboratorio (ML)
                        </option>
                        <option value="mq">Mantenimiento Químico (MQ)</option>
                        <option value="mb">Mantenimiento Biológico (MB)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción del Proyecto
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition resize-none"
                      placeholder="Describe brevemente tus necesidades y el alcance del proyecto..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>Enviar Solicitud</span>
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Campos obligatorios. Nos comprometemos a responder en un
                    máximo de 24 horas.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
