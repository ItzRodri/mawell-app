"use client";
import { useState } from "react";

export default function MLService() {
  const [activeService, setActiveService] = useState(0);

  const labServices = [
    {
      title: "Instrumentación Analítica Avanzada",
      description:
        "Mantenimiento y calibración de equipos analíticos de alta tecnología con certificación ISO 17025 y trazabilidad internacional",
      icon: "🔬",
      details: [
        "Espectrometría de masas y HPLC-MS",
        "Cromatografía líquida y gaseosa",
        "Microscopía electrónica y confocal",
        "Espectrofotómetros UV-VIS y FTIR",
      ],
    },
    {
      title: "Sistemas de Ambiente Controlado",
      description:
        "Mantenimiento de infraestructura crítica para laboratorios con ambiente controlado y salas limpias clasificadas",
      icon: "💧",
      details: [
        "Sistemas de agua ultrapura Tipo I",
        "Filtros HEPA/ULPA para salas limpias",
        "Cabinas de bioseguridad NSF/ANSI 49",
        "Sistemas de gases especiales y vacío",
      ],
    },
    {
      title: "Metrología y Validación",
      description:
        "Servicios de calibración acreditados y validación de métodos analíticos bajo normativas internacionales",
      icon: "⚖️",
      details: [
        "Calibración con patrones NIST/PTB",
        "Certificados de calibración acreditados",
        "Validación de métodos USP/EP/JP",
        "Trazabilidad metrológica completa",
      ],
    },
  ];

  const certifications = [
    { name: "ISO 9001", description: "Gestión de Calidad" },
    { name: "ISO 17025", description: "Competencia de Laboratorios" },
    { name: "GMP", description: "Buenas Prácticas de Manufactura" },
    { name: "FDA", description: "Regulaciones Farmacéuticas" },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1E6B96] to-[#0E3855] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-20">
              Mantenimiento de
              <br />
              Laboratorio
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Servicios especializados para equipos de laboratorio.
              Instrumentación de precisión y sistemas de control automatizado
              para garantizar resultados confiables.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#1E6B96] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Solicitar Servicio
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E6B96] transition-all duration-300">
                Certificaciones
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/services/lamborghini.svg"
              alt="Mantenimiento de Laboratorio"
              className="w-48 lg:w-64 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
          ML
        </span>
      </section>

      {/* Services Interactive Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Servicios Especializados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mantenimiento profesional para todos los tipos de equipos de
              laboratorio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {labServices.map((service, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  activeService === index ? "scale-105" : ""
                }`}
                onClick={() => setActiveService(index)}
              >
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    activeService === index
                      ? "ring-2 ring-[#1E6B96] bg-gradient-to-br from-blue-50 to-white"
                      : ""
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>

                  {activeService === index && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold mb-3 text-gray-900">
                        Incluye:
                      </h4>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <svg
                              className="w-4 h-4 text-[#1E6B96] mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Certificaciones y Estándares
            </h2>
            <p className="text-lg text-gray-600">
              Cumplimos con los más altos estándares internacionales de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#1E6B96] to-[#0E3855] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {cert.name.substring(0, 3)}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Proceso de Mantenimiento
            </h2>
            <p className="text-lg text-gray-600">
              Metodología probada para garantizar el óptimo funcionamiento de
              tus equipos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1E6B96] to-[#0E3855]"></div>

              {[
                {
                  title: "Evaluación Inicial",
                  description:
                    "Diagnóstico completo del estado de los equipos y análisis de necesidades",
                  time: "1-2 días",
                },
                {
                  title: "Plan de Mantenimiento",
                  description:
                    "Desarrollo de cronograma personalizado basado en criticidad y uso",
                  time: "2-3 días",
                },
                {
                  title: "Ejecución",
                  description:
                    "Implementación del mantenimiento con técnicos certificados",
                  time: "Según plan",
                },
                {
                  title: "Validación",
                  description:
                    "Pruebas de funcionamiento y emisión de certificados de calibración",
                  time: "1 día",
                },
                {
                  title: "Documentación",
                  description:
                    "Entrega de reportes completos y programación de próximos servicios",
                  time: "1 día",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? "" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-sm text-[#1E6B96] font-semibold mb-2">
                        {step.time}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1E6B96] rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1E6B96] to-[#0E3855] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas mantenimiento para tu laboratorio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros especialistas están listos para mantener tus equipos
            funcionando con la máxima precisión
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#1E6B96] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
              Solicitar Cotización
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#1E6B96] transition-colors font-semibold">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
