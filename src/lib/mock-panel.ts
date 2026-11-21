import type { Seccional, Socio } from "./types";
import { sociosMock, seccionalesDisponibles } from "./mock-socios";

/** Datos de prueba de los paneles privados. */

export const presidentesSeccional: Record<Seccional, string> = {
  Mérida: "Luis Dávila",
  Zulia: "Carmen Araujo",
  Táchira: "Jesús Contreras",
  Trujillo: "Rosa Briceño",
  Barinas: "Gloria Contreras",
  Portuguesa: "Andrés Molina",
  Bolívar: "Natalia Guerrero",
  Amazonas: "Hugo Suárez",
  Monagas: "Teresa Parra",
  Capital: "Víctor Mendoza",
};

/** Solvente = cuota del año al día (en la demo, todos los activos menos algunos). */
export function esSolvente(s: Socio) {
  const n = Number(s.id.slice(1));
  return s.activo && n % 4 !== 0;
}

export function resumenSeccionales() {
  return seccionalesDisponibles.map((nombre) => {
    const socios = sociosMock.filter((s) => s.seccional === nombre);
    const solventes = socios.filter(esSolvente).length;
    return {
      nombre,
      presidente: presidentesSeccional[nombre],
      total: socios.length,
      activos: socios.filter((s) => s.activo).length,
      solventes,
      solvencia: socios.length ? Math.round((solventes / socios.length) * 100) : 0,
    };
  });
}

export const solicitudesIngreso = [
  { id: "SOL-118", nombre: "Daniela Rivas", cedula: "V-27.441.902", seccional: "Mérida" as Seccional, promocion: 2025, fecha: "18 nov 2026" },
  { id: "SOL-117", nombre: "Manuel Zambrano", cedula: "V-26.118.530", seccional: "Táchira" as Seccional, promocion: 2024, fecha: "15 nov 2026" },
  { id: "SOL-116", nombre: "Paola Linares", cedula: "V-25.903.217", seccional: "Barinas" as Seccional, promocion: 2025, fecha: "12 nov 2026" },
  { id: "SOL-115", nombre: "Eduardo Quintero", cedula: "V-24.770.064", seccional: "Zulia" as Seccional, promocion: 2023, fecha: "9 nov 2026" },
];

export const comunicados = [
  { fecha: "20 nov 2026", titulo: "Convocatoria a la Asamblea Nacional Ordinaria 2027", alcance: "Todo el gremio" },
  { fecha: "4 nov 2026", titulo: "Nueva tabla de honorarios para avalúos forestales", alcance: "Todo el gremio" },
  { fecha: "22 oct 2026", titulo: "Campaña nacional de prevención de incendios", alcance: "Seccionales" },
];

export const convocatoriasSeccional = [
  { fecha: "5 dic", titulo: "Asamblea ordinaria de la seccional", lugar: "Sede ULA, Barinas", tipo: "Asamblea" },
  { fecha: "12 dic", titulo: "Jornada de reforestación — Caparo", lugar: "Reserva Forestal de Caparo", tipo: "Campo" },
  { fecha: "16 ene", titulo: "Taller de inventario forestal con drones", lugar: "En línea", tipo: "Formación" },
];

export const actasSeccional = [
  { fecha: "7 nov 2026", titulo: "Acta de asamblea ordinaria · noviembre" },
  { fecha: "3 oct 2026", titulo: "Acta de junta directiva · octubre" },
  { fecha: "5 sep 2026", titulo: "Acta de asamblea extraordinaria · elecciones" },
];

export const oportunidades = [
  { titulo: "Inventario forestal — Reserva de Ticoporo", empresa: "Consultora Bosques del Sur", lugar: "Barinas", tipo: "Contrato 6 meses" },
  { titulo: "Técnico de vivero y reforestación", empresa: "Fundación Árboles de Venezuela", lugar: "Mérida", tipo: "Tiempo completo" },
  { titulo: "Perito para avalúo de plantación de teca", empresa: "Agropecuaria El Cedral", lugar: "Portuguesa", tipo: "Por proyecto" },
];

export const eventosSocio = [
  { fecha: "5 dic", titulo: "Asamblea de tu seccional", lugar: "Sede ULA, Barinas" },
  { fecha: "12 dic", titulo: "Jornada de reforestación", lugar: "Caparo" },
  { fecha: "16 ene", titulo: "Taller de inventario con drones", lugar: "En línea" },
];

export const mesesCuota = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
