import { Reveal } from "@/components/ui/Reveal";
import { Glow } from "@/components/ui/Glow";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/lib/content";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper sm:py-32">
      <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={560} animate={false} />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
            Nosotros
          </p>
          <p className="mt-6 font-display text-3xl leading-snug font-medium tracking-[-0.01em] sm:text-4xl">
            &ldquo;Acompañamos cada operación con transparencia y profesionalismo, para que la
            decisión más grande se sienta simple.&rdquo;
          </p>
          <p className="mt-6 font-body text-sm text-paper/55">
            Más de {business.yearsActive} años de confianza, resultados y trayectoria en Salta.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            <WhatsAppIcon size={18} />
            Escribinos por WhatsApp
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
