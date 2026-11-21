"use client";

import { useState } from "react";

type Solicitud = {
  id: string;
  nombre: string;
  cedula: string;
  seccional: string;
  promocion: number;
  fecha: string;
};

export function SolicitudesIngreso({ solicitudes }: { solicitudes: Solicitud[] }) {
  const [estado, setEstado] = useState<Record<string, "aprobada" | "rechazada">>({});

  return (
    <ul className="divide-y divide-rule">
      {solicitudes.map((s) => {
        const e = estado[s.id];
        return (
          <li key={s.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-forest-900">{s.nombre}</p>
              <p className="mt-0.5 text-xs text-muted">
                {s.cedula} · Seccional {s.seccional} · Promoción {s.promocion} · {s.fecha}
              </p>
            </div>
            {e ? (
              <span
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  e === "aprobada" ? "text-forest-700" : "text-red-700"
                }`}
              >
                {e === "aprobada" ? "✓ Aprobada" : "✕ Rechazada"}
              </span>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEstado((p) => ({ ...p, [s.id]: "aprobada" }))}
                  className="bg-forest-800 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-forest-900"
                >
                  Aprobar
                </button>
                <button
                  type="button"
                  onClick={() => setEstado((p) => ({ ...p, [s.id]: "rechazada" }))}
                  className="border border-rule px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-forest-900 transition hover:border-red-300 hover:text-red-800"
                >
                  Rechazar
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

type FilaSocio = {
  id: string;
  nombre: string;
  cedula: string;
  promocion: number;
  especialidad: string;
  solvente: boolean;
};

export function SociosSeccional({ socios }: { socios: FilaSocio[] }) {
  const [pagados, setPagados] = useState<Set<string>>(new Set());

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-rule text-left text-[11px] uppercase tracking-[0.14em] text-muted">
            <th className="px-6 py-3 font-semibold">Socio</th>
            <th className="px-3 py-3 font-semibold">Promoción</th>
            <th className="px-3 py-3 font-semibold">Especialidad</th>
            <th className="px-3 py-3 font-semibold">Cuota 2026</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {socios.map((s) => {
            const ok = s.solvente || pagados.has(s.id);
            return (
              <tr key={s.id} className="transition hover:bg-forest-100/25">
                <td className="px-6 py-3.5">
                  <p className="font-medium text-forest-900">{s.nombre}</p>
                  <p className="text-xs text-muted">{s.cedula} · {s.id}</p>
                </td>
                <td className="px-3 py-3.5 text-forest-900/80">{s.promocion}</td>
                <td className="px-3 py-3.5 text-forest-900/80">{s.especialidad}</td>
                <td className="px-3 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ok ? "bg-forest-100 text-forest-800" : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-forest-500" : "bg-amber-500"}`} />
                    {ok ? "Solvente" : "Pendiente"}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  {!ok && (
                    <button
                      type="button"
                      onClick={() => setPagados((p) => new Set(p).add(s.id))}
                      className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900"
                    >
                      Registrar pago
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
