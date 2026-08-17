import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { properties } from "@/lib/properties";

export default function Propiedades() {
  const featured = properties.slice(0, 6);

  return (
    <section className="border-b border-stone-line bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
              Portafolio
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-[-0.01em] text-paper sm:text-5xl">
              Propiedades
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="font-mono text-[0.72rem] tracking-[0.1em] text-paper/70 uppercase transition-colors hover:text-pink"
          >
            Ver todas →
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6">
          {featured.map((property, i) => (
            <Reveal key={property.slug} delay={0.1 + i * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/propiedades"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            Ver todas las propiedades
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
