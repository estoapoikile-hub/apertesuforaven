import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AvatarAnillos } from "@/components/avatar-anillos";
import { MiniMapa } from "@/components/curvas-de-nivel";
import { sociosMock } from "@/lib/mock-socios";
import { presidentesSeccional } from "@/lib/mock-panel";

export function generateStaticParams() {
  return sociosMock.map((s) => ({ id: s.id }));
}

function buscar(id: string) {
  return sociosMock.find((s) => s.id === id);
}

export async function generateMetadata({ params }: PageProps<"/directorio/[id]">): Promise<Metadata> {
  const { id } = await params;
  const s = buscar(id);
  return { title: s ? `${s.nombre} ${s.apellido} | APERTESUFORAVEN` : "Socio no encontrado | APERTESUFORAVEN" };
}

export default async function PerfilSocioPage({ params }: PageProps<"/directorio/[id]">) {
  const { id } = await params;
  const s = buscar(id);
  if (!s) notFound();

  const companeros = sociosMock
    .filter((o) => o.seccional === s.seccional && o.id !== s.id && o.activo)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <Link
        href="/directorio"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-forest-800 transition hover:bg-forest-100"
      >
        <span aria-hidden>‹</span> Volver al directorio
      </Link>

      {/* Ficha */}
      <article className="mt-4 overflow-hidden rounded-[2rem] bg-paper shadow-[0_1px_2px_rgba(15,46,37,0.06),0_24px_60px_-30px_rgba(15,46,37,0.45)] ring-1 ring-forest-950/5">
        {/* Portada con el mapa de su seccional */}
        <div className="relative isolate h-40 overflow-hidden bg-forest-950 sm:h-48">
          <MiniMapa semilla={s.seccional} className="absolute inset-0 -z-10 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 to-transparent" />
          <p className="absolute right-6 top-5 rounded-full bg-forest-950/60 px-3 py-1 text-sm text-forest-100 backdrop-blur">
            Seccional {s.seccional}
          </p>
        </div>

        <div className="px-6 pb-8 sm:px-10">
          <div className="-mt-14 flex flex-wrap items-end justify-between gap-4">
            <span className="rounded-full bg-paper p-1.5">
              <AvatarAnillos iniciales={`${s.nombre[0]}${s.apellido[0]}`} activo={s.activo} grande />
            </span>
            <span
              className={`mb-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium ${
                s.activo ? "bg-forest-100 text-forest-800" : "bg-sand text-muted"
              }`}
            >
              {s.activo ? (
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <circle cx="8" cy="8" r="8" fill="currentColor" />
                  <path d="M4.5 8.2l2.2 2.2 4.8-4.9" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="h-2 w-2 rounded-full bg-muted/60" />
              )}
              {s.activo ? "Socio activo" : "Socio inactivo"}
            </span>
          </div>

          {/* Primario */}
          <h1 className="mt-5 text-5xl text-forest-950 sm:text-6xl" style={{ fontStretch: "72%" }}>
            {s.nombre} {s.apellido}
          </h1>
          {/* Secundario */}
          <p className="mt-2 text-lg text-forest-800">
            {s.especialidad}
          </p>

          {/* Terciario */}
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Seccional", s.seccional],
              ["Promoción", s.promocion.toString()],
              ["Cédula", s.cedula],
              ["N.º de socio", s.id],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-sand/70 px-4 py-3">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-forest-950">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-2xl border border-dashed border-forest-200 px-5 py-4 text-[15px] text-foreground/80">
            {s.activo
              ? `Registro verificado en APERTESUFORAVEN. Forma parte de la seccional ${s.seccional}, que preside ${presidentesSeccional[s.seccional]}.`
              : "Figura en el registro del gremio, pero ahora mismo no tiene la membresía activa."}
          </div>

          {/* Datos privados */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-forest-950 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Contacto, documentos y solvencia</p>
              <p className="mt-0.5 text-sm text-forest-100/75">
                Solo los ven los socios que han entrado a su panel.
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 rounded-full bg-gold-500 px-5 py-2.5 text-center font-semibold text-forest-950 transition hover:bg-gold-200"
            >
              Entrar para verlos
            </Link>
          </div>
        </div>
      </article>

      {/* Más socios de la seccional */}
      {companeros.length > 0 && (
        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-3xl text-forest-950">Más socios de {s.seccional}</h2>
            <Link
              href={`/directorio?seccional=${encodeURIComponent(s.seccional)}`}
              className="text-sm font-semibold text-forest-800 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {companeros.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/directorio/${o.id}`}
                  className="flex items-center gap-3 rounded-3xl bg-paper p-4 shadow-[0_1px_2px_rgba(15,46,37,0.06),0_12px_28px_-18px_rgba(15,46,37,0.35)] ring-1 ring-forest-950/5 transition hover:-translate-y-0.5 motion-reduce:transform-none"
                >
                  <AvatarAnillos iniciales={`${o.nombre[0]}${o.apellido[0]}`} activo={o.activo} />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg text-forest-950">
                      {o.nombre} {o.apellido}
                    </span>
                    <span className="block truncate text-sm text-muted">{o.especialidad}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
