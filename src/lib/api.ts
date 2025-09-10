// API Client para conectar con el backend FastAPI
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mawell-backend-fastapi-1.onrender.com";

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  user_name: string;
  user_email: string;
  user_role: number;
  expires_in: number;
}

interface User {
  id: number;
  nombre_completo: string;
  correo: string;
  rol_id: number;
}

interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  descripcion?: string;
  url_portada?: string;
  garantia?: string;
  usuario_id: number;
  equipos?: Equipo[];
}

interface Equipo {
  id: number;
  nombre: string;
  precio?: number;
  descripcion?: string;
  url_portada?: string;
  servicio_id: number;
  servicio?: Servicio;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Cargar token del localStorage si existe
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("access_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    let headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado o inválido
        this.clearAuth();
        throw new Error(
          "Sesión expirada. Por favor, inicia sesión nuevamente."
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error: ${response.status}`);
    }

    return response.json();
  }

  // Autenticación
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        correo: email,
        password: password,
      }),
    });

    this.token = response.access_token;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: response.user_id,
          name: response.user_name,
          email: response.user_email,
          role: response.user_role,
        })
      );
    }

    return response;
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>("/auth/me");
  }

  async checkAdminAccess(): Promise<{
    is_admin: boolean;
    user_id: number;
    user_name: string;
    role_id: number;
  }> {
    return this.request("/auth/admin-check");
  }

  clearAuth(): void {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
    }
  }

  logout(): void {
    this.clearAuth();
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getUserData(): {
    id: number;
    name: string;
    email: string;
    role: number;
  } | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Servicios
  async getServicios(): Promise<Servicio[]> {
    return this.request<Servicio[]>("/servicios/");
  }

  async getServicio(id: number): Promise<Servicio> {
    return this.request<Servicio>(`/servicios/${id}`);
  }

  async createServicio(
    servicio: Omit<Servicio, "id" | "usuario_id">
  ): Promise<Servicio> {
    return this.request<Servicio>("/servicios/", {
      method: "POST",
      body: JSON.stringify(servicio),
    });
  }

  async updateServicio(
    id: number,
    servicio: Partial<Servicio>
  ): Promise<Servicio> {
    return this.request<Servicio>(`/servicios/${id}`, {
      method: "PUT",
      body: JSON.stringify(servicio),
    });
  }

  async deleteServicio(id: number): Promise<{ message: string }> {
    return this.request(`/servicios/${id}`, {
      method: "DELETE",
    });
  }

  // Equipos
  async getEquipos(): Promise<Equipo[]> {
    return this.request<Equipo[]>("/servicios/equipos/");
  }

  async getEquipo(id: number): Promise<Equipo> {
    return this.request<Equipo>(`/servicios/equipos/${id}`);
  }

  async getEquiposByServicio(servicioId: number): Promise<Equipo[]> {
    return this.request<Equipo[]>(`/servicios/${servicioId}/equipos`);
  }

  async createEquipo(equipo: Omit<Equipo, "id">): Promise<Equipo> {
    return this.request<Equipo>("/servicios/equipos/", {
      method: "POST",
      body: JSON.stringify(equipo),
    });
  }

  async updateEquipo(id: number, equipo: Partial<Equipo>): Promise<Equipo> {
    return this.request<Equipo>(`/servicios/equipos/${id}`, {
      method: "PUT",
      body: JSON.stringify(equipo),
    });
  }

  async deleteEquipo(id: number): Promise<{ message: string }> {
    return this.request(`/servicios/equipos/${id}`, {
      method: "DELETE",
    });
  }

  // Archivos e imágenes
  async uploadImage(file: File): Promise<{
    message: string;
    filename: string;
    image_url: string;
    thumbnail_url: string;
    size: number;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: HeadersInit = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}/files/upload-image`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearAuth();
        throw new Error(
          "Sesión expirada. Por favor, inicia sesión nuevamente."
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error: ${response.status}`);
    }

    return response.json();
  }

  async listImages(): Promise<{
    images: Array<{
      filename: string;
      image_url: string;
      thumbnail_url: string | null;
      size: number;
      created_at: number;
    }>;
    total: number;
  }> {
    return this.request("/files/images");
  }

  async deleteImage(
    filename: string
  ): Promise<{ message: string; deleted_files: string[] }> {
    return this.request(`/files/images/${filename}`, {
      method: "DELETE",
    });
  }

  // Gestión de usuarios (solo admin)
  async getUsers(): Promise<User[]> {
    return this.request<User[]>("/admin/users");
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/admin/users/${id}`);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.request<User>(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    return this.request(`/admin/users/${id}`, {
      method: "DELETE",
    });
  }

  async createUser(
    user: Omit<User, "id"> & { password: string }
  ): Promise<User> {
    return this.request<User>("/admin/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
  }

  async changeUserRole(id: number, rol_id: number): Promise<User> {
    return this.request<User>(`/admin/users/${id}/role`, {
      method: "PUT",
      body: JSON.stringify({ rol_id }),
    });
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();

// Hooks de utilidad para React
export const useAuth = () => {
  const isAuthenticated = apiClient.isAuthenticated();
  const userData = apiClient.getUserData();

  return {
    isAuthenticated,
    userData,
    login: apiClient.login.bind(apiClient),
    logout: apiClient.logout.bind(apiClient),
    getCurrentUser: apiClient.getCurrentUser.bind(apiClient),
    checkAdminAccess: apiClient.checkAdminAccess.bind(apiClient),
  };
};

export default apiClient;
