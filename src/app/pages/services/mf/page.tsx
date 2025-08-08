export default function MFService() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2079AB] to-[#0E3855] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Mantenimiento y Filtración</h1>
          <p className="text-xl mb-8">
            Servicios especializados en mantenimiento y sistemas de filtración para equipos industriales
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Descripción del Servicio */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Mantenimiento preventivo y correctivo
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sistemas de filtración avanzados
              </li>
              {/* Añade más servicios según necesites */}
            </ul>
          </div>

          {/* Imagen o Ilustración */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="/services/MF-service.jpg" // Asegúrate de tener esta imagen
              alt="Mantenimiento y Filtración"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">¿Necesitas este servicio?</h2>
          <div className="text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}