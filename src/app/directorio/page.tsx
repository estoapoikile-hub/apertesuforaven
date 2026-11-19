"use client";

import { useMemo, useState } from "react";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";
import type { Seccional, Socio } from "@/lib/types";

function iniciales(s: Socio) {
  return `${s.nombre[0] ?? ""}${s.apellido[0] ?? ""}`.toUpperCase();
}

export default function DirectorioPage() {
  const [q, setQ] = useState("");
  const [seccional, setSeccional] = useState<"todas" | Seccional>("todas");
  const [soloActivos, setSoloActivos] = useState(true);

  const resultados = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sociosMock.filter((s) => {
      if (soloActivos && !s.activo) return false;
      if (seccional !== "todas" && s.seccional !== seccional) return false;
      if (!needle) return true;
      return (
        s.nombre.toLowerCase().includes(needle) ||
        s.apellido.toLowerCase().includes(needle) ||
        s.cedula.toLowerCase().includes(needle) ||
        s.especialidad.toLowerCase().includes(needle)
      );
    });
  }, [q, seccional, soloActivos]);

  return (
    <div>
      {/* Encabezado editorial */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="eyebrow">Registro gremial</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium text-forest-900 sm:text-5xl">
            Directorio público de socios
          </h1>
          <p className="prose-measure mt-5 text-forest-900/75">
            Información pública de los peritos y técnicos superiores forestales
            registrados en el gremio. Los datos privados —contacto, documentos
            y solvencia— solo son visibles tras iniciar sesión.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="sticky top-[73px] z-20 border-b border-rule bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <label className="relative">
              <span className="sr-only">Buscar</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              >
                ⌕
              </span>
              <input
                type="search"
                placeholder="Buscar por nombre, apellido, cédula o especialidad…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-sm border border-rule bg-paper py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-200"
              />
            </label>
            <select
              value={seccional}
              onChange={(e) => setSeccional(e.target.value as "todas" | Seccional)}
              className="rounded-sm border border-rule bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-forest-700"
            >
              <option value="todas">Todas las seccionales</option>
              {seccionalesDisponibles.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 px-2 text-sm text-forest-900/80">
              <input
                type="checkbox"
                checked={soloActivos}
                onChange={(e) => setSoloActivos(e.target.checked)}
                className="h-4 w-4 accent-forest-700"
              />
              Solo activos
            </label>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-baseline justify-between border-b border-rule pb-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"}
          </p>
          <p className="text-xs text-muted">
            Datos de prueba — directorio oficial pendiente de carga
          </p>
        </div>

        {resultados.length === 0 ? (
          <div className="border border-dashed border-rule bg-paper p-20 text-center">
            <p className="font-serif text-xl text-forest-900">Sin resultados</p>
            <p className="mt-2 text-sm text-muted">
              Ajustá los filtros para ampliar la búsqueda.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((s) => (
              <li
                key={s.id}
                className="group relative flex flex-col border border-rule bg-paper transition hover:border-forest-700 hover:shadow-sm"
              >
                {/* Franja superior dorada */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gold-500 opacity-0 transition group-hover:opacity-100"
                />

                <div className="flex items-start gap-4 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-800 font-serif text-lg font-semibold text-gold-200 ring-1 ring-forest-950/10">
                    {iniciales(s)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-serif text-lg leading-tight text-forest-900">
                        {s.nombre} {s.apellido}
                      </h2>
                      {s.activo ? (
                        <span className="shrink-0 rounded-sm bg-forest-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-800">
                          Activo
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-sm bg-sand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                          Inactivo
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {s.cedula}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-rule px-5 py-4 text-sm">
                  <dt className="text-xs uppercase tracking-wider text-muted">Seccional</dt>
                  <dd className="font-medium text-forest-900">{s.seccional}</dd>
                  <dt className="text-xs uppercase tracking-wider text-muted">Especialidad</dt>
                  <dd className="text-forest-900/85">{s.especialidad}</dd>
                  <dt className="text-xs uppercase tracking-wider text-muted">Promoción</dt>
                  <dd className="text-forest-900/85">{s.promocion}</dd>
                </dl>

                <div className="mt-auto flex items-center justify-between border-t border-rule px-5 py-3">
                  <span className="font-mono text-[11px] text-muted">
                    ID · {s.id}
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-800 transition hover:text-gold-700"
                    onClick={() => alert("Perfil detallado — próximamente (requiere sesión).")}
                  >
                    Ver perfil →
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
