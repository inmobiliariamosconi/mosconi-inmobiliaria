import { Glow } from "@/components/ui/Glow";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-40 pb-20 text-paper sm:pt-44 sm:pb-24">
      <Glow className="left-1/2 top-0 -translate-x-1/2" size={520} animate={false} />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="font-mono text-[0.7rem] tracking-[0.28em] text-pink uppercase">{eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl font-medium tracking-[-0.01em] sm:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-paper/65 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
