"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import type { PropertyInsert } from "@/lib/supabase/database.types";

export type PropertyFormState = {
  error: string | null;
};

function numberOrNull(value: FormDataEntryValue | null): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function integerOrNull(value: FormDataEntryValue | null): number | null {
  const n = numberOrNull(value);
  return n == null ? null : Math.round(n);
}

function parseFeatures(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseImagePaths(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((p) => typeof p === "string") : [];
  } catch {
    return [];
  }
}

function buildPropertyInsert(formData: FormData): { data: PropertyInsert; imagePaths: string[] } {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    data: {
      title,
      slug: slugify(slugInput || title),
      description: String(formData.get("description") ?? "").trim(),
      price: numberOrNull(formData.get("price")),
      currency: String(formData.get("currency") ?? "USD").trim() || "USD",
      property_type: String(formData.get("property_type") ?? "").trim(),
      operation: String(formData.get("operation") ?? "").trim(),
      zone: (formData.get("zone") as string) || null,
      location: String(formData.get("location") ?? "").trim(),
      address: (String(formData.get("address") ?? "").trim() || null) as string | null,
      surface_total: numberOrNull(formData.get("surface_total")),
      surface_covered: numberOrNull(formData.get("surface_covered")),
      bedrooms: integerOrNull(formData.get("bedrooms")),
      bathrooms: integerOrNull(formData.get("bathrooms")),
      rooms: integerOrNull(formData.get("rooms")),
      features: parseFeatures(formData.get("features")),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
    imagePaths: parseImagePaths(formData.get("images")),
  };
}

/** Replaces every property_images row for a property with the given ordered paths. */
async function saveImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  propertyId: string,
  imagePaths: string[],
) {
  const { error: deleteError } = await supabase
    .from("property_images")
    .delete()
    .eq("property_id", propertyId);
  if (deleteError) throw new Error(deleteError.message);

  if (imagePaths.length === 0) return;

  const { error: insertError } = await supabase.from("property_images").insert(
    imagePaths.map((storage_path, position) => ({
      property_id: propertyId,
      storage_path,
      position,
    })),
  );
  if (insertError) throw new Error(insertError.message);
}

function revalidatePublicPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/propiedades");
  if (slug) revalidatePath(`/propiedades/${slug}`);
}

function revalidateAdminPaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/propiedades");
}

export async function createProperty(
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const { data, imagePaths } = buildPropertyInsert(formData);

  if (!data.title) return { error: "El título es obligatorio." };
  if (!data.property_type) return { error: "Elegí un tipo de propiedad." };
  if (!data.operation) return { error: "Elegí una operación." };
  if (!data.slug) return { error: "No se pudo generar el slug a partir del título." };

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("properties")
    .insert(data)
    .select("id, slug")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una propiedad con el slug "${data.slug}". Elegí otro.` };
    }
    return { error: error.message };
  }

  try {
    await saveImages(supabase, inserted.id, imagePaths);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error al guardar las imágenes." };
  }

  revalidatePublicPaths(inserted.slug);
  revalidateAdminPaths();
  redirect("/admin/propiedades");
}

export async function updateProperty(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const { data, imagePaths } = buildPropertyInsert(formData);

  if (!data.title) return { error: "El título es obligatorio." };
  if (!data.property_type) return { error: "Elegí un tipo de propiedad." };
  if (!data.operation) return { error: "Elegí una operación." };
  if (!data.slug) return { error: "No se pudo generar el slug a partir del título." };

  const supabase = await createClient();

  const { data: previous } = await supabase
    .from("properties")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("properties").update(data).eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una propiedad con el slug "${data.slug}". Elegí otro.` };
    }
    return { error: error.message };
  }

  try {
    await saveImages(supabase, id, imagePaths);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Error al guardar las imágenes." };
  }

  revalidatePublicPaths(previous?.slug);
  revalidatePublicPaths(data.slug);
  revalidateAdminPaths();
  redirect("/admin/propiedades");
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();

  const { data: property } = await supabase
    .from("properties")
    .select("slug, property_images(storage_path)")
    .eq("id", id)
    .maybeSingle();

  if (property?.property_images?.length) {
    const paths = property.property_images.map((img) => img.storage_path);
    const { error: storageError } = await supabase.storage.from("property-images").remove(paths);
    if (storageError) {
      console.error("deleteProperty storage cleanup:", storageError.message);
    }
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPaths(property?.slug);
  revalidateAdminPaths();
}

export async function setPublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .update({ published })
    .eq("id", id)
    .select("slug")
    .single();

  if (error) throw new Error(error.message);

  revalidatePublicPaths(data.slug);
  revalidateAdminPaths();
}

export async function setFeatured(id: string, featured: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .update({ featured })
    .eq("id", id)
    .select("slug")
    .single();

  if (error) throw new Error(error.message);

  revalidatePublicPaths(data.slug);
  revalidateAdminPaths();
}
