"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import ImageUpload from "@/components/ImageUpload";

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

interface User {
  id: number;
  nombre_completo: string;
  correo: string;
  rol_id: number;
  created_at?: string;
}

type SortOption = "nombre" | "precio" | "servicio" | "fecha";
type FilterOption = "todos" | number;

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados principales
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filteredEquipos, setFilteredEquipos] = useState<Equipo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Estados de filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<FilterOption>("todos");
  const [sortBy, setSortBy] = useState<SortOption>("nombre");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Estados del formulario - equipos
  const [editingEquipo, setEditingEquipo] = useState<Equipo | null>(null);
  const [showEquipoForm, setShowEquipoForm] = useState(false);
  const [equipoImageUrl, setEquipoImageUrl] = useState<string>("");

  // Estados del formulario - usuarios
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  // Estados de vista
  const [activeTab, setActiveTab] = useState<"equipos" | "usuarios">("equipos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (activeTab === "equipos") {
      filterAndSortEquipos();
    } else {
      filterAndSortUsers();
    }
  }, [
    equipos,
    users,
    searchTerm,
    selectedService,
    sortBy,
    sortOrder,
    priceRange,
    activeTab,
  ]);

  const checkAuth = async () => {
    try {
      if (!apiClient.isAuthenticated()) {
        router.push("/login");
        return;
      }

      const adminCheck = await apiClient.checkAdminAccess();
      if (!adminCheck.is_admin) {
        alert("Acceso denegado. Se requieren permisos de administrador.");
        router.push("/");
        return;
      }

      setIsAdmin(true);
      await loadData();
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [serviciosData, equiposData, usersData] = await Promise.all([
        apiClient.getServicios(),
        apiClient.getEquipos(),
        apiClient.getUsers(),
      ]);

      // Enriquecer equipos con información del servicio
      const equiposEnriquecidos = equiposData.map((equipo) => ({
        ...equipo,
        servicio: serviciosData.find((s) => s.id === equipo.servicio_id),
      }));

      setServicios(serviciosData);
      setEquipos(equiposEnriquecidos);
      setUsers(usersData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const filterAndSortEquipos = () => {
    let filtered = [...equipos];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (equipo) =>
          equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipo.descripcion
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          equipo.servicio?.nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por servicio
    if (selectedService !== "todos") {
      filtered = filtered.filter(
        (equipo) => equipo.servicio_id === selectedService
      );
    }

    // Filtrar por precio
    filtered = filtered.filter((equipo) => {
      const precio = equipo.precio || 0;
      return precio >= priceRange.min && precio <= priceRange.max;
    });

    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "nombre":
          comparison = a.nombre.localeCompare(b.nombre);
          break;
        case "precio":
          comparison = (a.precio || 0) - (b.precio || 0);
          break;
        case "servicio":
          comparison = (a.servicio?.nombre || "").localeCompare(
            b.servicio?.nombre || ""
          );
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredEquipos(filtered);
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.nombre_completo
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.correo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "nombre":
          comparison = a.nombre_completo.localeCompare(b.nombre_completo);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredUsers(filtered);
  };

  const handleCreateEquipo = async (formData: FormData) => {
    try {
      const equipoData = {
        nombre: formData.get("nombre") as string,
        precio: parseFloat(formData.get("precio") as string) || 0,
        descripcion: formData.get("descripcion") as string,
        url_portada: equipoImageUrl || (formData.get("url_portada") as string),
        servicio_id: parseInt(formData.get("servicio_id") as string),
      };

      await apiClient.createEquipo(equipoData);
      await loadData();
      setShowEquipoForm(false);
      setEquipoImageUrl("");
      alert("Equipo creado exitosamente");
    } catch (error) {
      console.error("Error creando equipo:", error);
      alert("Error creando equipo");
    }
  };

  const handleUpdateEquipo = async (formData: FormData) => {
    if (!editingEquipo) return;

    try {
      const equipoData = {
        nombre: formData.get("nombre") as string,
        precio: parseFloat(formData.get("precio") as string) || 0,
        descripcion: formData.get("descripcion") as string,
        url_portada: equipoImageUrl || (formData.get("url_portada") as string),
        servicio_id: parseInt(formData.get("servicio_id") as string),
      };

      await apiClient.updateEquipo(editingEquipo.id, equipoData);
      await loadData();
      setEditingEquipo(null);
      setEquipoImageUrl("");
      alert("Equipo actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando equipo:", error);
      alert("Error actualizando equipo");
    }
  };

  const handleDeleteEquipo = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este equipo?")) return;

    try {
      await apiClient.deleteEquipo(id);
      await loadData();
      alert("Equipo eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando equipo:", error);
      alert("Error eliminando equipo");
    }
  };

  // Funciones CRUD para usuarios
  const handleCreateUser = async (formData: FormData) => {
    try {
      const userData = {
        nombre_completo: formData.get("nombre_completo") as string,
        correo: formData.get("correo") as string,
        password: formData.get("password") as string,
        rol_id: parseInt(formData.get("rol_id") as string),
      };

      await apiClient.createUser(userData);
      await loadData();
      setShowUserForm(false);
      alert("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error creando usuario:", error);
      alert("Error creando usuario");
    }
  };

  const handleUpdateUser = async (formData: FormData) => {
    if (!editingUser) return;

    try {
      const userData: Partial<User> & { password?: string } = {
        nombre_completo: formData.get("nombre_completo") as string,
        correo: formData.get("correo") as string,
        rol_id: parseInt(formData.get("rol_id") as string),
      };

      // Solo incluir password si se proporcionó
      const password = formData.get("password") as string;
      if (password) {
        userData.password = password;
      }

      await apiClient.updateUser(editingUser.id, userData);
      await loadData();
      setEditingUser(null);
      alert("Usuario actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      alert("Error actualizando usuario");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    try {
      await apiClient.deleteUser(id);
      await loadData();
      alert("Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Error eliminando usuario");
    }
  };

  const handleChangeUserRole = async (userId: number, newRoleId: number) => {
    try {
      await apiClient.changeUserRole(userId, newRoleId);
      await loadData();
      alert("Rol de usuario actualizado exitosamente");
    } catch (error) {
      console.error("Error cambiando rol:", error);
      alert("Error cambiando rol de usuario");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedService("todos");
    setSortBy("nombre");
    setSortOrder("asc");
    setPriceRange({ min: 0, max: 100000 });
  };

  const logout = () => {
    apiClient.logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E3855] via-[#2079AB] to-[#1E6B96]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="mt-4 text-white text-lg">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E3855] via-[#2079AB] to-[#1E6B96]">
        <div className="text-center bg-white rounded-2xl p-8 shadow-2xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Acceso Denegado
          </h1>
          <p className="text-gray-600">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header mejorado */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0E3855] to-[#2079AB] rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Panel de Equipos
                </h1>
                <p className="text-sm text-gray-600">
                  Gestión de equipos por servicio - MAWELL S.R.L
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("equipos")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "equipos"
                  ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                />
              </svg>
              Gestión de Equipos
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {equipos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("usuarios")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "usuarios"
                  ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Gestión de Usuarios
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {users.length}
              </span>
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {activeTab === "equipos" ? (
            <>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Equipos
                    </p>
                    <p className="text-3xl font-bold text-[#0E3855]">
                      {equipos.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Servicios Activos
                    </p>
                    <p className="text-3xl font-bold text-[#2079AB]">
                      {servicios.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Filtrados
                    </p>
                    <p className="text-3xl font-bold text-[#1E6B96]">
                      {filteredEquipos.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {filteredEquipos
                        .reduce((sum, eq) => sum + (eq.precio || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Usuarios
                    </p>
                    <p className="text-3xl font-bold text-[#0E3855]">
                      {users.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Administradores
                    </p>
                    <p className="text-3xl font-bold text-[#2079AB]">
                      {users.filter((u) => u.rol_id === 1).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Usuarios Regulares
                    </p>
                    <p className="text-3xl font-bold text-[#1E6B96]">
                      {users.filter((u) => u.rol_id === 2).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Filtrados
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {filteredUsers.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Barra de herramientas */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Búsqueda */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar equipos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  showFilters
                    ? "bg-[#0E3855] text-white border-[#0E3855]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filtros
              </button>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-l-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-[#2079AB] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-r-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-[#2079AB] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={() =>
                  activeTab === "equipos"
                    ? setShowEquipoForm(true)
                    : setShowUserForm(true)
                }
                className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white px-6 py-2 rounded-lg hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {activeTab === "equipos" ? "Nuevo Equipo" : "Nuevo Usuario"}
              </button>
            </div>
          </div>

          {/* Panel de filtros expandible */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filtro por servicio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servicio
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) =>
                      setSelectedService(
                        e.target.value === "todos"
                          ? "todos"
                          : parseInt(e.target.value)
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  >
                    <option value="todos">Todos los servicios</option>
                    {servicios.map((servicio) => (
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.nombre} ({servicio.categoria})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ordenar por */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  >
                    <option value="nombre">Nombre</option>
                    <option value="precio">Precio</option>
                    <option value="servicio">Servicio</option>
                  </select>
                </div>

                {/* Orden */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orden
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as "asc" | "desc")
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent"
                  >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </div>

                {/* Rango de precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio máximo
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>${priceRange.max.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contenido principal por tabs */}
        {activeTab === "equipos" ? (
          /* Lista/Grid de equipos */
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEquipos.map((equipo) => (
                  <div
                    key={equipo.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Imagen */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                      {equipo.url_portada ? (
                        <img
                          src={equipo.url_portada}
                          alt={equipo.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#0E3855] text-white px-2 py-1 rounded-full text-xs font-medium">
                          {equipo.servicio?.categoria}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#0E3855] transition-colors">
                          {equipo.nombre}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {equipo.descripcion || "Sin descripción"}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-[#2079AB]">
                          ${equipo.precio?.toLocaleString() || "N/A"}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        <span className="inline-flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          {equipo.servicio?.nombre}
                        </span>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingEquipo(equipo);
                            setEquipoImageUrl(equipo.url_portada || "");
                          }}
                          className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteEquipo(equipo.id)}
                          className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Vista de lista */
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Equipo
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Servicio
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descripción
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredEquipos.map((equipo) => (
                        <tr
                          key={equipo.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 mr-4">
                                {equipo.url_portada ? (
                                  <img
                                    src={equipo.url_portada}
                                    alt={equipo.nombre}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <svg
                                      className="w-6 h-6 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {equipo.nombre}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ID: {equipo.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0E3855] text-white">
                                {equipo.servicio?.categoria}
                              </span>
                              <span className="ml-2 text-sm text-gray-600">
                                {equipo.servicio?.nombre}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-semibold text-[#2079AB]">
                              ${equipo.precio?.toLocaleString() || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 max-w-xs truncate">
                              {equipo.descripcion || "Sin descripción"}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingEquipo(equipo);
                                  setEquipoImageUrl(equipo.url_portada || "");
                                }}
                                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteEquipo(equipo.id)}
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Mensaje cuando no hay equipos */}
            {filteredEquipos.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron equipos
                </h3>
                <p className="text-gray-600 mb-4">
                  Intenta ajustar los filtros o agregar nuevos equipos.
                </p>
                <button
                  onClick={() => setShowEquipoForm(true)}
                  className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white px-6 py-2 rounded-lg hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300"
                >
                  Agregar Primer Equipo
                </button>
              </div>
            )}
          </>
        ) : (
          /* Sección de gestión de usuarios */
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Registro
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0E3855] to-[#2079AB] rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-sm">
                              {user.nombre_completo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.nombre_completo}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {user.correo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.rol_id}
                          onChange={(e) =>
                            handleChangeUserRole(
                              user.id,
                              parseInt(e.target.value)
                            )
                          }
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${
                            user.rol_id === 1
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          <option value={1}>Administrador</option>
                          <option value={2}>Usuario</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mensaje cuando no hay usuarios */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron usuarios
                </h3>
                <p className="text-gray-600 mb-4">
                  Intenta ajustar los filtros o agregar nuevos usuarios.
                </p>
                <button
                  onClick={() => setShowUserForm(true)}
                  className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white px-6 py-2 rounded-lg hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300"
                >
                  Agregar Primer Usuario
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para crear/editar equipos */}
      {(showEquipoForm || editingEquipo) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingEquipo ? "Editar Equipo" : "Nuevo Equipo"}
              </h3>
              <button
                onClick={() => {
                  setShowEquipoForm(false);
                  setEditingEquipo(null);
                  setEquipoImageUrl("");
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                if (editingEquipo) {
                  handleUpdateEquipo(formData);
                } else {
                  handleCreateEquipo(formData);
                }
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del equipo *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    placeholder="Ej: Bomba Centrífuga Industrial"
                    defaultValue={editingEquipo?.nombre || ""}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio (USD)
                  </label>
                  <input
                    name="precio"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    defaultValue={editingEquipo?.precio || ""}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio *
                </label>
                <select
                  name="servicio_id"
                  defaultValue={editingEquipo?.servicio_id || ""}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Seleccionar servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre} ({servicio.categoria})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  placeholder="Descripción detallada del equipo, especificaciones técnicas, características principales..."
                  defaultValue={editingEquipo?.descripcion || ""}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del equipo
                </label>
                <ImageUpload
                  onImageUploaded={(url) => setEquipoImageUrl(url)}
                  currentImageUrl={editingEquipo?.url_portada}
                />
                <input
                  name="url_portada"
                  type="hidden"
                  value={equipoImageUrl || editingEquipo?.url_portada || ""}
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white py-3 rounded-lg font-semibold hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 shadow-lg"
                >
                  {editingEquipo ? "Actualizar Equipo" : "Crear Equipo"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEquipoForm(false);
                    setEditingEquipo(null);
                    setEquipoImageUrl("");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear/editar usuarios */}
      {(showUserForm || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
              </h3>
              <button
                onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                if (editingUser) {
                  handleUpdateUser(formData);
                } else {
                  handleCreateUser(formData);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  name="nombre_completo"
                  type="text"
                  placeholder="Ej: Juan Carlos Pérez"
                  defaultValue={editingUser?.nombre_completo || ""}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  name="correo"
                  type="email"
                  placeholder="usuario@empresa.com"
                  defaultValue={editingUser?.correo || ""}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña{" "}
                  {editingUser ? "(dejar vacío para mantener actual)" : "*"}
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder={
                    editingUser ? "Nueva contraseña (opcional)" : "Contraseña"
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  name="rol_id"
                  defaultValue={editingUser?.rol_id || "2"}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2079AB] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="2">Usuario Regular</option>
                  <option value="1">Administrador</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white py-3 rounded-lg font-semibold hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 shadow-lg"
                >
                  {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserForm(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
