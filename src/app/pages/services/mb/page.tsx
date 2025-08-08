export default function MBService() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section con animación */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2079AB]/90 to-[#0E3855]/90" />
        <img
          src="/services/mb-hero-placeholder.jpg"
          alt="Mantenimiento Biológico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Mantenimiento Biológico
            </h1>
            <p className="text-xl text-white/90 max-w-2xl animate-slide-up">
              Soluciones especializadas para equipamiento biológico y biotecnológico
            </p>
          </div>
        </div>
      </section>

      {/* Características del Servicio */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipos de Laboratorio</h3>
              <p className="text-gray-600">
                Mantenimiento especializado para equipos de laboratorio biológico
              </p>
            </div>
            {/* Añadir más características similares */}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Proceso</h2>
          <div className="relative">
            {/* Línea de tiempo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />
            
            {/* Pasos del proceso */}
            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full" />
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="font-semibold mb-2">Diagnóstico</h3>
                  <p className="text-gray-600">Evaluación completa del equipo</p>
                </div>
              </div>
              {/* Añadir más pasos */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#2079AB] to-[#0E3855] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contáctanos para una consulta personalizada sobre tus necesidades de mantenimiento biológico
          </p>
          <button className="bg-white text-[#2079AB] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
            Solicitar Consulta
          </button>
        </div>
      </section>
    </div>
  );
}