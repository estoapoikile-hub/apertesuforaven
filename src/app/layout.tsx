import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APERTESUFORAVEN — Asociación de Peritos y Técnicos Superiores Forestales de Venezuela",
  description:
    "Asociación gremial de los peritos y técnicos superiores forestales de Venezuela. Directorio público verificable, seccionales regionales y acceso privado para socios.",
};

function Shield() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md bg-forest-800 shadow-sm ring-1 ring-forest-950/20"
    >
      <span className="font-serif text-xl font-semibold leading-none text-gold-200">
        A
      </span>
      <span className="absolute -bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-sm bg-gold-500" />
    </span>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Barra institucional superior */}
        <div className="hidden bg-forest-950 text-forest-100 md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[11px] tracking-wide">
            <p className="uppercase tracking-[0.18em] text-forest-100/80">
              Gremio forestal · Mérida, Venezuela · Fundado 1948
            </p>
            <div className="flex items-center gap-5">
              <a href="mailto:contacto@apertesuforaven.com" className="text-forest-100/80 hover:text-white">
                contacto@apertesuforaven.com
              </a>
              <span aria-hidden className="h-3 w-px bg-forest-100/20" />
              <Link href="/login" className="text-forest-100/80 hover:text-white">
                Área de socios
              </Link>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Shield />
              <span className="leading-tight">
                <span className="block font-serif text-base font-semibold tracking-tight text-forest-900">
                  APERTESUFORAVEN
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted">
                  Peritos · Técnicos Superiores Forestales
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-7 text-sm text-forest-900">
              <Link href="/directorio" className="nav-link">Directorio</Link>
              <Link href="/seccionales" className="nav-link">Seccionales</Link>
              <Link href="/nosotros" className="nav-link">Nosotros</Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-sm bg-forest-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-forest-900"
              >
                Acceso socios
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer institucional */}
        <footer className="mt-20 border-t border-rule bg-forest-950 text-forest-100">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <Shield />
                  <div>
                    <p className="font-serif text-lg text-white">APERTESUFORAVEN</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-forest-200">
                      Gremio forestal de Venezuela
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-100/75">
                  Asociación de Peritos y Técnicos Superiores Forestales de
                  Venezuela. Egresados de la Escuela Técnica Superior Forestal
                  de la Universidad de Los Andes, Mérida.
                </p>
              </div>

              <div>
                <p className="eyebrow !text-gold-200/90">Plataforma</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/directorio" className="hover:text-white">Directorio público</Link></li>
                  <li><Link href="/seccionales" className="hover:text-white">Seccionales</Link></li>
                  <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
                  <li><Link href="/login" className="hover:text-white">Acceso socios</Link></li>
                </ul>
              </div>

              <div>
                <p className="eyebrow !text-gold-200/90">Contacto</p>
                <ul className="mt-4 space-y-2 text-sm text-forest-100/80">
                  <li>Mérida, Venezuela</li>
                  <li>
                    <a href="mailto:contacto@apertesuforaven.com" className="hover:text-white">
                      contacto@apertesuforaven.com
                    </a>
                  </li>
                  <li>ETSUFOR · ULA · Chorros de Milla</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-forest-100/60 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 APERTESUFORAVEN · Todos los derechos reservados</p>
              <p className="uppercase tracking-[0.2em]">
                Decreto fundacional 1948 · Rómulo Gallegos
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
