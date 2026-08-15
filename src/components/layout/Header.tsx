"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { business, navLinks } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The whole site is dark, so the header stays light-on-dark everywhere —
  // only its background goes from transparent to a solid blurred bar once
  // scrolled (or while the mobile menu is open).
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/90 backdrop-blur-md border-b border-stone-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
        <Link href="/" aria-label="Mosconi Inmobiliaria, inicio">
          <Logo size={38} tone="light" priority />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[0.72rem] tracking-[0.12em] uppercase transition-colors ${
                  active ? "text-pink" : "text-paper/75 hover:text-pink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 font-mono text-[0.72rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
          >
            Contactanos
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-paper transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-paper transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden md:hidden transition-[max-height] duration-300 ease-out ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-stone-line px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 font-mono text-sm tracking-[0.08em] uppercase text-paper/80 hover:text-pink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-pink px-5 py-2.5 font-mono text-[0.72rem] tracking-[0.1em] uppercase text-paper"
          >
            Contactanos →
          </a>
        </nav>
      </div>
    </header>
  );
}
