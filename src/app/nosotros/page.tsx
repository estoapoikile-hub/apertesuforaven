import Image from "next/image";
import Link from "next/link";

const foto =
  "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1600&q=80";

const principios = [
  {
    n: "I",
    titulo: "Rigor técnico",
    texto:
      "La defensa del bosque se sostiene con datos, criterio profesional y formación continua.",
  },
  {
    n: "II",
    titulo: "Independencia",
    texto:
      "El gremio habla desde la práctica forestal, no desde la coyuntura política.",
  },
  {
    n: "III",
    titulo: "Pertenencia",
    texto:
      "Cada socio es pieza del gremio y cada seccional es puente con el territorio.",
  },
];

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero editorial */}
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0">
          <Image
            src={foto}
            alt="Árboles frondosos"
            fill
            className="object-cover duotone opacity-60"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 to-forest-950" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-28">
          <p className="eyebrow !text-gold-200">Sobre el gremio</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
            Un gremio técnico con raíces universitarias.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-forest-100/85">
            APERTESUFORAVEN representa a los peritos y técnicos superiores
            forestales de Venezuela, formados en la ETSUFOR de la Universidad
            de Los Andes.
          </p>
        </div>
      </section>

      {/* Cuerpo editorial */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rule-top pt-6">
              <p className="eyebrow">Identidad</p>
              <p className="mt-3 font-serif text-xl text-forest-900">
                Asociación de Peritos y Técnicos Superiores Forestales de
                Venezuela
              </p>
            </div>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  Fundación
                </dt>
                <dd className="mt-1 font-serif text-lg text-forest-800">
                  1948
                </dd>
                <dd className="text-xs text-muted">
                  Decreto de Rómulo Gallegos
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  Sede histórica
                </dt>
                <dd className="mt-1 text-forest-900">
                  ETSUFOR · Universidad de Los Andes
                </dd>
                <dd className="text-xs text-muted">
                  Chorros de Milla, Mérida
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  Alcance
                </dt>
                <dd className="mt-1 text-forest-900">Nacional</dd>
                <dd className="text-xs text-muted">
                  Organizado en seccionales regionales
                </dd>
              </div>
            </dl>
          </aside>

          <div className="lg:col-span-8">
            <p className="eyebrow">Quiénes somos</p>
            <h2 className="mt-3 text-3xl font-medium text-forest-900 sm:text-4xl">
              La voz técnica del bosque venezolano
            </h2>

            <div className="prose-measure mt-8 space-y-6 text-forest-900/85">
              <p className="dropcap text-lg leading-relaxed">
                APERTESUFORAVEN es la Asociación de Peritos y Técnicos
                Superiores Forestales de Venezuela: la organización gremial
                que agrupa a los profesionales técnicos del área forestal en
                el país.
              </p>
              <p className="leading-relaxed">
                Está históricamente vinculada a los egresados de la Escuela
                Técnica Superior Forestal de la Universidad de Los Andes
                (ULA), en Mérida, y hoy agrupa a socios de todo el territorio
                nacional organizados en seccionales regionales.
              </p>
              <p className="leading-relaxed">
                Esta plataforma moderniza la gestión del gremio: un
                directorio público verificable, paneles para la Dirección
                Nacional y las seccionales, y un punto único para que el
                socio acceda a su carné, solvencia y oportunidades.
              </p>
            </div>

            {/* Principios */}
            <div className="mt-16">
              <p className="eyebrow">Principios</p>
              <h3 className="mt-3 font-serif text-2xl text-forest-900">
                Tres pilares que orientan al gremio
              </h3>
              <div className="mt-8 grid gap-px bg-rule sm:grid-cols-3">
                {principios.map((p) => (
                  <div key={p.n} className="bg-paper p-6">
                    <p className="font-serif text-2xl font-medium text-gold-700">
                      {p.n}
                    </p>
                    <p className="mt-3 font-serif text-lg text-forest-900">
                      {p.titulo}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-forest-900/75">
                      {p.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
              <Link
                href="/directorio"
                className="inline-flex items-center gap-2 bg-forest-800 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-forest-900"
              >
                Ver directorio
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/seccionales"
                className="inline-flex items-center gap-2 border border-forest-800 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-forest-900 transition hover:bg-forest-100"
              >
                Conocer las seccionales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
