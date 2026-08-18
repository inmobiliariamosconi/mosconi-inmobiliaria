import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminStats } from "@/lib/supabase/admin-properties";

export const metadata: Metadata = {
  title: "Dashboard | Admin Mosconi",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Resumen del portafolio de propiedades.</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500"
        >
          + Nueva propiedad
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Propiedades totales" value={stats.total} />
        <StatCard label="Publicadas" value={stats.published} />
        <StatCard label="Ocultas / borrador" value={stats.hidden} />
        <StatCard label="Destacadas" value={stats.featured} />
      </div>

      <div className="mt-8">
        <Link
          href="/admin/propiedades"
          className="text-sm font-medium text-pink-400 hover:text-pink-300"
        >
          Ver todas las propiedades →
        </Link>
      </div>
    </div>
  );
}
