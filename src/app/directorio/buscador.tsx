"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";
import type { Seccional } from "@/lib/types";

const campo =
  "rounded-md border border-rule bg-paper px-3 py-2.5 text-[15px] outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100";

export function Buscador() {
  const params = useSearchParams();
  const inicial = params.get("seccional");
  const [q, setQ] = useState("");
  const [seccional, setSeccional] = useState<"todas" | Seccional>(
    seccionalesDisponibles.includes(inicial as Seccional) ? (inicial as Seccional) : "todas",
  );
  const [soloActivos, setSoloActivos] = useState(true);

  const resultados = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sociosMock.filter((s) => {
      if (soloActivos && !s.activo) return false;
      if (seccional !== "todas" && s.seccional !== seccional) return false;
      if (!needle) return true;
      return [s.nombre, s.apellido, `${s.nombre} ${s.apellido}`, s.cedula, s.especialidad].some((v) =>
        v.toLowerCase().includes(needle),
      );
    });
  }, [q, seccional, soloActivos]);

  function limpiar() {
    setQ("");
    setSeccional("todas");
    setSoloActivos(false);
  }

  return (
    <>
      <div className="sticky top-[69px] z-20 border-b border-rule bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <label>
            <span className="sr-only">Buscar</span>
            <input
              type="search"
              placeholder="Nombre, cédula o especialidad"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={`${campo} w-full`}
            />
          </label>
          <label>
            <span className="sr-only">Seccional</span>
            <select
              value={seccional}
              onChange={(e) => setSeccional(e.target.value as "todas" | Seccional)}
              className={`${campo} w-full`}
            >
              <option value="todas">Todas las seccionales</option>
              {seccionalesDisponibles.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 px-1 text-[15px] text-foreground/80">
            <input
              type="checkbox"
              checked={soloActivos}
              onChange={(e) => setSoloActivos(e.target.checked)}
              className="h-4 w-4 accent-forest-800"
            />
            Solo activos
          </label>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-sm text-muted">
          {resultados.length} {resultados.length === 1 ? "socio" : "socios"}
          {seccional !== "todas" && ` en la seccional ${seccional}`}. Datos de prueba.
        </p>

        {resultados.length === 0 ? (
          <div className="rounded-lg border border-dashed border-rule bg-paper px-6 py-16 text-center">
            <p className="font-display text-2xl text-forest-950">Ningún socio coincide con la búsqueda</p>
            <p className="mt-2 text-muted">Revisa cómo escribiste el nombre o busca en todas las seccionales.</p>
            <button
              type="button"
              onClick={limpiar}
              className="mt-6 rounded-md bg-forest-800 px-5 py-2.5 font-semibold text-white transition hover:bg-forest-950"
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-rule bg-paper">
            <div className="hidden grid-cols-[2fr_1fr_1.5fr_0.8fr_0.8fr] gap-4 border-b border-rule bg-sand/60 px-5 py-3 text-sm font-semibold text-forest-950 md:grid">
              <span>Socio</span>
              <span>Seccional</span>
              <span>Especialidad</span>
              <span>Promoción</span>
              <span>Estado</span>
            </div>
            <ul className="divide-y divide-rule">
              {resultados.map((s) => (
                <li
                  key={s.id}
                  className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-5 py-4 md:grid-cols-[2fr_1fr_1.5fr_0.8fr_0.8fr] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-forest-950">
                      {s.nombre} {s.apellido}
                    </p>
                    <p className="text-sm tabular-nums text-muted">
                      {s.cedula}, socio {s.id}
                    </p>
                  </div>
                  <span className="order-last col-span-2 text-sm text-muted md:order-none md:col-span-1 md:text-[15px] md:text-foreground/85">
                    <span className="md:hidden">{s.especialidad}, seccional </span>
                    {s.seccional}
                  </span>
                  <span className="hidden text-[15px] text-foreground/85 md:block">{s.especialidad}</span>
                  <span className="hidden tabular-nums text-[15px] text-foreground/85 md:block">{s.promocion}</span>
                  <span className="row-start-1 col-start-2 md:col-auto md:row-auto">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm ${
                        s.activo ? "bg-forest-100 text-forest-800" : "bg-sand text-muted"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${s.activo ? "bg-forest-500" : "bg-muted/50"}`} />
                      {s.activo ? "Activo" : "Inactivo"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
