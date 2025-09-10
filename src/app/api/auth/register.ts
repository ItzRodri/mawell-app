import { User } from "@/app/models/User";

export async function registerUser(
  nombre: string,
  correo: string,
  contraseña: string,
  rol_id: number
): Promise<User> {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contraseña, rol_id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error en el registro");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error en el registro";
    throw new Error(message);
  }
}
