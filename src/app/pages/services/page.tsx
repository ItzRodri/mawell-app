import Image from "next/image";
import icono1 from "/public/servicios.svg";
export default function Services() {
  return (
    <main className="bg-white">

      {/* Hero: Control y Manejo de Fluidos */}
      <section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] py-20 text-white relative">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-40">
              Control y Manejo<br />de Fluidos
            </h1>
            <p className="text-lg mb-8">
              Soluciones para transferir y controlar (manual o automáticamente) fluidos industriales en plantas de procesos productivos. Equipos de almacenamiento, impulsión, instrumentación y automatización para sistemas de dosificación.
            </p>
            <button className="bg-white text-[#0E3855] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Ver Más
            </button>
          </div>
          <img
            src="/services/tesla.svg"
            alt="Renault"
            className="w-48 lg:w-64 mt-12 lg:mt-0"
          />
        </div>
        <span className="absolute left-8 top-[50%] text-5xl font-bold opacity-20">MF</span>
      </section>

      {/* Representaciones */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-2xl font-semibold mb-8">REPRESENTACIONES</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {/* Logos — asegúrate que existan en public/services/ */}
          {[
            "BMW.svg",
            "BMW.svg",
            "BMW.svg",
            "tesla.svg",
            "lamborghini.svg",
            "BMW.svg"
          ].map((src, i) => (
            <img
              key={i}
              src={`/services/${src}`}
              alt={`Marca ${i + 1}`}
              className="h-12 md:h-16 object-contain"
            />
          ))}
        </div>
      </section>

      {/* Asesoramiento */}
      <section className="bg-gradient-to-b from-[#2079AB] to-[#0E3855] py-20 text-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-6">ASESORAMIENTO</h3>
            <p className="text-lg leading-relaxed">
              Asesoría personalizada en diseños de sistemas y equipos de dosificación.
              Instalación de sistemas de dosificación portátiles, manuales y automáticas para uso industrial, comercial y agrícola.
              Respaldo técnico con personal altamente calificado.
            </p>
          </div>
          
            <>
              
            <Image
              src={icono1}
              alt="Edificios"
              width={300}
              height={300}
              className="object-contain"
            />
    
            </>
        
        </div>
      </section>
    </main>
  );
}
