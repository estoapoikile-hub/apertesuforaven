import type { Seccional, Socio } from "./types";

const seccionales: Seccional[] = [
  "Mérida",
  "Zulia",
  "Táchira",
  "Trujillo",
  "Barinas",
  "Portuguesa",
  "Bolívar",
  "Amazonas",
  "Monagas",
  "Capital",
];

const nombres = [
  "Carlos", "María", "José", "Ana", "Pedro", "Luisa", "Rafael", "Elena",
  "Francisco", "Carmen", "Jesús", "Rosa", "Luis", "Isabel", "Miguel",
  "Teresa", "Antonio", "Gloria", "Juan", "Patricia", "Andrés", "Sofía",
  "Ricardo", "Lucía", "Víctor", "Natalia", "Oscar", "Gabriela", "Hugo", "Marta",
];

const apellidos = [
  "González", "Rodríguez", "Pérez", "Rojas", "Sánchez", "Hernández", "Díaz",
  "Suárez", "Mendoza", "Ramírez", "Castillo", "Araujo", "Guerrero", "Briceño",
  "Molina", "Peña", "Torres", "Contreras", "Parra", "Dávila",
];

const especialidades = [
  "Manejo forestal",
  "Industria de la madera",
  "Conservación de cuencas",
  "Agroforestería",
  "Silvicultura tropical",
  "Protección contra incendios",
  "Inventario forestal",
  "Fauna silvestre",
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export const sociosMock: Socio[] = Array.from({ length: 60 }, (_, i) => {
  const nombre = pick(nombres, i * 7);
  const apellido = pick(apellidos, i * 13 + 2);
  return {
    id: `S${(i + 1).toString().padStart(4, "0")}`,
    cedula: `V-${(8_000_000 + i * 4213).toString()}`,
    nombre,
    apellido,
    seccional: pick(seccionales, i * 3 + 1),
    promocion: 1985 + (i % 38),
    especialidad: pick(especialidades, i * 5 + 3),
    activo: i % 9 !== 0,
  };
});

export const seccionalesDisponibles = seccionales;
