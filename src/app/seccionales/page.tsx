import Link from "next/link";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";

export default function SeccionalesPage() {
  const resumen = seccionalesDisponibles.map((nombre) => {
    const socios = sociosMock.filter((s) => s.seccional === nombre);
    const activos = socios.filter((s) => s.activo).length;
    const especialidades = new Set(socios.map((s) => s.especialidad)).size;
    return { nombre, total: socios.length, activos, especialidades };
  });

  const totalSocios = sociosMock.length;
  const totalActivos = sociosMock.filter((s) => s.activo).length;

  return (
    <div>
      {/* Encabezado */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="eyebrow">Delegaciones regionales</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium text-forest-900 sm:text-5xl">
            Seccionales del gremio
          </h1>
          <p className="prose-measure mt-5 text-forest-900/75">
            Cada seccional cuenta con directiva, calendario y gestión propia.
            Son el puente entre la Dirección Nacional y el socio en el
            territorio.
          </p>
        </div>
      </section>

      {/* Resumen país */}
      <section className="border-b border-rule bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-rule px-4 md:grid-cols-4">
          {[
            { k: resumen.length.toString(), v: "Seccionales" },
            { k: totalSocios.toLocaleString("es-VE"), v: "Socios registrados" },
            { k: totalActivos.toLocaleString("es-VE"), v: "Socios activos" },
            {
              k:
                Math.round((totalActivos / Math.max(totalSocios, 1)) * 100) +
                "%",
              v: "Tasa de actividad",
            },
          ].map((kpi, i) => (
            <div key={i} className="px-4 py-6">
              <p className="font-serif text-3xl font-medium text-forest-800">
                {kpi.k}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                {kpi.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid de seccionales */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-baseline justify-between border-b border-rule pb-3">
          <p className="eyebrow">Listado</p>
          <p className="text-xs text-muted">Ordenadas alfabéticamente</p>
        </div>

        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {resumen.map((s, i) => (
            <article
              key={s.nombre}
              className="group relative flex flex-col bg-paper p-6 transition hover:bg-forest-100/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-forest-900">
                    {s.nombre}
                  </h2>
                </div>
                <span
                  aria-hidden
                  className="h-10 w-10 rounded-full border border-gold-500/40 bg-gold-200/30"
                />
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-5 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted">
                    Socios
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-medium text-forest-800">
                    {s.total}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted">
                    Activos
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-medium text-forest-800">
                    {s.activos}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted">
                    Especialidades
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-medium text-forest-800">
                    {s.especialidades}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/directorio?seccional=${encodeURIComponent(s.nombre)}`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-forest-800 transition hover:text-gold-700"
              >
                Ver socios de {s.nombre} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
