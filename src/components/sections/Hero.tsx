"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business, zones } from "@/lib/content";

const easeOut = [0.16, 1, 0.3, 1] as const;
const initial = { opacity: 0, y: 18 };

const offerings = ["Venta", "Alquiler", "Tasaciones", "Desarrollos inmobiliarios"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[78vh] flex-col overflow-hidden bg-ink text-paper sm:min-h-[82vh] lg:min-h-[88vh]">
      <div className="absolute inset-0">
        <Image
          src="/mosconi-hero-v7.png"
          alt="Fachada de Mosconi Inmobiliaria en Salta, al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] brightness-[0.85] contrast-[1.06] sm:object-[58%_center] lg:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-6 pt-28 pb-16 sm:pt-32 lg:px-8 lg:pt-36">
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="flex items-center gap-5"
        >
          <LogoMark size={80} priority />
          <div className="leading-none">
            <p className="font-display text-4xl font-semibold tracking-[-0.01em] sm:text-5xl">
              Mosconi
            </p>
            <p className="mt-2 font-mono text-[0.65rem] tracking-[0.18em] text-pink uppercase sm:text-[0.7rem] sm:tracking-[0.32em]">
              Inmobiliaria · Salta, Argentina
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="mt-10 flex max-w-lg flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-xl leading-snug font-medium text-paper/90 sm:text-2xl lg:text-3xl"
        >
          {offerings.map((item, i) => (
            <span key={item} className="flex items-center gap-x-2.5">
              {item}
              {i < offerings.length - 1 && (
                <span className="text-pink" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          className="relative mt-10"
        >
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pink px-7 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            <WhatsAppIcon size={18} />
            Escribinos por WhatsApp
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
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
          ))}
        </div>
      </div>
    </section>
  );
}
