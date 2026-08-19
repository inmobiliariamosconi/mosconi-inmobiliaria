"use client";

import { interiorDepartments, zones } from "@/lib/content";

const operations = ["Todas", "Venta", "Alquiler"];

type PropertyFiltersProps = {
  operation: string;
  onOperationChange: (operation: string) => void;
  zone: string | null;
  onZoneChange: (zone: string | null) => void;
};

export function PropertyFilters({
  operation,
  onOperationChange,
  zone,
  onZoneChange,
}: PropertyFiltersProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-stone-line pb-8">
      <div className="flex flex-wrap gap-2">
        {operations.map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => onOperationChange(op)}
            className={`rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-[0.08em] uppercase transition-colors ${
              operation === op
                ? "bg-pink text-paper"
                : "bg-transparent text-paper/60 ring-1 ring-inset ring-stone-line hover:text-pink"
            }`}
          >
            {op}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onZoneChange(zone === zones[0].name ? null : zones[0].name)}
          className={`rounded-full px-4 py-1.5 font-body text-sm transition-colors ${
            zone === zones[0].name
              ? "bg-pink/10 text-pink ring-1 ring-inset ring-pink/40"
              : "text-stone ring-1 ring-inset ring-stone-line hover:text-pink"
          }`}
        >
          {zones[0].name}
        </button>

        <select
          value={zone && interiorDepartments.includes(zone) ? zone : ""}
          onChange={(e) => onZoneChange(e.target.value || null)}
          className={`rounded-full bg-transparent px-4 py-1.5 font-body text-sm outline-none ring-1 ring-inset transition-colors ${
            zone && interiorDepartments.includes(zone)
              ? "bg-pink/10 text-pink ring-pink/40"
              : "text-stone ring-stone-line hover:text-pink"
          }`}
        >
          <option value="" className="bg-ink text-stone">
            Interior de la provincia
          </option>
          {interiorDepartments.map((name) => (
            <option key={name} value={name} className="bg-ink text-paper">
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
