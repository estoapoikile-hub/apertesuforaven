"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "./actions";

export type CuentaDemo = {
  email: string;
  password: string;
  nombre: string;
  cargo: string;
  iniciales: string;
  rol: string;
  resumen: string;
};

const input =
  "mt-2 w-full rounded-sm border border-rule bg-background px-3.5 py-3 text-[15px] text-forest-950 outline-none transition placeholder:text-muted/60 focus:border-forest-700 focus:bg-paper focus:ring-4 focus:ring-forest-200/60";

export function LoginForm({ cuentas }: { cuentas: CuentaDemo[] }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [elegida, setElegida] = useState<string | null>(null);

  function usarCuenta(c: CuentaDemo) {
    setEmail(c.email);
    setPassword(c.password);
    setElegida(c.email);
  }

  return (
    <div className="animate-fade-up">
      <p className="eyebrow">Acceso socios</p>
      <h1 className="mt-3 text-4xl font-medium text-forest-900 sm:text-[2.75rem]">
        Bienvenido de vuelta
      </h1>
      <p className="mt-3 max-w-md text-forest-900/70">
        Entra con tu correo y tu contraseña para ir a tu panel.
      </p>

      <form action={action} className="mt-9 max-w-md">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setElegida(null);
          }}
          placeholder="tu@correo.com"
          className={input}
        />

        <div className="mt-5 flex items-baseline justify-between">
          <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Contraseña
          </label>
          <button
            type="button"
            onClick={() => setVerClave((v) => !v)}
            className="text-xs font-medium text-forest-700 hover:text-forest-900"
          >
            {verClave ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <input
          id="password"
          name="password"
          type={verClave ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setElegida(null);
          }}
          placeholder="••••••••"
          className={input}
        />

        {state?.error && (
          <p
            role="alert"
            className="mt-4 flex items-start gap-2 border-l-2 border-red-700 bg-red-50 px-3 py-2.5 text-sm text-red-900"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group mt-7 flex w-full items-center justify-center gap-2 bg-forest-800 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-forest-900 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Entrando…
            </>
          ) : (
            <>
              Entrar
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </form>

      {/* Cuentas de prueba */}
      <div className="mt-12 max-w-xl">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-rule" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
            Cuentas de prueba
          </p>
          <span className="h-px flex-1 bg-rule" />
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          Toca una cuenta para rellenar el formulario y pulsa «Entrar».
        </p>

        <ul className="mt-5 space-y-2.5">
          {cuentas.map((c) => {
            const activa = elegida === c.email;
            return (
              <li key={c.email}>
                <button
                  type="button"
                  onClick={() => usarCuenta(c)}
                  aria-pressed={activa}
                  className={`group flex w-full items-center gap-4 border px-4 py-3.5 text-left transition ${
                    activa
                      ? "border-forest-700 bg-forest-100/60 ring-1 ring-forest-700"
                      : "border-rule bg-paper hover:border-forest-500 hover:bg-forest-100/30"
                  }`}
                >
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold transition ${
                      activa ? "bg-forest-800 text-gold-200" : "bg-sand text-forest-800"
                    }`}
                  >
                    {c.iniciales}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-serif text-[17px] text-forest-900">{c.rol}</span>
                      <span className="text-xs text-muted">{c.nombre}</span>
                    </span>
                    <span className="mt-0.5 flex flex-wrap gap-x-2 font-mono text-xs text-forest-900/60">
                      <span className="truncate">{c.email}</span>
                      <span className="text-forest-800">{c.password}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`text-sm transition ${
                      activa ? "text-forest-800" : "text-muted/50 group-hover:translate-x-0.5 group-hover:text-forest-700"
                    }`}
                  >
                    {activa ? "✓" : "→"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
