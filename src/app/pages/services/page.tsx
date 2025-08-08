"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import icono1 from "/public/servicios.svg";

const services = [
  {
    id: "mf",
    title: "Mantenimiento y Filtración",
    subtitle: "MF",
    description:
      "Especialistas en mantenimiento preventivo y correctivo de sistemas de filtración industrial. Ofrecemos soluciones integrales para el control de calidad de fluidos en procesos industriales críticos, garantizando la máxima eficiencia operativa y cumplimiento normativo.",
    image: "/services/tesla.svg",
    color: "from-[#0E3855] to-[#2079AB]",
    link: "/pages/services/mf",
  },
  {
    id: "mt",
    title: "Mantenimiento Técnico",
    subtitle: "MT",
    description:
      "Servicios técnicos especializados para equipamiento industrial de alta complejidad. Implementamos planes de mantenimiento predictivo utilizando tecnología de vanguardia para maximizar la vida útil de sus activos y minimizar paradas no programadas.",
    image: "/services/BMW.svg",
    color: "from-[#2079AB] to-[#1E6B96]",
    link: "/pages/services/mt",
  },
  {
    id: "ml",
    title: "Mantenimiento de Laboratorio",
    subtitle: "ML",
    description:
      "Mantenimiento especializado de equipos analíticos y de laboratorio. Garantizamos la precisión y trazabilidad de sus instrumentos mediante calibraciones certificadas y procedimientos validados bajo estándares internacionales de calidad.",
    image: "/services/lamborghini.svg",
    color: "from-[#1E6B96] to-[#0E3855]",
    link: "/pages/services/ml",
  },
  {
    id: "mq",
    title: "Mantenimiento Químico",
    subtitle: "MQ",
    description:
      "Mantenimiento integral de sistemas químicos industriales. Nuestros especialistas certificados aseguran la operación segura y eficiente de equipos de dosificación, reactores y sistemas de tratamiento químico bajo los más altos estándares de seguridad.",
    image: "/services/logo-servicio.svg",
    color: "from-[#0E3855] to-[#2079AB]",
    link: "/pages/services/mq",
  },
  {
    id: "mb",
    title: "Mantenimiento Biológico",
    subtitle: "MB",
    description:
      "Servicios especializados para equipos biotecnológicos y de procesos biológicos. Mantenemos la integridad de sistemas críticos en biotecnología, farmacéutica y tratamiento biológico de aguas, cumpliendo con regulaciones GMP y FDA.",
    image: "/services/tesla.svg",
    color: "from-[#2079AB] to-[#1E6B96]",
    link: "/pages/services/mb",
  },
];

export default function ServicesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white">
      {/* Hero: Servicios Industriales MAWELL */}

      {/* Hero Slider - Styled like first section */}
      <div className="relative h-[80vh] overflow-hidden">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${service.color}`}
            />

            {/* Content */}
            <div className="relative h-full">
              <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between">
                {/* Text Content */}
                <div className="max-w-xl z-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
                    {service.title.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h1>
                  <p className="text-lg mb-8 text-white/90">
                    {service.description}
                  </p>
                  <button
                    onClick={() => router.push(service.link)}
                    className="bg-white text-[#0E3855] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  >
                    Ver Más
                  </button>
                </div>

                {/* Image */}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-48 lg:w-64 mt-12 lg:mt-0 filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Service Code */}
              <span className="absolute left-8 top-[50%] transform -translate-y-1/2 text-6xl lg:text-8xl font-bold opacity-20 text-white">
                {service.subtitle}
              </span>
            </div>
          </div>
        ))}

        {/* Enhanced Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + services.length) % services.length
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % services.length)
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* Certificaciones y Estándares */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          CERTIFICACIONES Y ESTÁNDARES
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Cumplimos con los más altos estándares internacionales de calidad y
          seguridad
        </p>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#0E3855] rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-sm">ISO</span>
            </div>
            <span className="text-sm font-medium">ISO 9001:2015</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#2079AB] rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-sm">GMP</span>
            </div>
            <span className="text-sm font-medium">Good Manufacturing</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#1E6B96] rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-sm">FDA</span>
            </div>
            <span className="text-sm font-medium">FDA Compliant</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#0E3855] rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xs">OHSAS</span>
            </div>
            <span className="text-sm font-medium">Safety Standards</span>
          </div>
        </div>
      </section>

      {/* Nuestra Propuesta de Valor */}
      <section className="bg-gradient-to-b from-[#2079AB] to-[#0E3855] py-20 text-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">
              NUESTRA PROPUESTA DE VALOR
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#0E3855] text-sm font-bold">✓</span>
                </div>
                <p className="text-lg">
                  Mantenimiento preventivo y predictivo de última generación
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#0E3855] text-sm font-bold">✓</span>
                </div>
                <p className="text-lg">
                  Personal técnico certificado y altamente especializado
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#0E3855] text-sm font-bold">✓</span>
                </div>
                <p className="text-lg">
                  Soporte técnico 24/7 para sistemas críticos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#0E3855] text-sm font-bold">✓</span>
                </div>
                <p className="text-lg">
                  Cumplimiento garantizado de normativas internacionales
                </p>
              </div>
            </div>
          </div>

          <>
            <Image
              src={icono1}
              alt="Servicios Industriales"
              width={300}
              height={300}
              className="object-contain filter drop-shadow-2xl"
            />
          </>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para cada una de tus necesidades
              industriales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                {/* Service Header with Gradient */}
                <div
                  className={`relative h-32 bg-gradient-to-r ${service.color} flex items-center justify-center`}
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-white/30 text-2xl font-bold">
                      {service.subtitle}
                    </span>
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#2079AB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => router.push(service.link)}
                    className="w-full bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0E3855] hover:to-[#2079AB] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Conocer más
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                </div>

                {/* Service Number */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
