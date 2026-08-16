import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/ui/PropertyGallery";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/content";
import { getPropertyBySlug, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

type PropertyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: `${property.title} | Mosconi Inmobiliaria`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const meta = [
    property.surfaceTotal,
    property.surfaceCovered,
    property.bedrooms ? `${property.bedrooms} dormitorios` : null,
    property.bathrooms ? `${property.bathrooms} baño${property.bathrooms > 1 ? "s" : ""}` : null,
  ].filter((value): value is string => Boolean(value));

  return (
    <section className="bg-ink pt-28 pb-24 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Link
          href="/propiedades"
          className="font-mono text-[0.7rem] tracking-[0.1em] text-stone uppercase transition-colors hover:text-pink"
        >
          ← Volver al portafolio
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <PropertyGallery images={property.images} title={property.title} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-pink/15 px-3 py-1 font-mono text-[0.68rem] tracking-[0.1em] text-pink uppercase ring-1 ring-inset ring-pink/30">
                {property.type}
              </span>
              <span className="rounded-full bg-paper-dim px-3 py-1 font-mono text-[0.68rem] tracking-[0.1em] text-paper/70 uppercase ring-1 ring-inset ring-stone-line">
                {property.operation}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em] text-paper sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 font-body text-sm text-stone">{property.location}</p>

            <p className="mt-6 font-display text-3xl font-medium text-pink">
              {property.price ?? "Consultar precio"}
            </p>

            {meta.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-stone-line pt-5 font-mono text-[0.72rem] tracking-[0.06em] text-paper/70 uppercase">
                {meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}

            <p className="mt-6 font-body text-sm leading-relaxed text-paper/75">
              {property.description}
            </p>

            {property.features.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-body text-sm text-paper/70">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pink" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={whatsappLink(
                `Hola, vi la propiedad "${property.title}" en su página web y quisiera recibir más información.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
            >
              <WhatsAppIcon size={18} />
              Consultar por WhatsApp
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
