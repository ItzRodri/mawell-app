"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import icono1 from "/public/servicios.svg";

const services = [
	{
		id: "mf",
		title: "Mantenimiento y Filtración",
		description:
			"Servicios especializados en mantenimiento y sistemas de filtración industrial.",
		image: "/services/mf-placeholder.jpg",
		link: "/pages/services/mf",
	},
	{
		id: "mt",
		title: "Mantenimiento Técnico",
		description: "Soluciones técnicas avanzadas para equipamiento industrial.",
		image: "/services/mt-placeholder.jpg",
		link: "/pages/services/mt",
	},
	{
		id: "ml",
		title: "Mantenimiento de Laboratorio",
		description: "Servicios especializados para equipos de laboratorio.",
		image: "/services/ml-placeholder.jpg",
		link: "/pages/services/ml",
	},
	{
		id: "mq",
		title: "Mantenimiento de Química",
		description: "Mantenimiento especializado para equipos químicos.",
		image: "/services/mq-placeholder.jpg",
		link: "/pages/services/mq",
	},
	{
		id: "mb",
		title: "Mantenimiento Biológico",
		description: "Servicios para equipamiento biológico y biotecnológico.",
		image: "/services/mb-placeholder.jpg",
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
			{/* Hero: Control y Manejo de Fluidos */}
			<section className="bg-gradient-to-b from-[#0E3855] to-[#2079AB] py-20 text-white relative">
				<div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
					<div className="max-w-xl">
						<h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-40">
							Control y Manejo
							<br />
							de Fluidos
						</h1>
						<p className="text-lg mb-8">
							Soluciones para transferir y controlar (manual o automáticamente)
							fluidos industriales en plantas de procesos productivos. Equipos de
							almacenamiento, impulsión, instrumentación y automatización para
							sistemas de dosificación.
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
				<span className="absolute left-8 top-[50%] text-5xl font-bold opacity-20">
					MF
				</span>
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
						"BMW.svg",
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
							Asesoría personalizada en diseños de sistemas y equipos de
							dosificación. Instalación de sistemas de dosificación portátiles,
							manuales y automáticas para uso industrial, comercial y agrícola.
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

			{/* Hero Slider */}
			<div className="relative h-[70vh] overflow-hidden">
				{services.map((service, index) => (
					<div
						key={service.id}
						className={`absolute w-full h-full transition-opacity duration-1000 ${
							index === currentSlide ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-[#2079AB]/90 to-[#0E3855]/90" />
						<img
							src={service.image}
							alt={service.title}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center text-white p-8 max-w-4xl">
								<h1 className="text-5xl font-bold mb-6">{service.title}</h1>
								<p className="text-xl mb-8">{service.description}</p>
								<button
									onClick={() => router.push(service.link)}
									className="bg-white text-[#2079AB] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold"
								>
									Ver más
								</button>
							</div>
						</div>
					</div>
				))}

				{/* Slider Navigation */}
				<div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
					{services.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-3 h-3 rounded-full transition-colors ${
								index === currentSlide ? "bg-white" : "bg-white/50"
							}`}
						/>
					))}
				</div>
			</div>

			{/* Services Grid */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Nuestros Servicios
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{services.map((service) => (
							<div
								key={service.id}
								className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
							>
								<img
									src={service.image}
									alt={service.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-3">
										{service.title}
									</h3>
									<p className="text-gray-600 mb-4">
										{service.description}
									</p>
									<button
										onClick={() => router.push(service.link)}
										className="text-[#2079AB] font-semibold hover:text-[#0E3855] transition-colors"
									>
										Conocer más →
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
