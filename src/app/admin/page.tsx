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
}

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"servicios" | "equipos">(
    "servicios"
  );

  // Estados para servicios
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);
  const [showServicioForm, setShowServicioForm] = useState(false);
  const [servicioImageUrl, setServicioImageUrl] = useState<string>("");

  // Estados para equipos
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [editingEquipo, setEditingEquipo] = useState<Equipo | null>(null);
  const [showEquipoForm, setShowEquipoForm] = useState(false);
  const [equipoImageUrl, setEquipoImageUrl] = useState<string>("");

  useEffect(() => {
    checkAuth();
  }, []);

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
      const [serviciosData, equiposData] = await Promise.all([
        apiClient.getServicios(),
        apiClient.getEquipos(),
      ]);
      setServicios(serviciosData);
      setEquipos(equiposData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleCreateServicio = async (formData: FormData) => {
    try {
      const servicioData = {
        nombre: formData.get("nombre") as string,
        categoria: formData.get("categoria") as string,
        descripcion: formData.get("descripcion") as string,
        url_portada:
          servicioImageUrl || (formData.get("url_portada") as string),
        garantia: formData.get("garantia") as string,
      };

      await apiClient.createServicio(servicioData);
      await loadData();
      setShowServicioForm(false);
      setServicioImageUrl("");
      alert("Servicio creado exitosamente");
    } catch (error) {
      console.error("Error creando servicio:", error);
      alert("Error creando servicio");
    }
  };

  const handleUpdateServicio = async (formData: FormData) => {
    if (!editingServicio) return;

    try {
      const servicioData = {
        nombre: formData.get("nombre") as string,
        categoria: formData.get("categoria") as string,
        descripcion: formData.get("descripcion") as string,
        url_portada:
          servicioImageUrl || (formData.get("url_portada") as string),
        garantia: formData.get("garantia") as string,
      };

      await apiClient.updateServicio(editingServicio.id, servicioData);
      await loadData();
      setEditingServicio(null);
      setServicioImageUrl("");
      alert("Servicio actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando servicio:", error);
      alert("Error actualizando servicio");
    }
  };

  const handleDeleteServicio = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este servicio?"))
      return;

    try {
      await apiClient.deleteServicio(id);
      await loadData();
      alert("Servicio eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando servicio:", error);
      alert("Error eliminando servicio");
    }
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

  const logout = () => {
    apiClient.logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
          <p className="text-gray-600 mt-2">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración - Mawell
            </h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("servicios")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "servicios"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Servicios ({servicios.length})
            </button>
            <button
              onClick={() => setActiveTab("equipos")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "equipos"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Equipos ({equipos.length})
            </button>
          </nav>
        </div>

        {/* Servicios Tab */}
        {activeTab === "servicios" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Servicios
              </h2>
              <button
                onClick={() => setShowServicioForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Nuevo Servicio
              </button>
            </div>

            {/* Lista de Servicios */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {servicios.map((servicio) => (
                  <li key={servicio.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {servicio.nombre}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Categoría: {servicio.categoria}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {servicio.descripcion}
                        </p>
                        <p className="text-sm text-gray-500">
                          Garantía: {servicio.garantia}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingServicio(servicio);
                            setServicioImageUrl(servicio.url_portada || "");
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteServicio(servicio.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Equipos Tab */}
        {activeTab === "equipos" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Equipos
              </h2>
              <button
                onClick={() => setShowEquipoForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Nuevo Equipo
              </button>
            </div>

            {/* Lista de Equipos */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {equipos.map((equipo) => (
                  <li key={equipo.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {equipo.nombre}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Precio: $
                          {equipo.precio?.toLocaleString() || "No especificado"}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {equipo.descripcion}
                        </p>
                        <p className="text-sm text-gray-500">
                          Servicio ID: {equipo.servicio_id}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingEquipo(equipo);
                            setEquipoImageUrl(equipo.url_portada || "");
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteEquipo(equipo.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Modal para crear/editar servicios */}
      {(showServicioForm || editingServicio) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">
              {editingServicio ? "Editar Servicio" : "Nuevo Servicio"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                if (editingServicio) {
                  handleUpdateServicio(formData);
                } else {
                  handleCreateServicio(formData);
                }
              }}
              className="space-y-4"
            >
              <input
                name="nombre"
                type="text"
                placeholder="Nombre del servicio"
                defaultValue={editingServicio?.nombre || ""}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="categoria"
                type="text"
                placeholder="Categoría (ej: MF, MT, ML)"
                defaultValue={editingServicio?.categoria || ""}
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                defaultValue={editingServicio?.descripcion || ""}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
              <ImageUpload
                onImageUploaded={(url) => setServicioImageUrl(url)}
                currentImageUrl={editingServicio?.url_portada}
              />
              <input
                name="url_portada"
                type="hidden"
                value={servicioImageUrl || editingServicio?.url_portada || ""}
              />
              <input
                name="garantia"
                type="text"
                placeholder="Garantía"
                defaultValue={editingServicio?.garantia || ""}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {editingServicio ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowServicioForm(false);
                    setEditingServicio(null);
                    setServicioImageUrl("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear/editar equipos */}
      {(showEquipoForm || editingEquipo) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">
              {editingEquipo ? "Editar Equipo" : "Nuevo Equipo"}
            </h3>
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
              className="space-y-4"
            >
              <input
                name="nombre"
                type="text"
                placeholder="Nombre del equipo"
                defaultValue={editingEquipo?.nombre || ""}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="precio"
                type="number"
                step="0.01"
                placeholder="Precio"
                defaultValue={editingEquipo?.precio || ""}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                defaultValue={editingEquipo?.descripcion || ""}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
              <ImageUpload
                onImageUploaded={(url) => setEquipoImageUrl(url)}
                currentImageUrl={editingEquipo?.url_portada}
              />
              <input
                name="url_portada"
                type="hidden"
                value={equipoImageUrl || editingEquipo?.url_portada || ""}
              />
              <select
                name="servicio_id"
                defaultValue={editingEquipo?.servicio_id || ""}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Seleccionar servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre} ({servicio.categoria})
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {editingEquipo ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEquipoForm(false);
                    setEditingEquipo(null);
                    setEquipoImageUrl("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
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
