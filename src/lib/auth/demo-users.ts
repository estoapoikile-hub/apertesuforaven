import type { Rol, Seccional } from "@/lib/types";

/**
 * Cuentas de prueba para visualizar cada nivel de acceso.
 * Son datos de demostración: se reemplazarán por Supabase Auth.
 */
export type DemoUser = {
  id: string;
  email: string;
  password: string;
  rol: Rol;
  nombre: string;
  cargo: string;
  iniciales: string;
  /** Título profesional que se muestra en el carné. */
  titulo?: string;
  seccional?: Seccional;
  socioId?: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: "u-admin",
    email: "admin@apertesuforaven.com",
    password: "Admin2026!",
    rol: "super_admin",
    nombre: "Ramón Briceño",
    cargo: "Presidente · Dirección Nacional",
    iniciales: "RB",
  },
  {
    id: "u-seccional",
    email: "barinas@apertesuforaven.com",
    password: "Barinas2026!",
    rol: "seccional",
    nombre: "Gloria Contreras",
    cargo: "Presidenta · Seccional Barinas",
    iniciales: "GC",
    seccional: "Barinas",
  },
  {
    id: "u-socio",
    email: "socio@apertesuforaven.com",
    password: "Socio2026!",
    rol: "socio",
    nombre: "Elena Peña",
    cargo: "TSU Forestal · Seccional Barinas",
    iniciales: "EP",
    titulo: "Técnica Superior Forestal",
    seccional: "Barinas",
    socioId: "S0002",
  },
];

export const rolInfo: Record<
  Rol,
  { titulo: string; corto: string; home: string; puede: string[]; noPuede: string[] }
> = {
  super_admin: {
    titulo: "Super administrador",
    corto: "Dirección Nacional",
    home: "/panel/admin",
    puede: [
      "Ver y gestionar los socios de todas las seccionales",
      "Aprobar o rechazar solicitudes de ingreso",
      "Crear seccionales y asignar sus directivas",
      "Publicar comunicados oficiales para todo el gremio",
      "Ver reportes nacionales de solvencia y cobros",
    ],
    noPuede: [],
  },
  seccional: {
    titulo: "Seccional",
    corto: "Directiva regional",
    home: "/panel/seccional",
    puede: [
      "Ver y gestionar solo a los socios de su seccional",
      "Registrar pagos de cuotas y emitir solvencias",
      "Convocar asambleas y subir actas",
      "Proponer nuevos socios a la Dirección Nacional",
    ],
    noPuede: [
      "Ver socios de otras seccionales",
      "Aprobar ingresos ni publicar comunicados nacionales",
    ],
  },
  socio: {
    titulo: "Socio",
    corto: "Miembro del gremio",
    home: "/panel/socio",
    puede: [
      "Ver y descargar su carné digital",
      "Consultar su solvencia e historial de cuotas",
      "Ver oportunidades laborales y eventos",
      "Actualizar sus datos de contacto",
    ],
    noPuede: [
      "Ver datos privados de otros socios",
      "Acceder a la gestión de la seccional o del gremio",
    ],
  },
};

export function findDemoUserById(id: string) {
  return demoUsers.find((u) => u.id === id);
}

export function findDemoUserByLogin(login: string) {
  const l = login.trim().toLowerCase();
  return demoUsers.find((u) => u.email === l);
}
