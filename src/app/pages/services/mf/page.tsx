"use client";
import { useState, useEffect } from "react";
import apiClient from "@/lib/api";

interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  descripcion?: string;
  url_portada?: string;
  garantia?: string;
  usuario_id: number;
}

export default function MFService() {
  const [activeSection, setActiveSection] = useState("overview");
  const [service, setService] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const servicios = await apiClient.getServicios();
      const mfService = servicios.find(s => s.categoria === 'MF');
      setService(mfService || null);
    } catch (error) {
      console.error("Error cargando servicio MF:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url_portada?: string) => {
    if (!url_portada) return "/services/logo-servicio.svg";
    if (url_portada.startsWith("/files/")) {
      return `${
        process.env.NEXT_PUBLIC_API_URL ||
        "https://mawell-backend-fastapi-1.onrender.com"
      }${url_portada}`;
    }
    return url_portada;
  };

  const fluidSystems = [
    {
      title: "Sistemas de Filtración Avanzada",
      description:
        "Tecnologías de filtración de vanguardia para procesos industriales críticos con eficiencia garantizada del 99.9%",
      icon: "⚙️",
      features: [
        "Filtros multicapa de alta eficiencia",
        "Sistemas de ultrafiltración y nanofiltración",
        "Filtros autolimpiantes con retrolavado automático",
        "Monitoreo continuo de calidad y rendimiento",
      ],
    },
    {
      title: "Mantenimiento Predictivo",
      description:
        "Programas de mantenimiento basados en análisis de datos y tecnología IoT para máxima disponibilidad",
      icon: "🔽",
      features: [
        "Análisis vibracional y termográfico",
        "Monitoreo en tiempo real de parámetros críticos",
        "Mantenimiento basado en condición (CBM)",
        "Reportes automáticos y alertas tempranas",
      ],
    },
    {
      title: "Optimización de Procesos",
      description:
        "Mejora continua de eficiencia operativa y reducción de costos mediante tecnología inteligente",
      icon: "🎛️",
      features: [
        "Análisis de eficiencia energética",
        "Optimización de caudales y presiones",
        "Integración con sistemas ERP",
        "Reducción de desperdicios hasta 30%",
      ],
    },
  ];

  const applications = [
    {
      icon: "🏭",
      title: "Industria Química",
      description: "Transferencia segura de químicos",
    },
    {
      icon: "💧",
      title: "Tratamiento de Agua",
      description: "Purificación y distribución",
    },
    {
      icon: "🍎",
      title: "Industria Alimentaria",
      description: "Procesamiento higiénico",
    },
    {
      icon: "⛽",
      title: "Petróleo y Gas",
      description: "Manejo de hidrocarburos",
    },
    { icon: "🏥", title: "Farmacéutica", description: "Fluidos estériles" },
    { icon: "🌱", title: "Agricultura", description: "Sistemas de riego" },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section - Style matching the slider */}
      <section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-20">
              Control y Manejo<br />
              de Fluidos
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Servicios especializados en mantenimiento y sistemas de filtración
              industrial. Soluciones para transferir y controlar fluidos
              industriales en plantas de procesos productivos.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#0E3855] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Solicitar Cotización
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0E3855] transition-all duration-300">
                Ver Sistemas
              </button>
            </div>
          </div>
          <div className="relative">
            {loading ? (
              <div className="w-48 lg:w-120 h-48 lg:h-120 mt-12 lg:mt-0 flex items-center justify-center bg-white/10 rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <span className="text-white/80 text-sm">Cargando imagen...</span>
                </div>
              </div>
            ) : (
              <img
                src={service ? getImageUrl(service.url_portada) : "/services/tesla.svg"}
                alt={service?.nombre || "Mantenimiento y Filtración"}
                className="w-48 lg:w-120 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
              />
            )}
          </div>
        </div>
        <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
          MF
        </span>
      </section>

      {/* Navigation */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Visión General" },
              { id: "systems", label: "Sistemas" },
              { id: "applications", label: "Aplicaciones" },
              { id: "maintenance", label: "Mantenimiento" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === tab.id
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

      {/* Dynamic Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Control y Manejo de Fluidos
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Especializados en el diseño, instalación y mantenimiento de
                  sistemas para transferir y controlar fluidos industriales.
                  Nuestros equipos de almacenamiento, impulsión, instrumentación
                  y automatización garantizan la máxima eficiencia en sus
                  procesos productivos.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2079AB] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">💧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Sistemas de Dosificación
                      </h3>
                      <p className="text-gray-600">
                        Equipos de dosificación manual y automática para uso
                        industrial, comercial y agrícola
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2079AB] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🔧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Mantenimiento Especializado
                      </h3>
                      <p className="text-gray-600">
                        Respaldo técnico con personal altamente calificado y
                        asesoría personalizada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2079AB] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Automatización
                      </h3>
                      <p className="text-gray-600">
                        Sistemas automatizados para control preciso y monitoreo
                        continuo
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Solicita una Evaluación Gratuita
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Persona de contacto"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent">
                    <option>Tipo de industria</option>
                    <option>Química</option>
                    <option>Alimentaria</option>
                    <option>Farmacéutica</option>
                    <option>Tratamiento de agua</option>
                    <option>Otra</option>
                  </select>
                  <textarea
                    placeholder="Describe tus necesidades específicas..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  />
                  <button className="w-full bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0E3855] hover:to-[#2079AB] transition-all duration-300">
                    Solicitar Evaluación
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeSection === "systems" && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Sistemas de Fluidos
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Equipos especializados para cada tipo de aplicación industrial
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {fluidSystems.map((system, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-4">{system.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {system.title}
                      </h3>
                      <p className="text-gray-600">{system.description}</p>
                    </div>

                    <div className="space-y-3">
                      {system.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-[#2079AB] rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "applications" && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Aplicaciones Industriales
                </h2>
                <p className="text-lg text-gray-600">
                  Soluciones adaptadas para diferentes sectores industriales
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {app.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">
                        {app.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "maintenance" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Programa de Mantenimiento
                </h2>
                <p className="text-lg text-gray-600">
                  Mantenimiento preventivo y correctivo para maximizar la vida
                  útil de tus equipos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Mantenimiento Preventivo
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Inspecciones programadas
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Lubricación de equipos
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Calibración de instrumentos
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Reemplazo de componentes
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Mantenimiento Correctivo
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Diagnóstico de fallas
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Reparación especializada
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Respuesta de emergencia
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">
                        Soporte técnico 24/7
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Contrato de Mantenimiento
                </h3>
                <p className="mb-6">
                  Asegura el funcionamiento óptimo de tus equipos con nuestros
                  contratos de mantenimiento personalizados
                </p>
                <button className="bg-white text-[#2079AB] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
                  Solicitar Propuesta
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
