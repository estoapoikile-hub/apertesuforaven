import type { Metadata } from "next";
import Image from "next/image";
import { demoUsers, rolInfo } from "@/lib/auth/demo-users";
import { LoginForm, type CuentaDemo } from "./login-form";

export const metadata: Metadata = {
  title: "Acceso socios · APERTESUFORAVEN",
};

const foto =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80";

export default function LoginPage() {
  const cuentas: CuentaDemo[] = demoUsers.map((u) => ({
    email: u.email,
    password: u.password,
    nombre: u.nombre,
    cargo: u.cargo,
    iniciales: u.iniciales,
    rol: rolInfo[u.rol].titulo,
    resumen: rolInfo[u.rol].puede[0],
  }));

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      <div className="grid overflow-hidden border border-rule bg-paper shadow-[0_30px_80px_-40px_rgba(13,42,30,0.45)] lg:grid-cols-12">
        {/* Columna visual */}
        <aside className="relative min-h-[260px] min-w-0 overflow-hidden lg:col-span-5 lg:min-h-[720px]">
          <Image
            src={foto}
            alt="Bosque nublado de los Andes venezolanos"
            fill
            priority
            className="object-cover duotone animate-slow-zoom"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/70 to-forest-950/95" />
          <div className="relative flex h-full flex-col justify-between gap-10 p-8 text-white sm:p-10">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-md bg-forest-800 ring-1 ring-gold-500/40">
                <span className="font-serif text-xl font-semibold text-gold-200">A</span>
                <span className="absolute -bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-sm bg-gold-500" />
              </span>
              <div className="leading-tight">
                <p className="font-serif text-base font-semibold">APERTESUFORAVEN</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold-200/90">
                  Área privada
                </p>
              </div>
            </div>

            <div className="animate-fade-up">
              <p className="font-serif text-3xl leading-[1.1] sm:text-4xl">
                Un mismo acceso para todo el{" "}
                <span className="italic text-gold-200">gremio</span>.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-100/80">
                La Dirección Nacional, las seccionales y los socios entran por
                aquí. Cada uno ve solo lo que le corresponde.
              </p>

              <ul className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-forest-100/85">
                {[
                  ["01", "Dirección Nacional", "Gestión de todo el país"],
                  ["02", "Seccionales", "Gestión de su región"],
                  ["03", "Socios", "Carné, solvencia y oportunidades"],
                ].map(([n, t, d]) => (
                  <li key={n} className="flex items-baseline gap-4">
                    <span className="font-serif text-xs font-semibold tracking-[0.2em] text-gold-200">
                      {n}
                    </span>
                    <span>
                      <span className="font-medium text-white">{t}</span>
                      <span className="text-forest-100/60"> · {d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Columna formulario */}
        <div className="flex min-w-0 flex-col justify-center px-6 py-10 sm:px-12 lg:col-span-7 lg:px-16">
          <LoginForm cuentas={cuentas} />
        </div>
      </div>
    </section>
  );
}
