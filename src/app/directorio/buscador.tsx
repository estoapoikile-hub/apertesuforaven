"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";
import type { Seccional } from "@/lib/types";

const campo =
  "rounded-full border border-rule bg-paper px-5 py-3 text-[15px] outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100";

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
              placeholder="Busca por nombre, cédula o especialidad"
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
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((s) => (
              <li
                key={s.id}
                className="group relative overflow-hidden rounded-3xl bg-paper p-6 shadow-[0_1px_2px_rgba(15,46,37,0.06),0_14px_34px_-20px_rgba(15,46,37,0.35)] ring-1 ring-forest-950/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,46,37,0.08),0_22px_40px_-20px_rgba(15,46,37,0.45)] motion-reduce:transform-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <AvatarAnillos iniciales={`${s.nombre[0]}${s.apellido[0]}`} activo={s.activo} />
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                      s.activo ? "bg-forest-100 text-forest-800" : "bg-sand text-muted"
                    }`}
                  >
                    {s.activo ? (
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                        <circle cx="8" cy="8" r="8" fill="currentColor" />
                        <path d="M4.5 8.2l2.2 2.2 4.8-4.9" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-muted/60" />
                    )}
                    {s.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* Primario: el nombre */}
                <h2 className="mt-5 text-2xl leading-tight text-forest-950" style={{ fontStretch: "74%" }}>
                  {s.nombre} {s.apellido}
                </h2>
                {/* Secundario: dónde y en qué trabaja */}
                <p className="mt-1 text-[15px] text-forest-800">
                  {s.seccional} · {s.especialidad}
                </p>
                {/* Terciario: datos de identificación */}
                <p className="mt-5 rounded-2xl bg-sand/70 px-4 py-2.5 text-sm tabular-nums text-muted">
                  {s.cedula} · promoción {s.promocion} · socio {s.id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

/** Iniciales dentro de anillos de crecimiento, como el logo. */
function AvatarAnillos({ iniciales, activo }: { iniciales: string; activo: boolean }) {
  return (
    <span className="relative inline-flex h-14 w-14 items-center justify-center">
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="28" cy="28" r="28" fill={activo ? "#0f2e25" : "#c4d4c4"} />
        {[25, 21.5].map((r, i) => (
          <ellipse
            key={r}
            cx={28 + i * 0.6}
            cy={28 - i * 0.4}
            rx={r}
            ry={r * 0.95}
            fill="none"
            stroke={i === 0 && activo ? "#f1b82d" : activo ? "#5d8a6f" : "#ffffff"}
            strokeOpacity={activo ? 0.9 : 0.7}
            strokeWidth={1.2}
          />
        ))}
      </svg>
      <span
        className={`relative font-display text-lg ${activo ? "text-gold-200" : "text-forest-950"}`}
        style={{ fontStretch: "80%" }}
      >
        {iniciales}
      </span>
    </span>
  );
}
