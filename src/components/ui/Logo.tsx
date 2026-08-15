import Image from "next/image";

/**
 * The source file is a square black canvas with the glowing ring badge
 * inset (margin on all sides). Scaling it up inside a circular mask crops
 * that margin away so it reads as a clean circular badge at any size.
 */
export function LogoMark({ size = 44, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Mosconi Inmobiliaria"
        fill
        sizes={`${size}px`}
        priority={priority}
        className="scale-[1.28] object-cover"
      />
    </span>
  );
}

export function Logo({
  size = 40,
  tone = "dark",
  priority = false,
}: {
  size?: number;
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={size} priority={priority} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-semibold ${
            tone === "dark" ? "text-ink" : "text-paper"
          }`}
        >
          Mosconi
        </span>
        <span
          className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase ${
            tone === "dark" ? "text-stone" : "text-paper/60"
          }`}
        >
          Inmobiliaria
        </span>
      </span>
    </span>
  );
}
