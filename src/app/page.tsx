import Image from "next/image";
import Link from "next/link";
import { CurvasDeNivel } from "@/components/curvas-de-nivel";
import { rolInfo } from "@/lib/auth/demo-users";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";

const bosqueSol =
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1400&q=80";
const bosqueNiebla =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80";
const sendero =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80";
const hoja =
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80";

const timeline = [
  {
    year: "1948",
    titulo: "Decreto fundacional",
    texto: "Rómulo Gallegos firma el decreto que crea la Escuela de Ingeniería Forestal en Mérida.",
  },
  {
    year: "1952",
    titulo: "Facultad de Ciencias Forestales",
    texto: "El 15 de septiembre se establece oficialmente la Facultad en la Universidad de Los Andes.",
  },
  {
    year: "1953",
    titulo: "Escuela de Capacitación Forestal",
    texto: "Empieza la formación de peritos forestales en el campus de Chorros de Milla.",
  },
  {
    year: "1997",
    titulo: "Nace la ETSUFOR",
    texto: "La Escuela Técnica Superior Forestal sustituye a la antigua escuela de capacitación.",
  },
  {
    year: "Hoy",
    titulo: "APERTESUFORAVEN",
    texto: "El gremio agrupa a los egresados en seccionales por todo el país.",
  },
];

const compromisos = [
  {
    img: bosqueNiebla,
    alt: "Bosque nublado venezolano",
    titulo: "Proteger el patrimonio forestal",
    texto:
      "Manejo sostenible, conservación de cuencas y prevención de incendios, siempre con criterio técnico.",
  },
  {
    img: sendero,
    alt: "Bosque con luz entre los árboles",
    titulo: "Acompañar al socio",
    texto:
      "Formación continua, carné digital y solvencia gremial para cada perito y técnico superior forestal.",
  },
  {
    img: hoja,
    alt: "Hoja verde en detalle",
    titulo: "Representar al gremio",
    texto:
      "Interlocución ante el Estado, las universidades y el sector privado en todo lo que afecta al ejercicio forestal.",
  },
];

const niveles = [
  { rol: "super_admin" as const, titulo: "Dirección Nacional" },
  { rol: "seccional" as const, titulo: "Seccionales" },
  { rol: "socio" as const, titulo: "Socios" },
];

export default function Home() {
  return (
    <div>
      {/* PORTADA: curvas de nivel de la sierra */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-white">
        <CurvasDeNivel className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/75 to-transparent" />

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:pt-32">
          <p className="aparecer max-w-lg text-[15px] text-forest-200">
            Asociación de Peritos y Técnicos Superiores Forestales de Venezuela
          </p>
          <h1
            className="aparecer mt-5 max-w-3xl text-[2.9rem] text-white sm:text-7xl lg:text-[5.4rem]"
            style={{ animationDelay: "0.1s", fontStretch: "70%" }}
          >
            Los técnicos que miden, cuidan y defienden el bosque venezolano
          </h1>
          <p
            className="aparecer mt-7 max-w-xl text-lg leading-relaxed text-forest-100/85"
            style={{ animationDelay: "0.2s" }}
          >
            Somos el gremio de los egresados de la escuela forestal de Mérida,
            fundada por decreto de Rómulo Gallegos en 1948.
          </p>
          <div className="aparecer mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/directorio"
              className="rounded-md bg-gold-500 px-6 py-3.5 font-semibold text-forest-950 transition hover:bg-gold-200"
            >
              Buscar un socio
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
            >
              Entrar a mi panel
            </Link>
          </div>

          <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {[
              ["1948", "año de fundación de la escuela"],
              [seccionalesDisponibles.length.toString(), "seccionales en el país"],
              [sociosMock.length.toString(), "socios en el directorio"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="sr-only">{v}</dt>
                <dd className="font-display text-3xl text-white sm:text-4xl">{k}</dd>
                <dd className="mt-1 text-sm text-forest-200">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="max-w-xl text-4xl text-forest-950 sm:text-5xl">
              De la Escuela de Capacitación Forestal a la ETSUFOR
            </h2>
            <p className="font-prose prose-measure mt-8 text-lg text-foreground/85">
              El gremio nace en Mérida. En 1948 el presidente Rómulo Gallegos,
              autor de <em>Doña Bárbara</em>, firmó el decreto que fundó la
              Escuela de Ingeniería Forestal. De ella salió la Escuela de
              Capacitación Forestal, que durante décadas formó a los peritos
              forestales, hasta que en 1997 se transformó en la actual Escuela
              Técnica Superior Forestal (ETSUFOR) de la Universidad de Los Andes.
            </p>

            <ol className="mt-14">
              {timeline.map((t) => (
                <li
                  key={t.year}
                  className="grid grid-cols-[5.5rem_1fr] gap-6 border-t border-rule py-5 sm:grid-cols-[7rem_1fr]"
                >
                  <p className="font-display text-3xl text-forest-800" style={{ fontStretch: "70%" }}>
                    {t.year}
                  </p>
                  <div>
                    <p className="font-semibold text-forest-950">{t.titulo}</p>
                    <p className="mt-1 text-[15px] text-muted">{t.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="lg:col-span-5 lg:pt-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={bosqueSol}
                alt="Bosque con la luz del amanecer"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              Los técnicos superiores forestales se forman en el campus de
              Chorros de Milla, en Mérida, desde 1953.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* COMPROMISOS */}
      <section className="bg-forest-100/60">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="max-w-2xl text-4xl text-forest-950 sm:text-5xl">
            Tres compromisos guían al gremio
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {compromisos.map((m) => (
              <article key={m.titulo}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <h3 className="mt-5 text-2xl text-forest-950">{m.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LA PLATAFORMA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl text-forest-950 sm:text-5xl">
              Cada miembro del gremio tiene su panel
            </h2>
            <p className="mt-4 text-lg text-muted">
              Entras con tu correo y ves solo lo que te corresponde según tu
              papel en la asociación.
            </p>
          </div>
          <Link
            href="/login"
            className="self-start rounded-md bg-forest-800 px-6 py-3.5 font-semibold text-white transition hover:bg-forest-950 md:self-auto"
          >
            Entrar a mi panel
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-3">
          {niveles.map((n) => (
            <div key={n.rol} className="bg-paper p-7">
              <h3 className="text-2xl text-forest-950">{n.titulo}</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-foreground/80">
                {rolInfo[n.rol].puede.slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
