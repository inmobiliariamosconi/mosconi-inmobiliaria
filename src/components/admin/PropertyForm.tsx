"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader, type UploadedImage } from "@/components/admin/ImageUploader";
import { zones } from "@/lib/content";
import { slugify } from "@/lib/slugify";
import type { PropertyFormState } from "@/app/admin/propiedades/actions";
import type { AdminPropertyDetail } from "@/lib/supabase/admin-properties";

const PROPERTY_TYPES = ["Casa", "Departamento", "Terreno", "Local comercial", "Oficina", "Galpón", "Otro"];
const OPERATIONS = ["Venta", "Alquiler"];
const CURRENCIES = ["USD", "ARS"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold tracking-wide text-pink-400 uppercase">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  full,
  children,
}: {
  label: string;
  htmlFor: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500";

type PropertyFormProps = {
  mode: "create" | "edit";
  action: (state: PropertyFormState, formData: FormData) => Promise<PropertyFormState>;
  property?: AdminPropertyDetail;
};

export function PropertyForm({ mode, action, property }: PropertyFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<PropertyFormState, FormData>(action, {
    error: null,
  });

  // Images need somewhere to live in Storage before the property row exists
  // (create mode): a random folder works just as well as the real id, since
  // property_images.storage_path doesn't have to match the property id.
  const [draftId] = useState(() => crypto.randomUUID());
  const folderId = property?.id ?? draftId;

  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [images, setImages] = useState<UploadedImage[]>(
    property?.images.map((img) => ({ storagePath: img.storagePath, url: img.url })) ?? [],
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="images" value={JSON.stringify(images.map((i) => i.storagePath))} />

      <Section title="Información básica">
        <Field label="Título" htmlFor="title" full>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!slugTouched) setSlug(slugify(value));
            }}
            className={inputClass}
            placeholder="Casa en Avenida Bélgica"
          />
        </Field>

        <Field label="URL (slug)" htmlFor="slug" full>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-slate-500">/propiedades/</span>
            <input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={inputClass + " flex-1"}
            />
          </div>
        </Field>

        <Field label="Tipo de propiedad" htmlFor="property_type">
          <select
            id="property_type"
            name="property_type"
            required
            defaultValue={property?.property_type ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Elegir…
            </option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Operación" htmlFor="operation">
          <select
            id="operation"
            name="operation"
            required
            defaultValue={property?.operation ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Elegir…
            </option>
            {OPERATIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Descripción" htmlFor="description" full>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={property?.description ?? ""}
            className={inputClass}
            placeholder="Descripción profesional de la propiedad…"
          />
        </Field>
      </Section>

      <Section title="Precio">
        <Field label="Precio" htmlFor="price">
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            defaultValue={property?.price ?? ""}
            className={inputClass}
            placeholder="Dejar vacío si no se publica"
          />
        </Field>

        <Field label="Moneda" htmlFor="currency">
          <select id="currency" name="currency" defaultValue={property?.currency ?? "USD"} className={inputClass}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </Section>

      <Section title="Ubicación">
        <Field label="Zona" htmlFor="zone">
          <select id="zone" name="zone" defaultValue={property?.zone ?? ""} className={inputClass}>
            <option value="">Sin zona asignada</option>
            {zones.map((z) => (
              <option key={z.name} value={z.name}>
                {z.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Dirección (opcional)" htmlFor="address">
          <input
            id="address"
            name="address"
            defaultValue={property?.address ?? ""}
            className={inputClass}
            placeholder="Calle y número, si corresponde"
          />
        </Field>

        <Field label="Ubicación (texto para la ficha)" htmlFor="location" full>
          <input
            id="location"
            name="location"
            required
            defaultValue={property?.location ?? ""}
            className={inputClass}
            placeholder="Barrio Libertad, detrás del Paseo Libertad"
          />
        </Field>
      </Section>

      <Section title="Características">
        <Field label="Superficie total (m²)" htmlFor="surface_total">
          <input
            id="surface_total"
            name="surface_total"
            type="number"
            min="0"
            step="0.01"
            defaultValue={property?.surface_total ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Superficie cubierta (m²)" htmlFor="surface_covered">
          <input
            id="surface_covered"
            name="surface_covered"
            type="number"
            min="0"
            step="0.01"
            defaultValue={property?.surface_covered ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Dormitorios" htmlFor="bedrooms">
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            step="1"
            defaultValue={property?.bedrooms ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Baños" htmlFor="bathrooms">
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            step="1"
            defaultValue={property?.bathrooms ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Ambientes" htmlFor="rooms">
          <input
            id="rooms"
            name="rooms"
            type="number"
            min="0"
            step="1"
            defaultValue={property?.rooms ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Características (una por línea)" htmlFor="features" full>
          <textarea
            id="features"
            name="features"
            rows={5}
            defaultValue={property?.features?.join("\n") ?? ""}
            className={inputClass}
            placeholder={"Cochera cubierta\nPatio trasero\nApto crédito"}
          />
        </Field>
      </Section>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-pink-400 uppercase">Imágenes</h2>
        <div className="mt-4">
          <ImageUploader folderId={folderId} value={images} onChange={setImages} />
        </div>
      </div>

      <Section title="Publicación">
        <label className="flex items-center gap-2.5 text-sm text-slate-200">
          <input
            type="checkbox"
            name="published"
            defaultChecked={property?.published ?? false}
            className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-pink-600 focus:ring-pink-500"
          />
          Publicada (visible en la web)
        </label>

        <label className="flex items-center gap-2.5 text-sm text-slate-200">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={property?.featured ?? false}
            className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-pink-600 focus:ring-pink-500"
          />
          Destacada
        </label>
      </Section>

      {state.error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{state.error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Guardando…" : mode === "create" ? "Crear propiedad" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
