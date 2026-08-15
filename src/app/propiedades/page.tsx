import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PropertyFilters } from "@/components/ui/PropertyFilters";
import { EmptyPropiedades } from "@/components/ui/EmptyPropiedades";

export const metadata: Metadata = {
  title: "Propiedades | Mosconi Inmobiliaria",
  description:
    "Portafolio de propiedades en venta y alquiler de Mosconi Inmobiliaria en Salta Capital, Zona Norte, Tres Cerritos, San Lorenzo y Vaqueros.",
};

export default function PropiedadesPage() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Propiedades"
        subtitle="Venta y alquiler en Salta Capital, Zona Norte, Tres Cerritos, San Lorenzo y Vaqueros."
      />

      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <PropertyFilters />
          <div className="mt-10">
            <EmptyPropiedades />
          </div>
        </div>
      </section>
    </>
  );
}
