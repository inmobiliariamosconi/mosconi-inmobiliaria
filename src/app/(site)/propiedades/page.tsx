import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PropiedadesGrid } from "@/components/sections/PropiedadesGrid";
import { getPublishedProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Propiedades | Mosconi Inmobiliaria",
  description:
    "Portafolio de propiedades en venta y alquiler de Mosconi Inmobiliaria en Salta Capital, Zona Norte, Tres Cerritos, San Lorenzo y Vaqueros.",
};

export default async function PropiedadesPage() {
  const properties = await getPublishedProperties();

  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Propiedades"
        subtitle="Venta y alquiler en Salta Capital, Zona Norte, Tres Cerritos, San Lorenzo y Vaqueros."
      />

      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <PropiedadesGrid properties={properties} />
        </div>
      </section>
    </>
  );
}
