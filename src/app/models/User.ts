export interface Rol {
  id: number;
  nombre: string;
}

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol_id: number;
  rol?: Rol;
}
