// src/app/api/auth/login.ts

// removed unused import

export interface LoginResponse {
  message: string;
  usuario_id: number;
}

export async function loginUser(
  correo: string,
  contraseña: string
): Promise<LoginResponse> {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error en el login");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error en el login";
    throw new Error(message);
  }
}
