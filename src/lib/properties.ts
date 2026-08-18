// Public, read-only data-access layer for property listings, backed by
// Supabase (see supabase/migrations/0001_init.sql). Only ever returns
// published properties — draft/hidden listings never reach these
// functions, enforced both here and by Postgres RLS as a second layer.
//
// Uses the cookie-free static client (not lib/supabase/server.ts) because
// these functions also run inside generateStaticParams at build time,
// where next/headers' cookies() isn't available.
//
// The `Property` shape below intentionally matches the old hardcoded
// version from before the CMS, so PropertyCard, PropertyGallery, and the
// property detail page keep working unchanged: this module's only job is
// to fetch from Supabase and format the data into the exact shape those
// components already expect.

import { createStaticClient, isSupabaseConfigured } from "@/lib/supabase/static";
import type { PropertyImageRow, PropertyRow } from "@/lib/supabase/database.types";

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: string;
  operation: string;
  zone?: string;
  location: string;
  price?: string;
  surfaceTotal?: string;
  surfaceCovered?: string;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  features: string[];
  description: string;
  featured: boolean;
  /** Public Storage URLs, main image first. */
  images: string[];
};

type PropertyRowWithImages = PropertyRow & { property_images: PropertyImageRow[] };

function formatPrice(price: number | null, currency: string): string | undefined {
  if (price == null) return undefined;
  return `${currency} ${new Intl.NumberFormat("es-AR").format(price)}`;
}

function formatSurface(value: number | null): string | undefined {
  if (value == null) return undefined;
  return `${new Intl.NumberFormat("es-AR").format(value)} m²`;
}

function mapRow(
  row: PropertyRowWithImages,
  supabase: ReturnType<typeof createStaticClient>,
): Property {
  const orderedPaths = [...row.property_images]
    .sort((a, b) => a.position - b.position)
    .map((img) => img.storage_path);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.property_type,
    operation: row.operation,
    zone: row.zone ?? undefined,
    location: row.location,
    price: formatPrice(row.price, row.currency),
    surfaceTotal: formatSurface(row.surface_total),
    surfaceCovered:
      row.surface_covered != null ? `${formatSurface(row.surface_covered)} cubiertos` : undefined,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    rooms: row.rooms ?? undefined,
    features: row.features,
    description: row.description,
    featured: row.featured,
    images: orderedPaths.map(
      (path) => supabase.storage.from("property-images").getPublicUrl(path).data.publicUrl,
    ),
  };
}

/** All published properties, featured first, newest first. */
export async function getPublishedProperties(): Promise<Property[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedProperties:", error.message);
    return [];
  }

  return (data as PropertyRowWithImages[]).map((row) => mapRow(row, supabase));
}

/** A single published property by slug, or null if it doesn't exist/isn't published. */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPropertyBySlug:", error.message);
    return null;
  }
  if (!data) return null;

  return mapRow(data as PropertyRowWithImages, supabase);
}

/** Slugs of every published property, for generateStaticParams. */
export async function getPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createStaticClient();
  const { data, error } = await supabase.from("properties").select("slug").eq("published", true);

  if (error) {
    console.error("getPublishedSlugs:", error.message);
    return [];
  }

  return data.map((row) => row.slug);
}
