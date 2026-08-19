"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Glow } from "@/components/ui/Glow";
import { TasacionCard } from "@/components/ui/TasacionCard";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business, zones } from "@/lib/content";

const easeOut = [0.16, 1, 0.3, 1] as const;
const initial = { opacity: 0, y: 18 };

const proof = [
  { value: `${business.yearsActive} años`, label: "de trayectoria en Salta" },
  { value: "Salta e interior", label: "cobertura en toda la provincia" },
  { value: "Servicios integrales", label: "venta, alquiler, tasaciones y más" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Glow className="-left-48 top-0" size={560} animate={false} />
      <Glow className="right-0 top-1/2 -translate-y-1/2" size={420} color="bright" animate={false} />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 pt-32 pb-20 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pt-44 lg:pb-24">
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
            Venta · Alquiler · Tasaciones · Administraciones
          </p>

          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.05] font-normal tracking-[-0.02em] text-paper sm:text-5xl lg:text-6xl">
            &ldquo;Donde tus proyectos comienzan a hacerse realidad.&rdquo;
          </h1>

          <p className="mt-3 font-display text-3xl text-paper sm:text-4xl lg:text-5xl">
            <span className="font-extrabold text-pink">{business.yearsActive} años</span> de
            trayectoria
          </p>

          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-paper/65 sm:text-lg">
            Especializada en tasaciones de propiedades, y también en venta, alquiler y
            desarrollos inmobiliarios, con asesoramiento personalizado para familias,
            inversores y compradores locales y extranjeros.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/propiedades"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
            >
              Ver propiedades
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] text-paper uppercase ring-1 ring-paper/25 ring-inset transition-colors hover:text-pink hover:ring-pink"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-y-6 border-t border-stone-line pt-8 sm:grid-cols-3 sm:gap-x-6">
            {proof.map((item) => (
              <div key={item.value}>
                <dt className="font-display text-xl font-semibold text-paper">{item.value}</dt>
                <dd className="mt-1 font-body text-xs text-stone">{item.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="relative"
        >
          <TasacionCard />
        </motion.div>
      </div>

      <div className="relative overflow-hidden border-t border-paper/10 bg-ink/25 py-4 backdrop-blur-[2px]">
        <div className="marquee-track flex w-max animate-marquee gap-10 font-mono text-[0.7rem] tracking-[0.2em] text-paper/40 uppercase">
          {[...zones, ...zones, ...zones, ...zones, ...zones, ...zones, ...zones, ...zones].map(
            (zone, i) => (
              <span key={`${zone.name}-${i}`} className="flex items-center gap-10">
                {zone.name}
                <span className="text-pink/50" aria-hidden>
                  ·
                </span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
