"use client";
import { useState } from "react";
import Image from "next/image";

export default function MTService() {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: "🔧",
      title: "Mantenimiento Predictivo 4.0",
      description:
        "Implementación de tecnología Industry 4.0 con sensores IoT, machine learning y análisis predictivo para maximizar la disponibilidad de equipos críticos.",
    },
    {
      icon: "⚡",
      title: "Diagnóstico Avanzado",
      description:
        "Análisis técnico con termografía infrarroja, análisis vibracional, ultrasonido y endoscopía industrial para detección temprana de fallas.",
    },
    {
      icon: "🛠️",
      title: "Ingeniería de Confiabilidad",
      description:
        "Programas de confiabilidad operacional (RCM) y análisis de modo de falla (FMEA) ejecutados por ingenieros certificados internacionalmente.",
    },
    {
      icon: "📊",
      title: "Gestión de Activos",
      description:
        "Sistema integral de gestión de activos (EAM) con KPIs en tiempo real, gestión de inventarios y optimización de costos de mantenimiento.",
    },
  ];

  const processes = [
    {
      step: 1,
      title: "Evaluación Inicial",
      description: "Análisis completo del estado actual de tus equipos",
    },
    {
      step: 2,
      title: "Planificación",
      description: "Desarrollo de un plan de mantenimiento personalizado",
    },
    {
      step: 3,
      title: "Ejecución",
      description: "Implementación del plan con técnicos especializados",
    },
    {
      step: 4,
      title: "Seguimiento",
      description: "Monitoreo continuo y ajustes según necesidades",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#2079AB] to-[#1E6B96] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-20">
              Tecnologia de Equipos, 
              <br />
              Insumos e Ingenieria
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Soluciones técnicas avanzadas para equipamiento industrial.
              Equipos de almacenamiento, impulsión, instrumentación y
              automatización para sistemas de alta precisión.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#2079AB] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Solicitar Cotización
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2079AB] transition-all duration-300">
                Ver Catálogo
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/services/BMW.svg"
              alt="Mantenimiento Técnico"
              className="w-48 lg:w-64 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
          MT
        </span>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Descripción General" },
              { id: "features", label: "Características" },
              { id: "process", label: "Proceso" },
              { id: "contact", label: "Contacto" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#2079AB] text-[#2079AB]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  ¿Qué incluye nuestro servicio?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#2079AB] rounded-full flex items-center justify-center mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Mantenimiento Predictivo
                      </h3>
                      <p className="text-gray-600">
                        Análisis avanzado para predecir fallas antes de que
                        ocurran
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#2079AB] rounded-full flex items-center justify-center mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Automatización de Procesos
                      </h3>
                      <p className="text-gray-600">
                        Implementación de sistemas automatizados para mayor
                        eficiencia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#2079AB] rounded-full flex items-center justify-center mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Soporte 24/7
                      </h3>
                      <p className="text-gray-600">
                        Asistencia técnica disponible las 24 horas del día
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Solicita una Evaluación
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros expertos evaluarán tus equipos sin costo para
                  determinar las mejores soluciones.
                </p>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <textarea
                    placeholder="Describe tus necesidades..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <button className="w-full bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0E3855] hover:to-[#2079AB] transition-all duration-300">
                    Enviar Solicitud
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Características del Servicio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div>
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Nuestro Proceso de Trabajo
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {processes.map((process, index) => (
                    <div
                      key={index}
                      className="flex items-center mb-8 last:mb-0"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-[#2079AB] text-white rounded-full font-bold mr-6">
                        {process.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {process.title}
                        </h3>
                        <p className="text-gray-600">{process.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                ¿Listo para empezar?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Contáctanos para una consulta personalizada sobre tus
                necesidades de mantenimiento técnico
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-[#2079AB] text-3xl mb-3">📞</div>
                  <h4 className="font-semibold mb-2">Teléfono</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-[#2079AB] text-3xl mb-3">✉️</div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-gray-600">mt@mawell.com</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-[#2079AB] text-3xl mb-3">🕒</div>
                  <h4 className="font-semibold mb-2">Horario</h4>
                  <p className="text-gray-600">24/7 Disponible</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white px-8 py-3 rounded-full hover:from-[#0E3855] hover:to-[#2079AB] transition-all duration-300 font-semibold">
                Solicitar Consulta Gratuita
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
