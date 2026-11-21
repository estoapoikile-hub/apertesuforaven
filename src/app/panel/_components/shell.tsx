import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/login/actions";
import { rolInfo, type DemoUser } from "@/lib/auth/demo-users";

const tono = {
  super_admin: "bg-gold-500 text-forest-950",
  seccional: "bg-forest-200 text-forest-900",
  socio: "bg-sand text-forest-900",
} as const;

export function PanelShell({
  user,
  titulo,
  subtitulo,
  children,
}: {
  user: DemoUser;
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}) {
  const info = rolInfo[user.rol];

  return (
    <div>
      {/* Cabecera del panel */}
      <section className="relative overflow-hidden bg-forest-950 text-white">
                <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tono[user.rol]}`}
              >
                {info.titulo}
              </span>
              <h1 className="mt-4 text-3xl font-medium sm:text-4xl">{titulo}</h1>
              <p className="mt-2 max-w-xl text-forest-100/75">{subtitulo}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 font-display text-sm font-semibold text-gold-200 ring-1 ring-gold-500/40">
                  {user.iniciales}
                </span>
                <div className="leading-tight">
                  <p className="font-medium">{user.nombre}</p>
                  <p className="text-xs text-forest-100/60">{user.cargo}</p>
                </div>
              </div>
              <form action={logout}>
                <button
                  type="submit"
                  className="border border-white/25 px-3.5 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Salir
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Aviso de demo */}
      <div className="border-b border-rule bg-sand/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs text-forest-900/80">
          <p>
            <span className="font-semibold text-forest-950">Modo demostración.</span>{" "}
            Los datos son de prueba y los cambios no se guardan.
          </p>
          <Link href="/login" className="font-medium text-forest-800 underline-offset-4 hover:underline">
            Probar con otra cuenta
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}

/** Caja con lo que el rol puede y no puede hacer. */
export function PermisosRol({ user }: { user: DemoUser }) {
  const info = rolInfo[user.rol];
  return (
    <aside className="rounded-lg border border-rule bg-paper p-6">
      <h2 className="font-display text-xl text-forest-950">Qué puede hacer este rol</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-forest-900/85">
        {info.puede.map((p) => (
          <li key={p} className="flex gap-2.5">
            <span aria-hidden className="mt-0.5 text-forest-700">✓</span>
            {p}
          </li>
        ))}
      </ul>
      {info.noPuede.length > 0 && (
        <>
          <p className="mt-6 text-xs font-semibold text-muted">
            No puede
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-forest-900/60">
            {info.noPuede.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span aria-hidden className="mt-0.5 text-red-700/70">✕</span>
                {p}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

export function Kpis({ items }: { items: { k: string; v: string; nota?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.v} className="bg-paper px-5 py-6">
          <p className="font-display text-4xl text-forest-950" style={{ fontStretch: "70%" }}>{i.k}</p>
          <p className="mt-1 text-sm text-muted">{i.v}</p>
          {i.nota && <p className="mt-2 text-xs text-gold-700">{i.nota}</p>}
        </div>
      ))}
    </div>
  );
}

export function Bloque({
  titulo,
  accion,
  children,
}: {
  titulo: string;
  accion?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-rule bg-paper">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-6 py-4">
        <h2 className="font-display text-xl text-forest-900">{titulo}</h2>
        {accion}
      </div>
      <div>{children}</div>
    </section>
  );
}

export function PanelSkeleton() {
  return (
    <div>
      <div className="h-[190px] bg-forest-950" />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid animate-pulse grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[110px] bg-paper" />
          ))}
        </div>
        <div className="mt-8 h-80 animate-pulse border border-rule bg-paper" />
      </div>
    </div>
  );
}

export function EstadoPill({ ok, si, no }: { ok: boolean; si: string; no: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ok ? "bg-forest-100 text-forest-800" : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-forest-500" : "bg-amber-500"}`} />
      {ok ? si : no}
    </span>
  );
}
