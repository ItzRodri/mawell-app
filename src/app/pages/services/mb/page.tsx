"use client";
import { useState } from "react";

export default function MBService() {
  const [activeBioSystem, setActiveBioSystem] = useState(0);

  const bioSystems = [
    {
      title: "Biorreactores y Fermentadores",
      description:
        "Mantenimiento especializado de sistemas de cultivo celular y fermentación con cumplimiento GMP y validación FDA",
      icon: "🧬",
      features: [
        "Control avanzado de pH, DO y temperatura",
        "Sistemas de aireación estéril con filtros PTFE",
        "Monitoreo en línea de biomasa y metabolitos",
        "Esterilización CIP/SIP validada y documentada",
      ],
      applications: [
        "Cultivo de células CHO/HEK293",
        "Fermentación de E.coli y levaduras",
        "Producción de vacunas y anticuerpos",
        "Terapias génicas y celulares",
      ],
    },
    {
      title: "Sistemas de Purificación Downstream",
      description:
        "Equipos de purificación y separación de biomoléculas con tecnología de vanguardia y trazabilidad completa",
      icon: "⚗️",
      features: [
        "Cromatografía preparativa ÄKTA/NGC",
        "Filtración tangencial de flujo cruzado",
        "Centrifugación de alta velocidad refrigerada",
        "Liofilización controlada con mapping térmico",
      ],
      applications: [
        "Purificación de proteínas recombinantes",
        "Separación y concentración celular",
        "Eliminación de endotoxinas y virus",
        "Formulación farmacéutica final",
      ],
    },
    {
      title: "Infraestructura de Bioseguridad",
      description:
        "Mantenimiento de sistemas críticos para laboratorios de alta contención y producción estéril",
      icon: "🛡️",
      features: [
        "Cabinas de bioseguridad clase II/III NSF",
        "Autoclaves de vapor saturado validados",
        "Sistemas HVAC con presión diferencial",
        "Monitoreo ambiental continuo 21 CFR Part 11",
      ],
      applications: [
        "Laboratorios BSL-2/BSL-3 certificados",
        "Salas limpias ISO 5/7/8",
        "Áreas de producción GMP",
        "Instalaciones de cuarentena animal",
      ],
    },
  ];

  const bioApplications = [
    {
      icon: "💊",
      title: "Farmacéutica",
      description: "Producción de medicamentos biológicos",
      level: "BSL-2/BSL-3",
    },
    {
      icon: "🧪",
      title: "Investigación",
      description: "Laboratorios de investigación básica",
      level: "BSL-1/BSL-2",
    },
    {
      icon: "🍎",
      title: "Biotecnología Alimentaria",
      description: "Desarrollo de alimentos funcionales",
      level: "Grado alimentario",
    },
    {
      icon: "🌱",
      title: "Agricultura",
      description: "Desarrollo de bioestimulantes",
      level: "Contenido biológico",
    },
    {
      icon: "🔬",
      title: "Diagnóstico",
      description: "Pruebas y análisis clínicos",
      level: "BSL-2",
    },
    {
      icon: "♻️",
      title: "Biotecnología Ambiental",
      description: "Biorremediación y tratamiento",
      level: "Contención primaria",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Evaluación de Bioseguridad",
      description: "Análisis de riesgos biológicos y protocolos de seguridad",
      duration: "2-3 días",
      icon: "🔍",
    },
    {
      step: 2,
      title: "Validación de Procesos",
      description: "Verificación de parámetros críticos y sistemas de control",
      duration: "3-5 días",
      icon: "✅",
    },
    {
      step: 3,
      title: "Mantenimiento Aséptico",
      description: "Procedimientos bajo condiciones estériles",
      duration: "Según programa",
      icon: "🧼",
    },
    {
      step: 4,
      title: "Documentación GMP",
      description: "Registros conforme a buenas prácticas de manufactura",
      duration: "1-2 días",
      icon: "📋",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#2079AB] to-[#1E6B96] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-20">
              Mantenimiento
              <br />
              Biológico
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Servicios para equipamiento biológico y biotecnológico. Sistemas
              especializados para procesos biológicos con máxima bioseguridad y
              control de calidad.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#2079AB] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Consulta Especializada
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2079AB] transition-all duration-300">
                Protocolos BSL
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/services/tesla.svg"
              alt="Mantenimiento Biológico"
              className="w-48 lg:w-64 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
          MB
        </span>
      </section>

      {/* Bio Systems Interactive */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Sistemas Biológicos Especializados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mantenimiento especializado para equipos de biotecnología y
              procesos biológicos
            </p>
          </div>

          {/* System Selector */}
          <div className="flex flex-wrap justify-center mb-12">
            {bioSystems.map((system, index) => (
              <button
                key={index}
                onClick={() => setActiveBioSystem(index)}
                className={`mx-2 mb-4 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeBioSystem === index
                    ? "bg-[#2079AB] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {system.icon} {system.title}
              </button>
            ))}
          </div>

          {/* Active System Display */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* System Info */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">
                      {bioSystems[activeBioSystem].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {bioSystems[activeBioSystem].title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {bioSystems[activeBioSystem].description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Características técnicas:
                    </h4>
                    {bioSystems[activeBioSystem].features.map(
                      (feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <div className="w-2 h-2 bg-[#2079AB] rounded-full mr-3"></div>
                          {feature}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Applications */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
                  <h4 className="font-semibold text-gray-900 mb-6">
                    Aplicaciones:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {bioSystems[activeBioSystem].applications.map(
                      (app, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-lg shadow-sm text-center"
                        >
                          <div className="text-sm font-medium text-gray-700">
                            {app}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biosafety Levels & Applications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Niveles de Bioseguridad y Aplicaciones
            </h2>
            <p className="text-lg text-gray-600">
              Experiencia en todos los niveles de bioseguridad y aplicaciones
              biotecnológicas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bioApplications.map((app, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {app.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {app.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <div className="bg-[#2079AB] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {app.level}
                  </div>
                </div>
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
              Proceso de Mantenimiento Biológico
            </h2>
            <p className="text-lg text-gray-600">
              Metodología especializada que cumple con estándares GMP y
              protocolos de bioseguridad
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center mb-12 last:mb-0">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#2079AB] to-[#1E6B96] text-white rounded-full font-bold mr-8 text-2xl">
                  {step.icon}
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm text-[#2079AB] font-semibold bg-blue-50 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Cumplimiento y Certificaciones
            </h2>
            <p className="text-lg text-gray-600">
              Adherimos a los más altos estándares internacionales de
              bioseguridad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "GMP",
                description: "Buenas Prácticas de Manufactura",
                color: "bg-green-100 text-green-800",
              },
              {
                name: "BSL-3",
                description: "Nivel de Bioseguridad 3",
                color: "bg-orange-100 text-orange-800",
              },
              {
                name: "ISO 14855",
                description: "Biotecnología",
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "FDA",
                description: "Regulaciones Farmacéuticas",
                color: "bg-purple-100 text-purple-800",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg text-center"
              >
                <div
                  className={`inline-block px-4 py-2 rounded-full font-bold text-lg mb-3 ${cert.color}`}
                >
                  {cert.name}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#2079AB] to-[#1E6B96] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas mantenimiento biológico especializado?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros especialistas en biotecnología están listos para mantener
            tus procesos biológicos funcionando de manera segura y eficiente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#2079AB] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
              Consulta Especializada
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#2079AB] transition-colors font-semibold">
              Protocolo de Bioseguridad
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
