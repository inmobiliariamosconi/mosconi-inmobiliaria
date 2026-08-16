import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  const meta = [
    property.surfaceTotal,
    property.bedrooms ? `${property.bedrooms} dorm.` : null,
    property.bathrooms ? `${property.bathrooms} baño${property.bathrooms > 1 ? "s" : ""}` : null,
  ].filter(Boolean);

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-line bg-paper-dim transition-colors hover:border-pink"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.65rem] tracking-[0.1em] text-paper uppercase backdrop-blur-sm">
            {property.type}
          </span>
          <span className="rounded-full bg-pink px-3 py-1 font-mono text-[0.65rem] tracking-[0.1em] text-paper uppercase">
            {property.operation}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg leading-snug font-medium text-paper">{property.title}</h3>
        <p className="font-body text-sm text-stone">{property.location}</p>

        {meta.length > 0 && (
          <p className="font-mono text-[0.68rem] tracking-[0.08em] text-paper/50 uppercase">
            {meta.join(" · ")}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-medium text-pink">
            {property.price ?? "Consultar precio"}
          </span>
          <span
            aria-hidden
            className="font-mono text-xs text-paper/50 transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
