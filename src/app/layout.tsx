import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { Marca } from "@/components/marca";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APERTESUFORAVEN — Asociación de Peritos y Técnicos Superiores Forestales de Venezuela",
  description:
    "Asociación gremial de los peritos y técnicos superiores forestales de Venezuela. Directorio público verificable, seccionales regionales y acceso privado para socios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="sticky top-0 z-30 border-b border-rule bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
            <Link href="/" aria-label="APERTESUFORAVEN, inicio">
              <Marca />
            </Link>
            <nav className="flex items-center gap-4 text-[15px] text-forest-950 sm:gap-7">
              <Link href="/directorio" className="nav-link hidden md:inline">Directorio</Link>
              <Link href="/seccionales" className="nav-link hidden md:inline">Seccionales</Link>
              <Link href="/nosotros" className="nav-link hidden md:inline">Nosotros</Link>
              <Link
                href="/login"
                className="inline-flex shrink-0 items-center rounded-md bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-950"
              >
                Entrar
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 bg-forest-950 text-forest-100">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <Marca claro />
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-100/75">
                  Asociación de Peritos y Técnicos Superiores Forestales de
                  Venezuela. Egresados de la Escuela Técnica Superior Forestal
                  de la Universidad de Los Andes, en Mérida.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold-500">Plataforma</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/directorio" className="hover:text-white">Directorio público</Link></li>
                  <li><Link href="/seccionales" className="hover:text-white">Seccionales</Link></li>
                  <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
                  <li><Link href="/login" className="hover:text-white">Entrar a mi panel</Link></li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold-500">Contacto</p>
                <ul className="mt-4 space-y-2 text-sm text-forest-100/80">
                  <li>
                    <a href="mailto:contacto@apertesuforaven.com" className="hover:text-white">
                      contacto@apertesuforaven.com
                    </a>
                  </li>
                  <li>ETSUFOR, Universidad de Los Andes</li>
                  <li>Chorros de Milla, Mérida</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-forest-100/60 sm:flex-row sm:justify-between">
              <p>© 2026 APERTESUFORAVEN. Todos los derechos reservados.</p>
              <p>8°37′ N, 71°09′ O</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
