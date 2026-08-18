import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, zones } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tasaciones | Mosconi Inmobiliaria",
  description:
    "Tasamos tu propiedad en Salta con criterio profesional y conocimiento actualizado del mercado inmobiliario.",
};

export default function TasacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tasaciones"
        title="Conocé el valor real de tu propiedad"
        subtitle="Tasamos tu propiedad con criterio profesional y conocimiento actualizado del mercado inmobiliario de Salta, ya sea para vender, alquilar o simplemente saber en qué punto estás parado."
      />

      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <a
              href={whatsappLink("Hola, quiero una tasación de mi propiedad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-5 rounded-2xl border border-stone-line bg-paper-dim px-8 py-14 text-center transition-colors hover:border-pink"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pink/15 text-pink ring-1 ring-pink/30 transition-colors group-hover:bg-pink group-hover:text-paper">
                <WhatsAppIcon size={24} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-medium text-paper">
                  Pedí tu tasación por WhatsApp
                </h2>
                <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-stone">
                  Contanos dónde está tu propiedad y coordinamos una visita para tasarla.
                </p>
              </div>
              <span className="font-mono text-[0.72rem] tracking-[0.1em] text-pink uppercase">
                Escribinos →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-stone uppercase">
              Tasamos propiedades en
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {zones.map((zone) => (
                <span key={zone.name} className="font-body text-sm text-paper/70">
                  {zone.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
