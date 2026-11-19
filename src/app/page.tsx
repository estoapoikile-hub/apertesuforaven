import Image from "next/image";
import Link from "next/link";
import { sociosMock, seccionalesDisponibles } from "@/lib/mock-socios";

const hero =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80";
const bosqueNiebla =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80";
const bosqueSol =
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1400&q=80";
const sendero =
  "https://images.unsplash.com/photo-1434725400441-fe00c1b73809?auto=format&fit=crop&w=1400&q=80";
const hoja =
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80";
const paramo =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80";

const timeline = [
  {
    year: "1948",
    titulo: "Decreto fundacional",
    texto:
      "Rómulo Gallegos firma el decreto que crea la Escuela de Ingeniería Forestal en Mérida.",
  },
  {
    year: "1952",
    titulo: "Facultad de Ciencias Forestales",
    texto:
      "El 15 de septiembre se establece oficialmente la Facultad en la Universidad de Los Andes.",
  },
  {
    year: "1953",
    titulo: "Escuela de Capacitación Forestal",
    texto:
      "Comienza la formación de los peritos forestales en el campus de Chorros de Milla.",
  },
  {
    year: "1997",
    titulo: "Nace la ETSUFOR",
    texto:
      "La Escuela Técnica Superior Forestal sustituye a la antigua escuela de capacitación.",
  },
  {
    year: "Hoy",
    titulo: "APERTESUFORAVEN",
    texto:
      "El gremio agrupa a los egresados en seccionales por todo el territorio nacional.",
  },
];

const misiones = [
  {
    img: bosqueNiebla,
    alt: "Bosque nublado venezolano",
    titulo: "Proteger el patrimonio forestal",
    texto:
      "Defender el bosque venezolano con criterios técnicos: manejo sostenible, conservación de cuencas y prevención de incendios.",
  },
  {
    img: sendero,
    alt: "Sendero en bosque",
    titulo: "Formar y acompañar al socio",
    texto:
      "Actualización continua, carné digital y solvencia gremial para cada perito y técnico superior forestal del país.",
  },
  {
    img: hoja,
    alt: "Hoja verde en detalle",
    titulo: "Representar al gremio",
    texto:
      "Interlocutor ante el Estado, universidades y sector privado en todo lo que afecta el ejercicio forestal.",
  },
];

