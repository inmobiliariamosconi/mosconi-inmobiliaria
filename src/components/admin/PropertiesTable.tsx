"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AdminPropertyListItem } from "@/lib/supabase/admin-properties";
import { deleteProperty, setFeatured, setPublished } from "@/app/admin/propiedades/actions";

function formatPrice(price: number | null, currency: string) {
  if (price == null) return "—";
  return `${currency} ${new Intl.NumberFormat("es-AR").format(price)}`;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
    new Date(iso),
  );
}

export function PropertiesTable({ properties }: { properties: AdminPropertyListItem[] }) {
  const [items, setItems] = useState(properties);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleTogglePublished(item: AdminPropertyListItem) {
    setPendingId(item.id);
    const next = !item.published;
    setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, published: next } : p)));
    startTransition(async () => {
      try {
        await setPublished(item.id, next);
      } catch {
        setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, published: !next } : p)));
      } finally {
        setPendingId(null);
      }
    });
  }

  function handleToggleFeatured(item: AdminPropertyListItem) {
    setPendingId(item.id);
    const next = !item.featured;
    setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, featured: next } : p)));
    startTransition(async () => {
      try {
        await setFeatured(item.id, next);
      } catch {
        setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, featured: !next } : p)));
      } finally {
        setPendingId(null);
      }
    });
  }

  function handleDelete(item: AdminPropertyListItem) {
    if (!window.confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) return;

    setPendingId(item.id);
    startTransition(async () => {
      try {
        await deleteProperty(item.id);
        setItems((prev) => prev.filter((p) => p.id !== item.id));
      } catch {
        window.alert("No se pudo eliminar la propiedad. Probá de nuevo.");
      } finally {
        setPendingId(null);
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-8 py-16 text-center">
        <p className="text-slate-300">Todavía no hay propiedades cargadas.</p>
        <Link
          href="/admin/propiedades/nueva"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500"
        >
          + Cargar la primera propiedad
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase">
            <th className="px-4 py-3 font-medium">Propiedad</th>
            <th className="px-4 py-3 font-medium">Operación</th>
            <th className="px-4 py-3 font-medium">Precio</th>
            <th className="px-4 py-3 font-medium">Ubicación</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isPending = pendingId === item.id;
            return (
              <tr key={item.id} className="border-b border-slate-800/70 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-slate-800">
                      {item.mainImageUrl && (
                        <Image src={item.mainImageUrl} alt="" fill sizes="64px" className="object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{item.title}</p>
                      {item.featured && (
                        <span className="text-xs font-medium text-pink-400">Destacada</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">{item.operation}</td>
                <td className="px-4 py-3 text-slate-300">{formatPrice(item.price, item.currency)}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-slate-300">{item.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.published
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-slate-700/50 text-slate-400"
                    }`}
                  >
                    {item.published ? "Publicada" : "Borrador"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium">
                    <Link
                      href={`/admin/propiedades/${item.id}/editar`}
                      className="text-pink-400 hover:text-pink-300"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleTogglePublished(item)}
                      className="text-slate-300 hover:text-white disabled:opacity-50"
                    >
                      {item.published ? "Despublicar" : "Publicar"}
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleToggleFeatured(item)}
                      className="text-slate-300 hover:text-white disabled:opacity-50"
                    >
                      {item.featured ? "Quitar destacada" : "Destacar"}
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(item)}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
