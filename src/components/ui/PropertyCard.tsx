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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-line bg-paper-dim transition-colors hover:border-pink"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-4 sm:top-4 sm:gap-2">
          <span className="rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.06em] text-paper uppercase backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.1em]">
            {property.type}
          </span>
          <span className="rounded-full bg-pink px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.06em] text-paper uppercase sm:px-3 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.1em]">
            {property.operation}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-6">
        <h3 className="font-display text-sm leading-snug font-medium text-paper sm:text-lg">
          {property.title}
        </h3>
        <p className="font-body text-xs text-stone sm:text-sm">{property.location}</p>

        {meta.length > 0 && (
          <p className="font-mono text-[0.6rem] tracking-[0.04em] text-paper/50 uppercase sm:text-[0.68rem] sm:tracking-[0.08em]">
            {meta.join(" · ")}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
          <span className="font-display text-base font-medium text-pink sm:text-xl">
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
