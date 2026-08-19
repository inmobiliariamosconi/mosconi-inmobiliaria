import { Reveal } from "@/components/ui/Reveal";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Glow } from "@/components/ui/Glow";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/lib/content";

export default function ClosingCta() {
  return (
    <section
      id="nosotros"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-28 text-paper sm:py-32"
    >
      <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={560} animate={false} />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
            Nosotros
          </p>
          <p className="mt-6 font-display text-3xl leading-snug font-medium tracking-[-0.01em] sm:text-4xl">
            &ldquo;Donde tus proyectos comienzan a hacerse realidad.&rdquo;
          </p>
          <p className="mt-6 font-display text-2xl text-paper/70 sm:text-3xl">
            {business.yearsActive} años de trayectoria.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-4">
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
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            <FacebookIcon size={18} />
            Seguinos en Facebook
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            <InstagramIcon size={18} />
            Seguinos en Instagram
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <p className="mt-2 font-body text-sm text-paper/55">
            o llamá al{" "}
            <a href={business.phoneUrl} className="text-paper underline decoration-stone-line underline-offset-4 hover:text-pink">
              {business.whatsappNumber}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
