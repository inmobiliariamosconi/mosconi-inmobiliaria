import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { updateProperty } from "@/app/admin/propiedades/actions";
import { getPropertyByIdForAdmin } from "@/lib/supabase/admin-properties";

export const metadata: Metadata = {
  title: "Editar propiedad | Admin Mosconi",
  robots: { index: false, follow: false },
};

type EditarPropiedadPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarPropiedadPage({ params }: EditarPropiedadPageProps) {
  const { id } = await params;
  const property = await getPropertyByIdForAdmin(id);
  if (!property) notFound();

  const updatePropertyWithId = updateProperty.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Editar propiedad</h1>
      <p className="mt-1 text-sm text-slate-400">{property.title}</p>

      <div className="mt-6 max-w-3xl">
        <PropertyForm mode="edit" action={updatePropertyWithId} property={property} />
      </div>
    </div>
  );
}
