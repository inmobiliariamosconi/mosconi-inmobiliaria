import type { Metadata } from "next";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { createProperty } from "@/app/admin/propiedades/actions";

export const metadata: Metadata = {
  title: "Nueva propiedad | Admin Mosconi",
  robots: { index: false, follow: false },
};

export default function NuevaPropiedadPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Nueva propiedad</h1>
      <p className="mt-1 text-sm text-slate-400">Completá los datos y guardá para publicarla.</p>

      <div className="mt-6 max-w-3xl">
        <PropertyForm mode="create" action={createProperty} />
      </div>
    </div>
  );
}
