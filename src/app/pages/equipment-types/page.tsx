"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

interface Equipment {
  id: string;
  name: string;
  category: string;
  serviceType: string[];
  description: string;
  specifications: string[];
  image: string;
  brand?: string;
  model?: string;
  applications: string[];
}

const equipmentData: Equipment[] = [
  // Equipos de Mantenimiento y Filtración (MF)
  {
    id: "mf001",
    name: "Sistema de Filtración Multicapa",
    category: "Filtración",
    serviceType: ["MF"],
    description:
      "Sistema avanzado de filtración multicapa para procesos industriales críticos con eficiencia del 99.9%",
    specifications: [
      "Capacidad: 1000-5000 L/h",
      "Eficiencia: 99.9%",
      "Presión máxima: 10 bar",
      "Material: Acero inoxidable 316L",
    ],
    image: "/services/tesla.svg",
    brand: "FilterTech Pro",
    model: "FTP-5000",
    applications: ["Industria Química", "Farmacéutica", "Alimentaria"],
  },
  {
    id: "mf002",
    name: "Bomba Dosificadora Digital",
    category: "Dosificación",
    serviceType: ["MF"],
    description:
      "Bomba dosificadora de alta precisión con control digital y monitoreo IoT",
    specifications: [
      "Caudal: 0.1-100 L/h",
      "Precisión: ±1%",
      "Comunicación: Modbus RTU",
      "Certificación: ATEX",
    ],
    image: "/services/BMW.svg",
    brand: "DosePro",
    model: "DP-100D",
    applications: ["Tratamiento de Agua", "Procesos Químicos", "Minería"],
  },
  {
    id: "mf003",
    name: "Filtro Autolimpiante",
    category: "Filtración",
    serviceType: ["MF"],
    description:
      "Sistema de filtración con retrolavado automático para operación continua",
    specifications: [
      "Tamaño de partícula: 25-500 μm",
      "Caudal: 50-2000 m³/h",
      "Retrolavado automático",
      "Material: Acero al carbono",
    ],
    image: "/services/lamborghini.svg",
    brand: "AutoClean",
    model: "AC-2000",
    applications: ["Refrigeración Industrial", "Sistemas HVAC", "Procesos"],
  },

  // Equipos de Mantenimiento Técnico (MT)
  {
    id: "mt001",
    name: "Analizador de Vibraciones",
    category: "Diagnóstico",
    serviceType: ["MT"],
    description:
      "Analizador portátil de vibraciones para mantenimiento predictivo Industry 4.0",
    specifications: [
      "Rango de frecuencia: 1 Hz - 20 kHz",
      "Sensores: Acelerómetro triaxial",
      "Conectividad: WiFi, Bluetooth",
      "Batería: 8 horas continuas",
    ],
    image: "/services/logo-servicio.svg",
    brand: "VibAnalyzer",
    model: "VA-4000",
    applications: ["Motores", "Bombas", "Compresores", "Turbinas"],
  },
  {
    id: "mt002",
    name: "Cámara Termográfica Industrial",
    category: "Termografía",
    serviceType: ["MT"],
    description:
      "Cámara termográfica profesional para detección temprana de fallas",
    specifications: [
      "Resolución: 640x480 píxeles",
      "Rango de temperatura: -40°C a +1200°C",
      "Precisión: ±2°C",
      "Comunicación: USB, WiFi",
    ],
    image: "/services/tesla.svg",
    brand: "ThermoVision",
    model: "TV-640",
    applications: ["Mantenimiento Eléctrico", "Mecánico", "Procesos Térmicos"],
  },
  {
    id: "mt003",
    name: "Sistema de Monitoreo IoT",
    category: "Monitoreo",
    serviceType: ["MT"],
    description:
      "Plataforma IoT para monitoreo continuo de activos industriales",
    specifications: [
      "Sensores: Temperatura, presión, vibración",
      "Comunicación: 4G, WiFi, LoRaWAN",
      "Dashboard web en tiempo real",
      "Alertas automáticas",
    ],
    image: "/services/BMW.svg",
    brand: "SmartMonitor",
    model: "SM-IoT",
    applications: ["Equipos Rotativos", "Sistemas Hidráulicos", "HVAC"],
  },

  // Equipos de Laboratorio (ML)
  {
    id: "ml001",
    name: "Espectrofotómetro UV-VIS",
    category: "Análisis",
    serviceType: ["ML"],
    description:
      "Espectrofotómetro de doble haz para análisis cuantitativo de precisión",
    specifications: [
      "Rango espectral: 190-1100 nm",
      "Ancho de banda: 1.8 nm",
      "Exactitud fotométrica: ±0.002 A",
      "Software: UV-Win 5.0",
    ],
    image: "/services/lamborghini.svg",
    brand: "LabSpec",
    model: "LS-2600",
    applications: ["Control de Calidad", "Investigación", "Farmacéutica"],
  },
  {
    id: "ml002",
    name: "HPLC Sistema Analítico",
    category: "Cromatografía",
    serviceType: ["ML"],
    description:
      "Sistema de cromatografía líquida de alta resolución para análisis avanzado",
    specifications: [
      "Presión máxima: 600 bar",
      "Detector: UV-VIS, Fluorescencia",
      "Inyector automático: 100 viales",
      "Software: ChromWin",
    ],
    image: "/services/logo-servicio.svg",
    brand: "ChromaTech",
    model: "CT-1260",
    applications: ["Análisis Farmacéutico", "Alimentos", "Ambiental"],
  },
  {
    id: "ml003",
    name: "Cabina de Bioseguridad",
    category: "Bioseguridad",
    serviceType: ["ML"],
    description:
      "Cabina de bioseguridad clase II para trabajo con microorganismos",
    specifications: [
      "Clase: II A2",
      "Dimensiones: 1200x600x2350 mm",
      "Velocidad de aire: 0.5 m/s",
      "Certificación: NSF/ANSI 49",
    ],
    image: "/services/tesla.svg",
    brand: "BioSafe",
    model: "BS-1200",
    applications: ["Microbiología", "Cultivos Celulares", "Investigación"],
  },

  // Equipos Químicos (MQ)
  {
    id: "mq001",
    name: "Reactor Químico Piloto",
    category: "Reactores",
    serviceType: ["MQ"],
    description:
      "Reactor de vidrio borosilicato para procesos químicos a escala piloto",
    specifications: [
      "Capacidad: 5-50 L",
      "Temperatura: -80°C a +300°C",
      "Presión: Vacío a 6 bar",
      "Agitación: 0-2000 rpm",
    ],
    image: "/services/BMW.svg",
    brand: "ChemReactor",
    model: "CR-50L",
    applications: ["I+D Química", "Desarrollo de Procesos", "Síntesis"],
  },
  {
    id: "mq002",
    name: "Detector de Gases Tóxicos",
    category: "Seguridad",
    serviceType: ["MQ"],
    description: "Sistema de detección multigas para seguridad industrial",
    specifications: [
      "Gases: H2S, CO, O2, LEL",
      "Rango: 0-500 ppm",
      "Certificación: ATEX, IECEx",
      "Batería: 12 horas",
    ],
    image: "/services/lamborghini.svg",
    brand: "SafetyTech",
    model: "ST-4G",
    applications: ["Espacios Confinados", "Plantas Químicas", "Refinerías"],
  },
  {
    id: "mq003",
    name: "Sistema de Control PLC",
    category: "Automatización",
    serviceType: ["MQ"],
    description:
      "Controlador lógico programable para automatización de procesos químicos",
    specifications: [
      "E/S: 32 entradas, 16 salidas",
      "Comunicación: Ethernet, Modbus",
      "Certificación: SIL 2",
      "Pantalla HMI: 10 pulgadas",
    ],
    image: "/services/logo-servicio.svg",
    brand: "AutoChem",
    model: "AC-PLC500",
    applications: ["Control de Procesos", "Dosificación", "Seguridad"],
  },

  // Equipos Biológicos (MB)
  {
    id: "mb001",
    name: "Biorreactor de Cultivo Celular",
    category: "Fermentación",
    serviceType: ["MB"],
    description:
      "Biorreactor de acero inoxidable para cultivo celular y fermentación",
    specifications: [
      "Capacidad: 10-200 L",
      "Control: pH, DO, temperatura",
      "Esterilización: CIP/SIP",
      "Material: Acero 316L",
    ],
    image: "/services/tesla.svg",
    brand: "BioFerm",
    model: "BF-200L",
    applications: ["Biotecnología", "Farmacéutica", "Investigación"],
  },
  {
    id: "mb002",
    name: "Sistema de Purificación",
    category: "Purificación",
    serviceType: ["MB"],
    description: "Sistema ÄKTA para purificación de proteínas y biomoléculas",
    specifications: [
      "Presión: 0.1-10 MPa",
      "Flujo: 0.1-100 mL/min",
      "Detectores: UV, Conductividad",
      "Fracciones: Automática",
    ],
    image: "/services/BMW.svg",
    brand: "PurifyPro",
    model: "PP-AKTA",
    applications: ["Purificación Proteínas", "Anticuerpos", "Vacunas"],
  },
  {
    id: "mb003",
    name: "Autoclave de Laboratorio",
    category: "Esterilización",
    serviceType: ["MB"],
    description:
      "Autoclave de vapor saturado para esterilización de material biológico",
    specifications: [
      "Capacidad: 100 L",
      "Temperatura: 121-134°C",
      "Presión: 2.2 bar",
      "Validación: Termopares",
    ],
    image: "/services/lamborghini.svg",
    brand: "SterilTech",
    model: "ST-100",
    applications: ["Esterilización", "Validación", "GMP"],
  },
];

