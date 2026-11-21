/**
 * Curvas de nivel generadas (deterministas) que evocan la Sierra Nevada
 * de Mérida. Cada quinta curva es "maestra" (más gruesa), como en los
 * mapas topográficos. Se dibujan una sola vez al cargar.
 */

type Pico = { x: number; y: number; r: number; niveles: number; semilla: number };

const ANCHO = 1200;
const ALTO = 760;

const picos: Pico[] = [
  { x: 820, y: 300, r: 430, niveles: 22, semilla: 1.3 }, // Pico Bolívar
  { x: 1130, y: 650, r: 260, niveles: 11, semilla: 4.1 },
  { x: 420, y: 760, r: 300, niveles: 12, semilla: 2.7 },
];

function curva(p: Pico, nivel: number) {
  const t = nivel / p.niveles;
  const R = p.r * (1 - t * 0.93);
  const fase = p.semilla + t * 1.6;
  const puntos: string[] = [];
  const pasos = 120;
  for (let i = 0; i <= pasos; i++) {
    const a = (i / pasos) * Math.PI * 2;
    const ondula =
      1 +
      0.16 * Math.sin(2 * a + fase) +
      0.09 * Math.sin(3 * a + fase * 1.7) +
      0.05 * Math.sin(5 * a + fase * 2.3) * (1 - t);
    const x = p.x + Math.cos(a) * R * ondula * 1.18;
    const y = p.y + Math.sin(a) * R * ondula * 0.82;
    puntos.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return puntos.join("") + "Z";
}

export function CurvasDeNivel({ className = "" }: { className?: string }) {
  let orden = 0;
  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      {picos.map((p) =>
        Array.from({ length: p.niveles }, (_, n) => {
          const maestra = n % 5 === 0;
          const delay = 0.15 + orden++ * 0.035;
          return (
            <path
              key={`${p.x}-${n}`}
              d={curva(p, n)}
              pathLength={1}
              className="curva"
              style={{ animationDelay: `${delay}s` }}
              fill="none"
              stroke={maestra ? "#5d8a6f" : "#3b6c53"}
              strokeOpacity={maestra ? 0.9 : 0.5}
              strokeWidth={maestra ? 1.6 : 0.9}
            />
          );
        }),
      )}
      {/* Cumbre */}
      <g className="aparecer" style={{ animationDelay: "1.6s" }}>
        <path d="M820 289 l7 12 h-14 z" fill="#f1b82d" />
        <text x="836" y="300" fill="#f8dc8f" fontSize="17" fontWeight="600" fontFamily="var(--font-archivo)">
          Pico Bolívar, 4978 m
        </text>
      </g>
    </svg>
  );
}

/* ---------- Mapa pequeño por región (estático, sin animación) ---------- */

function hash(texto: string) {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
}

/** Mini mapa topográfico único para cada nombre (misma semilla, mismo mapa). */
export function MiniMapa({ semilla, className = "" }: { semilla: string; className?: string }) {
  const h = hash(semilla);
  const r = (n: number) => ((h >>> (n * 3)) % 1000) / 1000;
  const picos: Pico[] = [
    { x: 380 + r(1) * 500, y: 120 + r(2) * 200, r: 300 + r(3) * 120, niveles: 13, semilla: r(4) * 6 },
    { x: 120 + r(5) * 300, y: 420 + r(6) * 160, r: 200 + r(7) * 80, niveles: 8, semilla: r(8) * 6 },
  ];
  return (
    <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {picos.map((p) =>
        Array.from({ length: p.niveles }, (_, n) => {
          const maestra = n % 5 === 0;
          return (
            <path
              key={`${p.x}-${n}`}
              d={curva(p, n)}
              fill="none"
              stroke={maestra ? "#f1b82d" : "#5d8a6f"}
              strokeOpacity={maestra ? 0.55 : 0.6}
              strokeWidth={maestra ? 1.4 : 0.8}
              vectorEffect="non-scaling-stroke"
            />
          );
        }),
      )}
    </svg>
  );
}
