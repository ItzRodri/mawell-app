import Image from "next/image";
import edificiosImg from "/public/edificios.svg";
import icono1 from "/public/servicios.svg";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* Sección Video */}
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/oficialvideo.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        <div className="absolute top-1/2 left-0 w-2/6 h-60 bg-gradient-to-r from-[#2079AB] to-[#0E3855] backdrop-blur-sm transform -translate-y-1/2">
          <div className="h-full flex items-center justify-center px-6">
            <div className="text-white">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Ingeniería, Laboratorio,
              </h1>
              <p className="text-sm md:text-base">
                Especialidades Químicas y Biológicas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Quiénes Somos */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Quiénes Somos?
            </h2>
            <p className="text-base md:text-lg mb-6">
              SOMOS UNA EMPRESA LÍDER EN BOLIVIA, PRESENTE EN EL MERCADO
              NACIONAL DESDE EL 2002.
            </p>
            <Image
              src={edificiosImg}
              alt="Edificios"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start">
            <p className="text-base md:text-lg mb-6">
              Contribuimos aportando valor agregado con soluciones innovadoras y
              sostenibles para nuestros clientes de los diversos rubros.
            </p>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md transition duration-300">
              Saber Más
            </button>
          </div>
        </div>
      </section>

      {/* Sección Nuestros Servicios */}
      <section className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] py-40 px-6 md:px-20 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-60 items-center">
          {/* Texto a la izquierda */}
          <div className="flex-1">
            <h3 className="uppercase tracking-widest text-sm mb-2">
              Nuestros Servicios
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Soluciones integrales para la gestión del agua, procesos
              industriales y sostenibilidad
            </h2>
            <p className="text-base md:text-lg mb-6">
              En Mawell, transformamos los desafíos de la industria, el medio
              ambiente y la agricultura con líneas especializadas que integran
              innovación, tecnología y sostenibilidad.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
              Ver los servicios
            </button>
          </div>

          {/* Íconos a la derecha */}
          <div className="">
            <Image
              src={icono1}
              alt="Edificios"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
