import Link from "next/link";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business, navLinks, zones } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-stone-line-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={40} tone="light" />
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-paper/60">
              {business.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line text-paper/70 transition-colors hover:border-pink hover:text-pink"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line text-paper/70 transition-colors hover:border-pink hover:text-pink"
              >
                <WhatsAppIcon size={17} />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-paper/40 uppercase">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-paper/75 transition-colors hover:text-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-paper/40 uppercase">
              Zonas donde operamos
            </p>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.name} className="font-body text-sm text-paper/75">
                  {zone.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-stone-line-dark pt-8 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body">
            © {new Date().getFullYear()} {business.legalName}. Más de {business.yearsActive} años en Salta.
          </p>
          <p className="font-mono tracking-[0.08em] uppercase">Salta, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
