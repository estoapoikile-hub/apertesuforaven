export type Rol = "super_admin" | "seccional" | "socio";

export type Seccional =
  | "Mérida"
  | "Zulia"
  | "Táchira"
  | "Trujillo"
  | "Barinas"
  | "Portuguesa"
  | "Bolívar"
  | "Amazonas"
  | "Monagas"
  | "Capital";

export type Socio = {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  seccional: Seccional;
  promocion: number;
  especialidad: string;
  activo: boolean;
};
