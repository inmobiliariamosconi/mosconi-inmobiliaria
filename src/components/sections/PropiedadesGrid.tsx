"use client";

import { useMemo, useState } from "react";
import { PropertyFilters } from "@/components/ui/PropertyFilters";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { properties } from "@/lib/properties";

export function PropiedadesGrid() {
  const [operation, setOperation] = useState("Todas");
  const [zone, setZone] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        const matchesOperation = operation === "Todas" || p.operation === operation;
        const matchesZone = !zone || p.zone === zone;
        return matchesOperation && matchesZone;
      }),
    [operation, zone],
  );

  return (
    <div>
      <PropertyFilters
        operation={operation}
        onOperationChange={setOperation}
        zone={zone}
        onZoneChange={setZone}
      />

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property, i) => (
            <Reveal key={property.slug} delay={(i % 3) * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-stone-line bg-ink-soft px-8 py-16 text-center">
          <h3 className="font-display text-xl font-medium text-paper">
            No hay propiedades con esos filtros
          </h3>
          <p className="max-w-md font-body text-sm leading-relaxed text-stone">
            Probá con otra combinación de operación y zona, o escribinos y te contamos qué tenemos
            disponible.
          </p>
          <button
            type="button"
            onClick={() => {
              setOperation("Todas");
              setZone(null);
            }}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            Ver todas las propiedades
          </button>
        </div>
      )}
    </div>
  );
}
