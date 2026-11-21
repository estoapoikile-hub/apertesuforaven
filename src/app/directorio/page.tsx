import type { Metadata } from "next";
import { Suspense } from "react";
import { Buscador } from "./buscador";

export const metadata: Metadata = { title: "Directorio de socios | APERTESUFORAVEN" };

export default function DirectorioPage() {
  return (
    <div>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16">
          <h1 className="max-w-3xl text-5xl text-forest-950 sm:text-6xl" style={{ fontStretch: "72%" }}>
            Directorio público de socios
          </h1>
          <p className="prose-measure mt-5 text-lg text-muted">
            Comprueba si un perito o técnico superior forestal está registrado
            en el gremio. Los datos de contacto, los documentos y la solvencia
            solo los ven los socios que han entrado a su panel.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto h-96 max-w-6xl px-4" />}>
        <Buscador />
      </Suspense>
    </div>
  );
}
