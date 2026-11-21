/** Iniciales dentro de anillos de crecimiento, como el logo. */
export function AvatarAnillos({
  iniciales,
  activo,
  grande = false,
}: {
  iniciales: string;
  activo: boolean;
  grande?: boolean;
}) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${grande ? "h-28 w-28" : "h-14 w-14"}`}>
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="28" cy="28" r="28" fill={activo ? "#0f2e25" : "#c4d4c4"} />
        {[25, 21.5].map((r, i) => (
          <ellipse
            key={r}
            cx={28 + i * 0.6}
            cy={28 - i * 0.4}
            rx={r}
            ry={r * 0.95}
            fill="none"
            stroke={i === 0 && activo ? "#f1b82d" : activo ? "#5d8a6f" : "#ffffff"}
            strokeOpacity={activo ? 0.9 : 0.7}
            strokeWidth={1.2}
          />
        ))}
      </svg>
      <span
        className={`relative font-display ${grande ? "text-4xl" : "text-lg"} ${activo ? "text-gold-200" : "text-forest-950"}`}
        style={{ fontStretch: "80%" }}
      >
        {iniciales}
      </span>
    </span>
  );
}
