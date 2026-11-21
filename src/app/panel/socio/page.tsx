import type { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { sociosMock } from "@/lib/mock-socios";
import { esSolvente, eventosSocio, mesesCuota, oportunidades } from "@/lib/mock-panel";
import { Bloque, EstadoPill, PanelShell, PanelSkeleton, PermisosRol } from "../_components/shell";

export const metadata: Metadata = { title: "Mi panel · APERTESUFORAVEN" };

export default function SocioPage() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <SocioPanel />
    </Suspense>
  );
}

/** Patrón tipo QR, determinista (solo decorativo en la demo). */
function CodigoVerificacion({ semilla }: { semilla: string }) {
  const n = 21;
  let h = [...semilla].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const celdas: [number, number][] = [];
  const enFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (enFinder(x, y)) continue;
      h = (h * 1103515245 + 12345) >>> 0;
      if ((h >>> 16) % 2 === 0) celdas.push([x, y]);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="#0d2a1e" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#0d2a1e" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#fff" />
      {celdas.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} fill="#0d2a1e" />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

async function SocioPanel() {
  const user = await requireRole("socio");
  const socio = sociosMock.find((s) => s.id === user.socioId);
  const solvente = socio ? esSolvente(socio) : false;
  const mesActual = 10; // noviembre (0 = enero)

  return (
    <PanelShell
      user={user}
      titulo={`Hola, ${user.nombre.split(" ")[0]}`}
      subtitulo="Tu carné digital, tu solvencia y las novedades del gremio."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Carné digital */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 p-7 text-white shadow-[0_30px_60px_-30px_rgba(13,42,30,0.7)] ring-1 ring-gold-500/30 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-500/15" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-gold-500/20" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-700 via-gold-200 to-gold-700" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-200">
                  Carné de socio
                </p>
                <p className="mt-1 font-serif text-lg">APERTESUFORAVEN</p>
              </div>
              <EstadoPill ok={solvente} si="Solvente 2026" no="Cuota pendiente" />
            </div>

            <div className="relative mt-8 flex items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="font-serif text-3xl leading-tight sm:text-[2.1rem]">{user.nombre}</p>
                <p className="mt-1 text-sm text-forest-100/75">{user.titulo}</p>

                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    ["Cédula", socio?.cedula ?? "—"],
                    ["N.º de socio", socio?.id ?? "—"],
                    ["Seccional", user.seccional ?? "—"],
                    ["Promoción", socio?.promocion.toString() ?? "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-forest-100/55">{k}</dt>
                      <dd className="mt-0.5 font-medium tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="hidden h-28 w-28 shrink-0 rounded-md bg-white p-1.5 sm:block">
                <CodigoVerificacion semilla={socio?.id ?? user.id} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <button type="button" className="font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
              Descargar PDF
            </button>
            <button type="button" className="font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
              Añadir al móvil
            </button>
            <span className="text-muted">Cualquiera puede verificarlo en el directorio público.</span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <PermisosRol user={user} />
        </div>
      </div>

      {/* Cuotas */}
      <div className="mt-8">
        <Bloque
          titulo="Mis cuotas 2026"
          accion={<span className="text-xs text-muted">Especialidad: {socio?.especialidad}</span>}
        >
          <div className="grid grid-cols-4 gap-px bg-rule sm:grid-cols-6 lg:grid-cols-12">
            {mesesCuota.map((m, i) => {
              const pagado = solvente ? i <= mesActual : i < 6;
              const futuro = i > mesActual;
              return (
                <div key={m} className="bg-paper px-3 py-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{m}</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      pagado ? "text-forest-700" : futuro ? "text-muted/50" : "text-amber-700"
                    }`}
                  >
                    {pagado ? "✓" : futuro ? "—" : "Debe"}
                  </p>
                </div>
              );
            })}
          </div>
        </Bloque>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Bloque titulo="Oportunidades laborales">
          <ul className="divide-y divide-rule">
            {oportunidades.map((o) => (
              <li key={o.titulo} className="group px-6 py-4 transition hover:bg-forest-100/25">
                <p className="font-medium text-forest-900">{o.titulo}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {o.empresa} · {o.lugar} · {o.tipo}
                </p>
              </li>
            ))}
          </ul>
        </Bloque>

        <Bloque titulo="Próximos eventos">
          <ul className="divide-y divide-rule">
            {eventosSocio.map((e) => (
              <li key={e.titulo} className="flex items-center gap-5 px-6 py-4">
                <span className="w-14 shrink-0 font-serif text-lg text-forest-800">{e.fecha}</span>
                <div>
                  <p className="font-medium text-forest-900">{e.titulo}</p>
                  <p className="text-xs text-muted">{e.lugar}</p>
                </div>
              </li>
            ))}
          </ul>
        </Bloque>
      </div>
    </PanelShell>
  );
}
