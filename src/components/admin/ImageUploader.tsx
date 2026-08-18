"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export type UploadedImage = { storagePath: string; url: string };

type ImageUploaderProps = {
  /** Storage folder prefix — the property id in edit mode, a fresh random id in create mode. */
  folderId: string;
  value: UploadedImage[];
  onChange: (next: UploadedImage[]) => void;
};

export function ImageUploader({ folderId, value, onChange }: ImageUploaderProps) {
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setError(null);
    setUploadingCount(files.length);

    const supabase = createClient();
    const results = await Promise.allSettled(
      files.map(async (file) => {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${folderId}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(path, file);
        if (uploadError) throw new Error(`${file.name}: ${uploadError.message}`);
        const { data } = supabase.storage.from("property-images").getPublicUrl(path);
        return { storagePath: path, url: data.publicUrl };
      }),
    );

    const uploaded: UploadedImage[] = [];
    const failures: string[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") uploaded.push(result.value);
      else failures.push(result.reason instanceof Error ? result.reason.message : "Error desconocido");
    }

    if (uploaded.length > 0) onChange([...value, ...uploaded]);
    if (failures.length > 0) setError(`No se pudieron subir algunas fotos: ${failures.join("; ")}`);
    setUploadingCount(0);
  }

  async function handleRemove(index: number) {
    const image = value[index];
    onChange(value.filter((_, i) => i !== index));
    const supabase = createClient();
    const { error: removeError } = await supabase.storage
      .from("property-images")
      .remove([image.storagePath]);
    if (removeError) console.error("No se pudo borrar la imagen del storage:", removeError.message);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function setAsMain(index: number) {
    if (index === 0) return;
    const next = [...value];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  const isUploading = uploadingCount > 0;

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/40 px-6 py-8 text-center transition-colors hover:border-pink-500">
        <span className="text-sm font-medium text-slate-200">
          {isUploading ? `Subiendo ${uploadingCount} foto${uploadingCount > 1 ? "s" : ""}…` : "Hacé clic para subir fotos"}
        </span>
        <span className="text-xs text-slate-500">Podés seleccionar varias a la vez</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={isUploading}
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.map((image, i) => (
            <div
              key={image.storagePath}
              className="group relative overflow-hidden rounded-lg border border-slate-800"
            >
              <div className="relative aspect-square bg-slate-900">
                <Image src={image.url} alt="" fill sizes="150px" className="object-cover" />
              </div>

              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-pink-600 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
                  Principal
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/75 px-1.5 py-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Mover antes"
                    className="rounded px-1 text-xs text-white disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === value.length - 1}
                    aria-label="Mover después"
                    className="rounded px-1 text-xs text-white disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => setAsMain(i)}
                    className="text-[0.62rem] font-medium text-white hover:text-pink-300"
                  >
                    Marcar principal
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  aria-label="Eliminar foto"
                  className="text-xs font-bold text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
