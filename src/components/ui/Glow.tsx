type GlowProps = {
  className?: string;
  size?: number;
  color?: "pink" | "bright";
  animate?: boolean;
};

/** Ambient radial bloom lifted from the brand mark's own glow, reused as a signature atmospheric device. */
export function Glow({ className = "", size = 480, color = "pink", animate = true }: GlowProps) {
  const stop = color === "bright" ? "var(--color-pink-bright)" : "var(--color-pink)";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[100px] ${
        animate ? "animate-pulse-glow" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${stop} 0%, transparent 70%)`,
        opacity: 0.5,
      }}
    />
  );
}
