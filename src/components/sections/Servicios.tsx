import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

export default function Servicios() {
  return (
    <section className="bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.24em] text-pink uppercase">
            Qué hacemos
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-[-0.01em] text-paper sm:text-5xl">
            Un servicio inmobiliario completo
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-stone-line">
          {services.map((service, i) => (
            <Reveal key={service.code} delay={i * 0.05}>
              <div className="flex flex-col gap-2 border-b border-stone-line py-8 sm:flex-row sm:items-baseline sm:gap-12">
                <h3 className="font-display text-xl font-medium text-paper sm:w-56 sm:shrink-0">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-stone sm:max-w-md">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
