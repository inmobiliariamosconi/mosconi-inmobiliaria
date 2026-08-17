"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, next, prev]);

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Ver foto en pantalla completa"
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-soft sm:aspect-[16/11] lg:aspect-auto lg:h-[420px]"
      >
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </button>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === active}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-colors ${
                i === active ? "ring-pink" : "opacity-60 ring-transparent hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Galería de fotos de ${title}`}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <span className="font-mono text-xs tracking-[0.08em] text-paper/70 uppercase">
                {active + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Cerrar galería"
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-paper transition-colors hover:bg-paper/10"
              >
                ✕
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-3 pb-4 sm:px-6">
              <div className="relative h-full w-full">
                <Image src={images[active]} alt={title} fill sizes="100vw" className="object-contain" />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Foto anterior"
                    className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-lg text-paper transition-colors hover:bg-pink sm:left-4"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Foto siguiente"
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-lg text-paper transition-colors hover:bg-pink sm:right-4"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
