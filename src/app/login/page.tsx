"use client";

import Image from "next/image";
import { useState } from "react";
import type { Rol } from "@/lib/types";

const foto =
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80";

const roles: { id: Rol; titulo: string; descripcion: string }[] = [
  {
    id: "dir_nacional",
    titulo: "Dirección Nacional",
    descripcion: "Gestión global, reportes y comunicaciones del gremio.",
  },
  {
    id: "seccional",
    titulo: "Seccional",
    descripcion: "Panel regional: socios y gestión local.",
  },
  {
    id: "socio",
    titulo: "Socio",
    descripcion: "Carné digital, solvencia y oportunidades.",
  },
];

export default function LoginPage() {
  const [rol, setRol] = useState<Rol>("socio");

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
      {/* Columna visual */}
      <aside className="relative hidden overflow-hidden rounded-sm lg:col-span-5 lg:block">
        <Image
          src={foto}
          alt="Bosque nublado"
          fill
          className="object-cover duotone"
          sizes="40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/85 via-forest-900/70 to-forest-800/60" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <p className="eyebrow !text-gold-200">Área privada</p>
          <div>
            <p className="font-serif text-3xl leading-tight">
              Credenciales únicas para todo el gremio.
            </p>
            <p className="mt-4 max-w-sm text-sm text-forest-100/80">
              Dirección Nacional, seccionales y socios acceden desde el mismo
              punto, con los permisos que corresponden a cada nivel.
            </p>
          </div>
        </div>
      </aside>

      {/* Columna formulario */}
      <div className="lg:col-span-7">
        <p className="eyebrow">Acceso socios</p>
        <h1 className="mt-3 text-4xl font-medium text-forest-900 sm:text-5xl">
          Entrá a tu panel
        </h1>
        <p className="mt-4 max-w-xl text-forest-900/75">
          Seleccioná tu tipo de acceso. Las cuentas y la autenticación aún no
          están activas; esta pantalla es la base sobre la que se conectará
          Supabase.
        </p>

        <div className="mt-10 grid gap-px bg-rule sm:grid-cols-3">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRol(r.id)}
              className={`group relative flex flex-col bg-paper p-5 text-left transition ${
                rol === r.id
                  ? "bg-forest-100/60 ring-1 ring-forest-700"
                  : "hover:bg-forest-100/30"
              }`}
            >
              {rol === r.id && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gold-500"
                />
              )}
              <h2 className="font-serif text-lg text-forest-900">{r.titulo}</h2>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/70">
                {r.descripcion}
              </p>
            </button>
          ))}
        </div>

        <form
          className="mt-10 max-w-md border border-rule bg-paper p-7"
          onSubmit={(e) => {
            e.preventDefault();
            alert(`(Mock) Intentando acceder como: ${rol}`);
          }}
        >
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Correo o cédula
          </label>
          <input
            type="text"
            className="mt-1.5 w-full rounded-sm border border-rule bg-background px-3 py-2.5 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-200"
            placeholder="correo@dominio.com  ·  V-12345678"
            required
          />
          <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Contraseña
          </label>
          <input
            type="password"
            className="mt-1.5 w-full rounded-sm border border-rule bg-background px-3 py-2.5 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-200"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            className="mt-7 w-full bg-forest-800 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-forest-900"
          >
            Entrar como {roles.find((r) => r.id === rol)?.titulo}
          </button>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.15em] text-muted">
            Autenticación pendiente — se conectará a Supabase
          </p>
        </form>
      </div>
    </section>
  );
}
