import { business } from "@/lib/content";

export function EmptyPropiedades() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-stone-line bg-ink-soft px-8 py-20 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="text-pink"
      >
        <path
          d="M6 18 20 6l14 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 15.5V33a1 1 0 0 0 1 1H29.5a1 1 0 0 0 1-1V15.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 34V24a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <h3 className="font-display text-xl font-medium text-paper">
          Estamos preparando nuestra selección de propiedades
        </h3>
        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-stone">
          Muy pronto vas a poder ver acá nuestro portafolio de venta y alquiler. Mientras tanto,
          escribinos y te contamos qué tenemos disponible en cada zona.
        </p>
      </div>
      <a
        href={business.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase text-paper transition-colors hover:bg-pink-bright"
      >
        Escribinos por Facebook →
      </a>
    </div>
  );
}
