import type { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { sociosMock } from "@/lib/mock-socios";
import { actasSeccional, convocatoriasSeccional, esSolvente } from "@/lib/mock-panel";
import { Bloque, Kpis, PanelShell, PanelSkeleton, PermisosRol } from "../_components/shell";
import { SociosSeccional } from "../_components/interactivos";

export const metadata: Metadata = { title: "Panel de seccional · APERTESUFORAVEN" };

export default function SeccionalPage() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <SeccionalPanel />
    </Suspense>
  );
}

async function SeccionalPanel() {
  const user = await requireRole("seccional");
  const socios = sociosMock.filter((s) => s.seccional === user.seccional);
  const solventes = socios.filter(esSolvente).length;

  return (
    <PanelShell
      user={user}
      titulo={`Seccional ${user.seccional}`}
      subtitulo={`Gestión de los socios, cuotas y asambleas de la seccional ${user.seccional}. Solo ves los datos de tu región.`}
    >
      <Kpis
        items={[
          { k: socios.length.toString(), v: "Socios de la seccional" },
          { k: solventes.toString(), v: "Solventes 2026" },
          { k: (socios.length - solventes).toString(), v: "Cuotas pendientes", nota: "Puedes registrar el pago" },
          { k: "5 dic", v: "Próxima asamblea" },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Bloque
            titulo="Socios de la seccional"
            accion={
              <button type="button" className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
                + Proponer socio
              </button>
            }
          >
            <SociosSeccional
              socios={socios.map((s) => ({
                id: s.id,
                nombre: `${s.nombre} ${s.apellido}`,
                cedula: s.cedula,
                promocion: s.promocion,
                especialidad: s.especialidad,
                solvente: esSolvente(s),
              }))}
            />
          </Bloque>

          <Bloque
            titulo="Convocatorias"
            accion={
              <button type="button" className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
                + Convocar
              </button>
            }
          >
            <ul className="divide-y divide-rule">
              {convocatoriasSeccional.map((c) => (
                <li key={c.titulo} className="flex items-center gap-5 px-6 py-4">
                  <span className="w-16 shrink-0 whitespace-nowrap font-serif text-lg leading-tight text-forest-800">{c.fecha}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-forest-900">{c.titulo}</p>
                    <p className="text-xs text-muted">{c.lugar}</p>
                  </div>
                  <span className="hidden rounded-full bg-sand px-2.5 py-0.5 text-xs text-forest-900/80 sm:inline">
                    {c.tipo}
                  </span>
                </li>
              ))}
            </ul>
          </Bloque>
        </div>

        <div className="space-y-8">
          <PermisosRol user={user} />

          <Bloque
            titulo="Actas"
            accion={
              <button type="button" className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
                + Subir
              </button>
            }
          >
            <ul className="divide-y divide-rule">
              {actasSeccional.map((a) => (
                <li key={a.titulo} className="flex items-center justify-between gap-3 px-6 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-forest-900">{a.titulo}</p>
                    <p className="text-xs text-muted">{a.fecha}</p>
                  </div>
                  <span className="text-xs font-semibold text-forest-700">PDF</span>
                </li>
              ))}
            </ul>
          </Bloque>
        </div>
      </div>
    </PanelShell>
  );
}