const serviceTypes = [
  { id: "ALL", name: "Todos los Servicios", color: "bg-gray-600" },
  { id: "MF", name: "Mantenimiento y Filtración", color: "bg-[#0E3855]" },
  { id: "MT", name: "Mantenimiento Técnico", color: "bg-[#2079AB]" },
  { id: "ML", name: "Mantenimiento de Laboratorio", color: "bg-[#1E6B96]" },
  { id: "MQ", name: "Mantenimiento Químico", color: "bg-[#0E3855]" },
  { id: "MB", name: "Mantenimiento Biológico", color: "bg-[#2079AB]" },
];

const categories = [
  "Todos",
  "Filtración",
  "Dosificación",
  "Diagnóstico",
  "Termografía",
  "Monitoreo",
  "Análisis",
  "Cromatografía",
  "Bioseguridad",
  "Reactores",
  "Seguridad",
  "Automatización",
  "Fermentación",
  "Purificación",
  "Esterilización",
];

export default function EquipmentTypes() {
  const [selectedService, setSelectedService] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipment = useMemo(() => {
    return equipmentData.filter((equipment) => {
      const matchesService =
        selectedService === "ALL" ||
        equipment.serviceType.includes(selectedService);
      const matchesCategory =
        selectedCategory === "Todos" || equipment.category === selectedCategory;
      const matchesSearch =
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        equipment.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.applications.some((app) =>
          app.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesService && matchesCategory && matchesSearch;
    });
  }, [selectedService, selectedCategory, searchTerm]);

  const handleWhatsAppContact = (equipment: Equipment) => {
    const message = `Hola! Estoy interesado en el equipo:\n\n*${equipment.name}*\nModelo: ${equipment.model}\nMarca: ${equipment.brand}\n\nMe gustaría recibir más información sobre este equipo y una cotización.\n\n¡Gracias!`;
    const whatsappUrl = `https://wa.me/59177824274?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0E3855] via-[#2079AB] to-[#1E6B96] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
              Catálogo de
              <span className="block text-yellow-300">
                Equipos Industriales
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Descubre nuestra amplia gama de equipos especializados para cada
              tipo de servicio industrial. Tecnología de vanguardia para
              optimizar tus procesos.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                <span>Equipos Certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                <span>Soporte Técnico 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span>Garantía Extendida</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          {/* Barra de Búsqueda */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Buscar equipos por nombre, marca, aplicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2079AB] focus:border-transparent text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filtros por Servicio */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Filtrar por Tipo de Servicio
            </h3>
            <div className="flex flex-wrap gap-3">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedService === service.id
                      ? `${service.color} text-white shadow-lg scale-105`
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Categoría */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Filtrar por Categoría
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2079AB]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Resultados */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Mostrando{" "}
              <span className="font-semibold">{filteredEquipment.length}</span>{" "}
              equipos
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Haz clic en cualquier equipo para contactar por WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Equipos */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredEquipment.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.052 0-3.967-.735-5.44-1.959M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron equipos
              </h3>
              <p className="text-gray-600">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEquipment.map((equipment) => (
                <div
                  key={equipment.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  onClick={() => handleWhatsAppContact(equipment)}
                >
                  {/* Header con Servicio */}
                  <div
                    className={`h-32 bg-gradient-to-r ${
                      serviceTypes.find((s) =>
                        equipment.serviceType.includes(s.id)
                      )?.color || "bg-gray-600"
                    } flex items-center justify-center relative`}
                  >
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-16 h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                        {equipment.serviceType.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {equipment.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2079AB] transition-colors">
                        {equipment.name}
                      </h3>
                      {equipment.brand && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{equipment.brand}</span>
                          {equipment.model && ` - ${equipment.model}`}
                        </p>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {equipment.description}
                    </p>

                    {/* Especificaciones */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Especificaciones:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {equipment.specifications
                          .slice(0, 3)
                          .map((spec, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="w-1 h-1 bg-[#2079AB] rounded-full mt-2 flex-shrink-0"></span>
                              {spec}
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Aplicaciones */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Aplicaciones:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {equipment.applications
                          .slice(0, 3)
                          .map((app, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {app}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Botón WhatsApp */}
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515" />
                      </svg>
                      Contactar por WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Asesoría Técnica?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de especialistas está disponible 24/7 para ayudarte a
            seleccionar el equipo ideal para tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/59177824274"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515" />
              </svg>
              WhatsApp: +591 77824274
            </a>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#0E3855] px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Solicitar Catálogo Completo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
