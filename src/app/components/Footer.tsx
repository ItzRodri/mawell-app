"use client";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="bg-gradient-to-br from-[#0E3855] via-[#1A4B6B] to-black text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2079AB] via-yellow-300 to-[#0E3855]"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Sección Principal Compacta */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo y Info Básica */}
          <div>
            <img
              src="/mawell-icon.svg"
              alt="MAWELL S.R.L"
              className="w-32 h-auto mb-3 filter brightness-0 invert"
            />
            <p className="text-gray-300 text-sm mb-4">
              Líderes en soluciones industriales desde 2002.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-400">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400">Soporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavigation("/pages/about-us")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleNavigation("/pages/services")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left"
              >
                Servicios
              </button>
              <button
                onClick={() => handleNavigation("/pages/equipment-types")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left"
              >
                Equipos
              </button>
              <button
                onClick={() => handleNavigation("/pages/services/mf")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left text-xs"
              >
                MF
              </button>
              <button
                onClick={() => handleNavigation("/pages/services/mt")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left text-xs"
              >
                MT
              </button>
              <button
                onClick={() => handleNavigation("/pages/services/ml")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left text-xs"
              >
                ML
              </button>
              <button
                onClick={() => handleNavigation("/pages/services/mq")}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-left text-xs"
              >
                MQ
              </button>
            </div>
          </div>

          {/* Contacto y Redes */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-300 text-sm">Santa Cruz, Bolivia</p>
              <a
                href="https://wa.me/59162200930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors text-sm flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515" />
                </svg>
                +591 62200930
              </a>
              <a
                href="mailto:contacto@mawell.com.bo"
                className="text-[#2079AB] hover:text-blue-300 transition-colors text-sm block"
              >
                contacto@mawell.com.bo
              </a>
            </div>

            {/* Redes Sociales Compactas */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria compacta */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            {/* Copyright compacto */}
            <p className="text-gray-400 text-center sm:text-left">
              © {currentYear}{" "}
              <span className="text-white font-semibold">MAWELL S.R.L.</span> -
              Todos los derechos reservados.
            </p>

            {/* CTAs compactos */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/59162200930"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515" />
                </svg>
                WhatsApp
              </a>
              <button
                onClick={() => handleNavigation("/pages/services")}
                className="border border-white/30 hover:bg-white hover:text-[#0E3855] text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300"
              >
                Cotizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
