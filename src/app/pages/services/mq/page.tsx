"use client";
import { useState } from "react";

export default function MQService() {
  const [activeFeature, setActiveFeature] = useState(0);

  const chemicalServices = [
    {
      title: "Sistemas de Dosificación de Precisión",
      description:
        "Equipos de dosificación química de alta precisión con certificación ATEX y cumplimiento de normativas internacionales",
      features: [
        "Bombas dosificadoras magnéticas sin sellos",
        "Controladores de flujo másico Coriolis",
        "Sistemas de mezcla estática y dinámica",
        "Medición gravimétrica automática",
      ],
      image: "🧪",
    },
    {
      title: "Automatización de Procesos Químicos",
      description:
        "Sistemas de control avanzado para procesos químicos críticos con tecnología redundante y failsafe",
      features: [
        "PLCs industriales con certificación SIL",
        "Sensores químicos inteligentes con autodiagnóstico",
        "Válvulas de control con posicionadores HART",
        "Sistemas SCADA con historiador de procesos",
      ],
      image: "⚗️",
    },
    {
      title: "Seguridad y Compliance Químico",
      description:
        "Sistemas integrales de seguridad química con cumplimiento de OSHA, EPA y normativas locales",
      features: [
        "Detectores de gases tóxicos certificados",
        "Sistemas de ventilación con monitoreo continuo",
        "Estaciones de emergencia certificadas ANSI",
        "Sistemas de contención secundaria EPA",
      ],
      image: "🛡️",
    },
  ];

  const industries = [
    {
      name: "Tratamiento de Agua",
      icon: "💧",
      description: "Dosificación precisa para potabilización",
    },
    {
      name: "Industria Alimentaria",
      icon: "🍎",
      description: "Aditivos y conservantes controlados",
    },
    {
      name: "Farmacéutica",
      icon: "💊",
      description: "Principios activos con máxima precisión",
    },
    {
      name: "Petroquímica",
      icon: "⛽",
      description: "Procesos de refinación y tratamiento",
    },
    {
      name: "Minería",
      icon: "⛏️",
      description: "Reactivos para procesamiento de minerales",
    },
    {
      name: "Textil",
      icon: "🧵",
      description: "Colorantes y acabados químicos",
    },
  ];

  const stats = [
    { number: "500+", label: "Proyectos Completados" },
    { number: "99.9%", label: "Precisión en Dosificación" },
    { number: "24/7", label: "Soporte Técnico" },
    { number: "15+", label: "Años de Experiencia" },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-20">
              Especialidades
              <br />
              Quimicias
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Mantenimiento especializado para equipos químicos. Sistemas de
              dosificación y control de procesos químicos industriales con la
              máxima precisión y seguridad.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#0E3855] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Consulta Técnica
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0E3855] transition-all duration-300">
                Ver Equipos
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/services/logo-servicio.svg"
              alt="Mantenimiento de Química"
              className="w-48 lg:w-64 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
          MQ
        </span>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#0E3855] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Nuestros Servicios Químicos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales para el mantenimiento de equipos químicos
              industriales
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            {chemicalServices.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`mx-2 mb-4 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-[#0E3855] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {service.image} {service.title}
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {chemicalServices[activeFeature].image}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {chemicalServices[activeFeature].title}
                </h3>
                <p className="text-lg text-gray-600">
                  {chemicalServices[activeFeature].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chemicalServices[activeFeature].features.map(
                  (feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg"
                    >
                      <div className="w-3 h-3 bg-[#0E3855] rounded-full mr-4"></div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Industrias que Atendemos
            </h2>
            <p className="text-lg text-gray-600">
              Experiencia especializada en diversos sectores industriales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">
              Seguridad y Cumplimiento
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              La seguridad es nuestra prioridad. Cumplimos con todas las
              normativas internacionales para el manejo de sustancias químicas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">
                  Protocolos de Emergencia
                </h3>
                <p className="text-gray-600 text-sm">
                  Procedimientos establecidos para manejo de situaciones
                  críticas
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">
                  Certificaciones
                </h3>
                <p className="text-gray-600 text-sm">
                  Personal certificado en manejo de sustancias peligrosas
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Documentación</h3>
                <p className="text-gray-600 text-sm">
                  Registros completos de mantenimiento y cumplimiento
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas mantenimiento químico especializado?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Confía en nuestros expertos para mantener tus procesos químicos
            funcionando de manera segura y eficiente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0E3855] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
              Solicitar Evaluación
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0E3855] transition-colors font-semibold">
              Contactar Especialista
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