export default function Home() {
  const totalSocios = sociosMock.length;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="Bosque de los Andes venezolanos"
            fill
            priority
            className="object-cover animate-slow-zoom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/80 to-forest-800/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,rgba(13,42,30,0.6)_90%)]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-28 sm:py-36 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="animate-fade-up flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold-200">
              <span className="h-px w-8 bg-gold-500" />
              Asociación gremial · Fundada 1948
            </p>
            <h1 className="animate-fade-up delay-100 mt-6 max-w-4xl text-[2.6rem] font-medium leading-[1.02] text-white sm:text-6xl lg:text-[4.25rem]">
              Siete décadas cuidando el bosque{" "}
              <span className="italic text-gold-200">venezolano</span>.
            </h1>
            <p className="animate-fade-up delay-200 mt-8 max-w-2xl text-lg leading-relaxed text-forest-100">
              APERTESUFORAVEN agrupa a los peritos y técnicos superiores
              forestales de Venezuela, herederos de una escuela que nació con
              un decreto de Rómulo Gallegos en 1948.
            </p>
            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/directorio"
                className="inline-flex items-center gap-2 bg-gold-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-forest-950 transition hover:bg-gold-200"
              >
                Directorio público
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
              >
                Acceso socios
              </Link>
            </div>
          </div>

          {/* Pie institucional del hero */}
          <div className="animate-fade-up delay-400 relative lg:col-span-3">
            <div className="border-l border-gold-500/40 pl-5 text-sm text-forest-100/85">
              <p className="eyebrow !text-gold-200">Sede histórica</p>
              <p className="mt-2 font-serif text-xl leading-snug text-white">
                ETSUFOR — ULA
              </p>
              <p className="mt-1 text-forest-100/75">
                Chorros de Milla, Mérida — Venezuela
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs institucionales */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-rule px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { k: "1948", v: "Año fundacional de la escuela" },
            { k: seccionalesDisponibles.length.toString(), v: "Seccionales activas en el país" },
            { k: totalSocios.toLocaleString("es-VE"), v: "Socios en directorio (datos de prueba)" },
          ].map((kpi, i) => (
            <div key={i} className="px-4 py-8 sm:px-8">
              <p className="font-serif text-4xl font-medium text-forest-800">{kpi.k}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                {kpi.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORIA — editorial */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow">Nuestra historia</p>
            <h2 className="mt-3 max-w-xl text-4xl font-medium text-forest-900 sm:text-5xl">
              De la Escuela de Capacitación Forestal a la ETSUFOR
            </h2>

            <p className="dropcap prose-measure mt-8 text-lg leading-relaxed text-forest-900/85">
              El gremio hunde sus raíces en Mérida, donde en 1948 el entonces
              presidente <strong>Rómulo Gallegos</strong> —autor de{" "}
              <em>Doña Bárbara</em>— firmó el decreto que fundó la Escuela de
              Ingeniería Forestal. De ahí se desprendió la Escuela de
              Capacitación Forestal, que durante décadas formó a los{" "}
              <em>peritos forestales</em>, hasta que en <strong>1997</strong>{" "}
              se transformó en la actual Escuela Técnica Superior Forestal
              (ETSUFOR) de la ULA.
            </p>

            <figure className="mt-10 border-l-2 border-gold-500 pl-6">
              <blockquote className="font-serif text-xl italic leading-snug text-forest-900">
                &ldquo;La defensa del bosque es tarea técnica y es también
                tarea de país.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                Principio gremial · APERTESUFORAVEN
              </figcaption>
            </figure>

            <ol className="mt-12 space-y-7 border-l border-rule pl-7">
              {timeline.map((t, i) => (
                <li
                  key={t.year}
                  className="animate-fade-up relative"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="absolute -left-[33px] top-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-gold-500 bg-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  </span>
                  <p className="font-serif text-lg font-semibold text-forest-800">
                    {t.year}
                  </p>
                  <p className="mt-1 font-medium text-forest-900">{t.titulo}</p>
                  <p className="mt-1 max-w-md text-sm text-forest-900/70">
                    {t.texto}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={bosqueSol}
                  alt="Bosque con luz del amanecer"
                  fill
                  className="object-cover duotone"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-forest-900/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-forest-800/40 via-transparent to-gold-500/15 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-6 -left-4 max-w-xs bg-paper p-6 shadow-md ring-1 ring-rule">
                <p className="eyebrow">Campus universitario</p>
                <p className="mt-2 font-serif text-lg text-forest-900">
                  Chorros de Milla
                </p>
                <p className="mt-1 text-sm text-muted">Mérida, Venezuela</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="rule-top bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Qué hacemos</p>
              <h2 className="mt-3 text-4xl font-medium text-forest-900 sm:text-5xl">
                Una asociación con tres compromisos.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-forest-900/70">
              Tres ejes orientan al gremio: el bosque, el socio y la
              representación institucional. Cada decisión responde a alguno de
              ellos.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-rule sm:grid-cols-3">
            {misiones.map((m, i) => (
              <article
                key={m.titulo}
                className="group relative flex flex-col bg-paper p-8 transition hover:bg-forest-100/40"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    className="object-cover duotone transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-forest-900/25 mix-blend-multiply" />
                </div>
                <p className="font-serif text-sm font-semibold text-gold-700">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-forest-900">
                  {m.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-900/75">
                  {m.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRES NIVELES */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={paramo}
            alt="Páramo venezolano"
            fill
            className="object-cover duotone"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-950/90" />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900/80 to-forest-800/60" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-white">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-gold-200">La plataforma</p>
              <h2 className="mt-3 text-4xl font-medium sm:text-5xl">
                Tres niveles de acceso
              </h2>
              <p className="mt-5 max-w-2xl text-forest-100/85">
                La aplicación respeta la estructura del gremio. Cada nivel
                accede a la información y herramientas que le corresponden.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-gold-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-forest-950 transition hover:bg-gold-200"
              >
                Entrar como miembro
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
            {[
              {
                n: "01",
                titulo: "Dirección Nacional",
                texto:
                  "Panel país: altas, gestión de seccionales, reportes consolidados y comunicaciones oficiales.",
              },
              {
                n: "02",
                titulo: "Seccional",
                texto:
                  "Panel regional: socios de la seccional, convocatorias, cobros y actas.",
              },
              {
                n: "03",
                titulo: "Socio",
                texto:
                  "Carné digital, solvencia, credenciales y oportunidades laborales.",
              },
            ].map((t) => (
              <div
                key={t.n}
                className="relative bg-forest-950/70 p-8 transition hover:bg-forest-900/80"
              >
                <p className="font-serif text-xs font-semibold tracking-[0.25em] text-gold-200">
                  {t.n}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-white">
                  {t.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-100/80">
                  {t.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
