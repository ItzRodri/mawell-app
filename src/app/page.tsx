import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <video
        className=" top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/mawellvideportada.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <Footer />
    </>
  );
}
