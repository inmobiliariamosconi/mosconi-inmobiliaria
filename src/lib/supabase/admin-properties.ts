// Admin-only property queries. Every function here relies on the caller
// being authenticated — RLS's "admin read/write" policies (see
// supabase/migrations/0001_init.sql) are what actually enforce that; these
// are just convenience wrappers, not a security boundary on their own.
import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { PropertyImageRow, PropertyRow } from "@/lib/supabase/database.types";

export type AdminPropertyListItem = {
  id: string;
  slug: string;
  title: string;
  operation: string;
  price: number | null;
  currency: string;
  location: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  mainImageUrl: string | null;
};

export type AdminStats = {
  total: number;
  published: number;
  hidden: number;
  featured: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select("published, featured");

  if (error) {
    console.error("getAdminStats:", error.message);
    return { total: 0, published: 0, hidden: 0, featured: 0 };
  }

  return {
    total: data.length,
    published: data.filter((p) => p.published).length,
    hidden: data.filter((p) => !p.published).length,
    featured: data.filter((p) => p.featured).length,
  };
}

export async function getAllPropertiesForAdmin(): Promise<AdminPropertyListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(storage_path, position)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPropertiesForAdmin:", error.message);
    return [];
  }

  return (data as (PropertyRow & { property_images: Pick<PropertyImageRow, "storage_path" | "position">[] })[]).map(
    (row) => {
      const main = [...row.property_images].sort((a, b) => a.position - b.position)[0];
      return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        operation: row.operation,
        price: row.price,
        currency: row.currency,
        location: row.location,
        published: row.published,
        featured: row.featured,
        createdAt: row.created_at,
        mainImageUrl: main
          ? supabase.storage.from("property-images").getPublicUrl(main.storage_path).data.publicUrl
          : null,
      };
    },
  );
}

export type AdminPropertyDetail = PropertyRow & {
  images: { id: string; storagePath: string; url: string; position: number }[];
};

export async function getPropertyByIdForAdmin(id: string): Promise<AdminPropertyDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getPropertyByIdForAdmin:", error.message);
    return null;
  }
  if (!data) return null;

  const row = data as PropertyRow & { property_images: PropertyImageRow[] };

  return {
    ...row,
    images: [...row.property_images]
      .sort((a, b) => a.position - b.position)
      .map((img) => ({
        id: img.id,
        storagePath: img.storage_path,
        position: img.position,
        url: supabase.storage.from("property-images").getPublicUrl(img.storage_path).data.publicUrl,
      })),
  };
}
