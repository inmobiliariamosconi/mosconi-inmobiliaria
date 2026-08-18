import type { Metadata } from "next";
import Link from "next/link";
import { PropertiesTable } from "@/components/admin/PropertiesTable";
import { getAllPropertiesForAdmin } from "@/lib/supabase/admin-properties";

export const metadata: Metadata = {
  title: "Propiedades | Admin Mosconi",
  robots: { index: false, follow: false },
};

export default async function AdminPropiedadesPage() {
  const properties = await getAllPropertiesForAdmin();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Propiedades</h1>
          <p className="mt-1 text-sm text-slate-400">{properties.length} en total.</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500"
        >
          + Nueva propiedad
        </Link>
      </div>

      <div className="mt-6">
        <PropertiesTable properties={properties} />
      </div>
    </div>
  );
}
