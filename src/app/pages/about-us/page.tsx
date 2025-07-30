export default function AboutUs() {
  return (
    <>
      {/* Sección "¿Quiénes somos?" */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Texto */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                ¿Quiénes somos?
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Somos una empresa líder en Bolivia, presente en el mercado nacional desde el 2002.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded shadow-md transition">
                Contáctanos
              </button>
            </div>

            {/* Imagen */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="/about-us/about-us-portada.svg"
                alt="Camiones"
                className="w-full max-w-md lg:max-w-lg h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Nosotros" */}
      <section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">NOSOTROS</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Contribuimos aportando valor agregado con soluciones innovadoras y sostenibles para nuestros clientes de los diversos rubros.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* OBJETIVO */}
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
              <img
                src="/about-us/objetivo.svg"
                alt="Objetivo"
                className="w-full h-28 object-contain mb-4"
              />
              <h3 className="text-lg font-bold mb-2">OBJETIVO</h3>
              <p className="text-sm">
                Ayudar a nuestros clientes a obtener un rendimiento óptimo y los mejores resultados en sus equipos y procesos.
              </p>
            </div>

            {/* MISIÓN */}
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
              <img
                src="/about-us/mision.svg"
                alt="Misión"
                className="w-full h-28 object-contain mb-4"
              />
              <h3 className="text-lg font-bold mb-2">MISIÓN</h3>
              <p className="text-sm">
                Mantener una relación de confianza y fidelidad con nuestros clientes brindando soluciones integrales.
              </p>
            </div>

            {/* ODS */}
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
              <img
                src="/about-us/impacto.svg"
                alt="ODS"
                className="w-full h-28 object-contain mb-4"
              />
              <h3 className="text-base font-bold mb-2">Alineados al pacto mundial con los ODS</h3>
              <p className="text-sm">
                Trabajar, decidir y actuar de forma ética para cumplir los objetivos globales de los ODS.
              </p>
            </div>

            {/* VISIÓN */}
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
              <img
                src="/about-us/vision.svg"
                alt="Visión"
                className="w-full h-28 object-contain mb-4"
              />
              <h3 className="text-lg font-bold mb-2">VISIÓN</h3>
              <p className="text-sm">
                Alcanzar la satisfacción de nuestros clientes mediante la calidad de los servicios y productos que brindamos.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Sección "Contáctanos" */}
<section className="bg-gradient-to-b from-[#2079AB] to-[#0E3855] py-20">
  <div className="container mx-auto px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Izquierda: Imagen + Mapa */}
      <div className="w-full lg:w-1/2  flex  items-center align-center justify-center">
        <img
          src="/about-us/about-us.jpg" // Usa el mapa del diseño
          alt="Mapa ubicación"
          className="rounded-xl w-full max-w-sm"
        />
      </div>

      {/* Derecha: Formulario */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contáctanos</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nombre/Empresa</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono/celular</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Departamento</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
            <textarea
              
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  );
}
