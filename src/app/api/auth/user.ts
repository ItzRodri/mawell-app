import { NextResponse } from "next/server";

export async function GET() {
  // 🔐 Aquí podrías devolver los datos del usuario autenticado
  const user = {
    id: 1,
    name: "John Doe",
    email: "admin@example.com",
  };
  return NextResponse.json(user);
}
