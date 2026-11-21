import type { Metadata } from "next";
import Link from "next/link";
import { MiniMapa } from "@/components/curvas-de-nivel";
import { sociosMock } from "@/lib/mock-socios";
import { resumenSeccionales } from "@/lib/mock-panel";

export const metadata: Metadata = { title: "Seccionales | APERTESUFORAVEN" };

export default function SeccionalesPage() {
  const resumen = resumenSeccionales();
  const totalSocios = sociosMock.length;
  const totalActivos = sociosMock.filter((s) => s.activo).length;

  return (
    <div>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16">
          <h1 className="max-w-3xl text-5xl text-forest-950 sm:text-6xl" style={{ fontStretch: "72%" }}>
            Seccionales del gremio
          </h1>
          <p className="prose-measure mt-5 text-lg text-muted">
            Cada seccional tiene su propia directiva, calendario y gestión. Son
            el puente entre la Dirección Nacional y los socios de cada región.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {[
              [resumen.length.toString(), "seccionales"],
              [totalSocios.toString(), "socios registrados"],
              [totalActivos.toString(), "socios activos"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="sr-only">{v}</dt>
                <dd className="font-display text-4xl text-forest-950" style={{ fontStretch: "70%" }}>
                  {k}
                </dd>
                <dd className="text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumen.map((s) => {
            const pct = s.total ? Math.round((s.activos / s.total) * 100) : 0;
            return (
              <li key={s.nombre}>
                <Link
                  href={`/directorio?seccional=${encodeURIComponent(s.nombre)}`}
                  className="group block overflow-hidden rounded-3xl bg-paper shadow-[0_1px_2px_rgba(15,46,37,0.06),0_14px_34px_-18px_rgba(15,46,37,0.35)] ring-1 ring-forest-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,46,37,0.08),0_24px_44px_-18px_rgba(15,46,37,0.45)] motion-reduce:transform-none"
                >
                  {/* Mapa de la región */}
                  <div className="relative isolate h-40 overflow-hidden bg-forest-950">
                    <MiniMapa
                      semilla={s.nombre}
                      className="absolute inset-0 -z-10 h-full w-full transition duration-700 group-hover:scale-110 motion-reduce:transform-none"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                    <h2
                      className="absolute bottom-4 left-6 text-4xl text-white"
                      style={{ fontStretch: "72%" }}
                    >
                      {s.nombre}
                    </h2>
                  </div>

                  <div className="px-6 pb-6 pt-5">
                    {/* Dato héroe: socios */}
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-4xl text-forest-950" style={{ fontStretch: "70%" }}>
                        {s.total}
                      </span>
                      <span className="text-forest-950">socios</span>
                      <span className="text-sm text-muted">· {s.activos} activos</span>
                    </p>

                    <div
                      className="mt-3 h-2 overflow-hidden rounded-full bg-forest-100"
                      role="img"
                      aria-label={`${pct}% de socios activos`}
                    >
                      <div className="h-full rounded-full bg-forest-500" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-sm text-muted">
                        Preside <span className="font-medium text-forest-950">{s.presidente}</span>
                      </p>
                      <span className="rounded-full bg-forest-100 px-3.5 py-1.5 text-sm font-semibold text-forest-800 transition group-hover:bg-forest-800 group-hover:text-white">
                        Ver socios
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
