import type { Metadata } from "next";
import { CurvasDeNivel } from "@/components/curvas-de-nivel";
import { Marca } from "@/components/marca";
import { demoUsers, rolInfo } from "@/lib/auth/demo-users";
import { LoginForm, type CuentaDemo } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar | APERTESUFORAVEN",
};

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
      <div className="grid overflow-hidden rounded-xl border border-rule bg-paper lg:grid-cols-12">
        {/* Columna visual */}
        <aside className="relative isolate min-h-[240px] min-w-0 overflow-hidden bg-forest-950 lg:col-span-5 lg:min-h-[700px]">
          <CurvasDeNivel className="absolute inset-0 -z-10 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/20" />
          <div className="flex h-full flex-col justify-between gap-12 p-8 text-white sm:p-10">
            <Marca claro />
            <div>
              <p className="font-display text-4xl leading-[1.02]" style={{ fontStretch: "72%" }}>
                Un mismo acceso para todo el gremio
              </p>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-forest-100/80">
                La Dirección Nacional, las seccionales y los socios entran por
                aquí. Cada uno ve solo lo que le corresponde.
              </p>
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
