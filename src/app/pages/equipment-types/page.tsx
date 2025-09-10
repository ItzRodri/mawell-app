"use client";
import { useState, useMemo, useEffect } from "react";
import apiClient from "@/lib/api";

interface Equipo {
  id: number;
  nombre: string;
  precio?: number;
  descripcion?: string;
  url_portada?: string;
  servicio_id: number;
  servicio?: {
    id: number;
    nombre: string;
    categoria: string;
    descripcion?: string;
  };
}

// Mapeo de categorías de servicios
const serviceTypes = [
  { id: "ALL", name: "Todos los Servicios", color: "bg-gray-600" },
  { id: "MF", name: "Mantenimiento y Filtración", color: "bg-[#0E3855]" },
  { id: "MT", name: "Mantenimiento Técnico", color: "bg-[#2079AB]" },
  { id: "ML", name: "Mantenimiento de Laboratorio", color: "bg-[#1E6B96]" },
  { id: "MQ", name: "Mantenimiento Químico", color: "bg-[#0E3855]" },
  { id: "MB", name: "Mantenimiento de Bombas", color: "bg-[#2079AB]" },
];

export default function EquipmentTypes() {
  const [selectedService, setSelectedService] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentData, setEquipmentData] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const equiposData = await apiClient.getEquipos();
      setEquipmentData(equiposData);
    } catch (error) {
      console.error("Error cargando equipos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipment = useMemo(() => {
    return equipmentData.filter((equipment) => {
      const matchesService =
        selectedService === "ALL" ||
        equipment.servicio?.categoria === selectedService;
      const matchesSearch =
        equipment.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.descripcion
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        equipment.servicio?.nombre
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesService && matchesSearch;
    });
  }, [equipmentData, selectedService, searchTerm]);

  const handleWhatsAppContact = (equipment: Equipo) => {
    const message = `Hola! Estoy interesado en el equipo:\n\n*${
      equipment.nombre
    }*\nServicio: ${equipment.servicio?.nombre}\nPrecio: $${
      equipment.precio?.toLocaleString() || "Consultar"
    }\n\nMe gustaría recibir más información sobre este equipo y una cotización.\n\n¡Gracias!`;
    const whatsappUrl = `https://wa.me/59177824274?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando equipos...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Catálogo de Equipos Industriales
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descubre nuestra amplia gama de equipos especializados para cada
            tipo de mantenimiento industrial
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar equipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 ring-1 ring-gray-300 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
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
      </section>

      {/* Equipment Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Results Info */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedService === "ALL"
                ? "Todos los Equipos"
                : serviceTypes.find((s) => s.id === selectedService)?.name}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredEquipment.length} equipo
              {filteredEquipment.length !== 1 ? "s" : ""} encontrado
              {filteredEquipment.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Equipment Cards */}
          {filteredEquipment.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron equipos
              </h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipment.map((equipment) => (
                <div
                  key={equipment.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group"
                >
                  {/* Equipment Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img
                      src={getImageUrl(equipment.url_portada)}
                      alt={equipment.nombre}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Service Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                          serviceTypes.find(
                            (s) => s.id === equipment.servicio?.categoria
                          )?.color || "bg-gray-600"
                        }`}
                      >
                        {equipment.servicio?.categoria}
                      </span>
                    </div>
                    {/* Price Tag */}
                    {equipment.precio && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ${equipment.precio.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Equipment Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#2079AB] transition-colors">
                      {equipment.nombre}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                      {equipment.servicio?.nombre}
                    </p>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {equipment.descripcion
                        ? equipment.descripcion.length > 120
                          ? `${equipment.descripcion.substring(0, 120)}...`
                          : equipment.descripcion
                        : "Descripción no disponible"}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWhatsAppContact(equipment)}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        Consultar
                      </button>
                      <button className="px-4 py-2 border-2 border-[#2079AB] text-[#2079AB] rounded-lg font-semibold hover:bg-[#2079AB] hover:text-white transition-all duration-300">
                        Ver Más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-[#2079AB] to-[#0E3855] py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿No encuentras el equipo que necesitas?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de especialistas puede ayudarte a encontrar la
            solución perfecta para tus necesidades industriales
          </p>
          <button
            onClick={() => {
              window.location.href = "/pages/about-us#contact-form";
            }}
            className="bg-white text-[#2079AB] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Contactar Especialista
          </button>
        </div>
      </section>
    </main>
  );
}
