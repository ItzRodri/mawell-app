export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        className="  w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/mawellvideportada.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Capa de contenido encima del video */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
        <div className="bg-[#0071A7]/90 text-white p-6 rounded-md max-w-md">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            Ingeniería, Laboratorio,
          </h1>
          <p className="text-sm md:text-base">
            Especialidades Químicas y Biológicas
          </p>
        </div>
      </div>
    </div>
  );
}
