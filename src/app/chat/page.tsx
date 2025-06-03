"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0E3855] to-[#2079AB]">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Asistente Virtual
        </h2>
        <p className="text-center">Proximamente🤖</p>
      </div>
    </div>
  );
}
