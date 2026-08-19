import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/lib/content";

export default function Ubicacion() {
  return (
    <section className="bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
            Dónde nos encontramos
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-[-0.01em] text-paper sm:text-5xl">
            Visitanos en Salta
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-stone-line">
            <iframe
              src={business.mapsEmbedUrl}
              title="Ubicación de G Mosconi Inmobiliaria en el mapa"
              className="h-80 w-full sm:h-96"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] text-paper uppercase ring-1 ring-paper/25 ring-inset transition-colors hover:text-pink hover:ring-pink"
          >
            Ver en Google Maps
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
