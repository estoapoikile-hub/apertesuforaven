import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="overflow-hidden rounded-lg border border-rule bg-paper">
          <div className="hidden grid-cols-[1.3fr_1.5fr_0.7fr_0.7fr_1.2fr] gap-4 border-b border-rule bg-sand/60 px-6 py-3 text-sm font-semibold text-forest-950 md:grid">
            <span>Seccional</span>
            <span>Presidencia</span>
            <span>Socios</span>
            <span>Activos</span>
            <span className="sr-only">Acción</span>
          </div>
          <ul className="divide-y divide-rule">
            {resumen.map((s) => (
              <li
                key={s.nombre}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-6 py-5 md:grid-cols-[1.3fr_1.5fr_0.7fr_0.7fr_1.2fr]"
              >
                <h2 className="font-display text-2xl text-forest-950">{s.nombre}</h2>
                <p className="col-start-1 text-[15px] text-muted md:col-auto md:text-foreground/85">
                  <span className="md:hidden">Preside </span>
                  {s.presidente}
                  <span className="md:hidden">. {s.total} socios, {s.activos} activos</span>
                </p>
                <p className="hidden tabular-nums text-[15px] md:block">{s.total}</p>
                <p className="hidden tabular-nums text-[15px] md:block">{s.activos}</p>
                <Link
                  href={`/directorio?seccional=${encodeURIComponent(s.nombre)}`}
                  className="col-start-2 row-span-2 row-start-1 justify-self-end rounded-md border border-rule px-3.5 py-2 text-sm font-semibold text-forest-800 transition hover:border-forest-800 md:col-auto md:row-auto"
                >
                  Ver socios
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
