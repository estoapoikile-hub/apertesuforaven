/** Logo: corte transversal de un tronco (anillos de crecimiento). */
export function Anillos({ className = "h-10 w-10" }: { className?: string }) {
  const anillos = [19, 15.5, 12.2, 9.2, 6.4, 3.8];
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden>
      <circle cx="22" cy="22" r="21" fill="#0f2e25" />
      {anillos.map((r, i) => (
        <ellipse
          key={r}
          cx={22 + i * 0.55}
          cy={22 - i * 0.35}
          rx={r}
          ry={r * 0.94}
          fill="none"
          stroke={i === 2 ? "#f1b82d" : "#5d8a6f"}
          strokeWidth={i === 2 ? 1.6 : 1}
        />
      ))}
      <circle cx={22 + 6 * 0.55} cy={22 - 6 * 0.35} r="1.3" fill="#f1b82d" />
    </svg>
  );
}

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Anillos />
      <span className="leading-tight">
        <span
          className={`block font-display text-[17px] tracking-[0.01em] ${claro ? "text-white" : "text-forest-950"}`}
        >
          APERTESUFORAVEN
        </span>
        <span className={`hidden text-xs sm:block ${claro ? "text-forest-200" : "text-muted"}`}>
          Peritos y técnicos superiores forestales
        </span>
      </span>
    </span>
  );
}
