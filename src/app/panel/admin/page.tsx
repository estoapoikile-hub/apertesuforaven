import type { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/auth/session";
import { sociosMock } from "@/lib/mock-socios";
import { comunicados, esSolvente, resumenSeccionales, solicitudesIngreso } from "@/lib/mock-panel";
import { Bloque, Kpis, PanelShell, PanelSkeleton, PermisosRol } from "../_components/shell";
import { SolicitudesIngreso } from "../_components/interactivos";

export const metadata: Metadata = { title: "Dirección Nacional · APERTESUFORAVEN" };

export default function AdminPage() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <AdminPanel />
    </Suspense>
  );
}

async function AdminPanel() {
  const user = await requireRole("super_admin");
  const seccionales = resumenSeccionales();
  const total = sociosMock.length;
  const solventes = sociosMock.filter(esSolvente).length;

  return (
    <PanelShell
      user={user}
      titulo="Panel de la Dirección Nacional"
      subtitulo="Vista de todo el gremio: seccionales, socios, solicitudes y comunicados."
    >
      <Kpis
        items={[
          { k: total.toString(), v: "Socios en el país" },
          { k: `${Math.round((solventes / total) * 100)}%`, v: "Solvencia nacional", nota: `${solventes} socios al día` },
          { k: seccionales.length.toString(), v: "Seccionales activas" },
          { k: solicitudesIngreso.length.toString(), v: "Solicitudes por revisar", nota: "Requieren tu aprobación" },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Bloque
            titulo="Solicitudes de ingreso"
            accion={<span className="text-xs text-muted">Llegan desde las seccionales</span>}
          >
            <SolicitudesIngreso solicitudes={solicitudesIngreso} />
          </Bloque>

          <Bloque
            titulo="Seccionales"
            accion={
              <button type="button" className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
                + Nueva seccional
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-rule text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                    <th className="px-6 py-3 font-semibold">Seccional</th>
                    <th className="px-3 py-3 font-semibold">Presidencia</th>
                    <th className="px-3 py-3 text-right font-semibold">Socios</th>
                    <th className="px-6 py-3 font-semibold">Solvencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {seccionales.map((s) => (
                    <tr key={s.nombre} className="transition hover:bg-forest-100/25">
                      <td className="px-6 py-3 font-medium text-forest-900">{s.nombre}</td>
                      <td className="px-3 py-3 text-forest-900/75">{s.presidente}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-forest-900/80">{s.total}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-forest-100">
                            <div className="h-full rounded-full bg-forest-500" style={{ width: `${s.solvencia}%` }} />
                          </div>
                          <span className="w-9 text-xs tabular-nums text-muted">{s.solvencia}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Bloque>
        </div>

        <div className="space-y-8">
          <PermisosRol user={user} />

          <Bloque
            titulo="Comunicados"
            accion={
              <button type="button" className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-700 hover:text-forest-900">
                + Publicar
              </button>
            }
          >
            <ul className="divide-y divide-rule">
              {comunicados.map((c) => (
                <li key={c.titulo} className="px-6 py-4">
                  <p className="text-xs text-muted">{c.fecha} · {c.alcance}</p>
                  <p className="mt-1 font-medium leading-snug text-forest-900">{c.titulo}</p>
                </li>
              ))}
            </ul>
          </Bloque>
        </div>
      </div>
    </PanelShell>
  );
}
