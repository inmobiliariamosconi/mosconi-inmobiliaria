"use client";

import { useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, zones } from "@/lib/content";

const propertyTypes = ["Casa", "Departamento", "Terreno", "Local u oficina", "Desarrollo / inversión", "Otra"];

const inputClass =
  "w-full rounded-lg border border-stone-line bg-ink px-3.5 py-2.5 font-body text-sm text-paper outline-none placeholder:text-stone focus:border-pink focus:ring-1 focus:ring-pink";

export function TasacionCard() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [zone, setZone] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = [
      "Hola, quiero solicitar una tasación.",
      "",
      `Nombre y apellido: ${name}`,
      `Tipo de propiedad: ${type}`,
      `Barrio / zona: ${zone}`,
      `Información adicional: ${details || "Sin detalle adicional"}`,
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener");
  }

  return (
    <div className="rounded-3xl border border-stone-line bg-paper-dim p-6 shadow-2xl shadow-black/50 sm:p-8">
      <h2 className="font-display text-2xl font-medium text-paper">Solicitá tu tasación</h2>
      <p className="mt-1.5 font-body text-sm text-stone">
        Completá tus datos y coordinamos por WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tasacion-nombre" className="font-body text-xs text-paper/70">
            Nombre y apellido
          </label>
          <input
            id="tasacion-nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="tasacion-tipo" className="font-body text-xs text-paper/70">
            Tipo de propiedad
          </label>
          <select
            id="tasacion-tipo"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="tasacion-zona" className="font-body text-xs text-paper/70">
            Barrio / zona
          </label>
          <select
            id="tasacion-zona"
            required
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {zones.map((z) => (
              <option key={z.name} value={z.name}>
                {z.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="tasacion-info" className="font-body text-xs text-paper/70">
            Información adicional
          </label>
          <textarea
            id="tasacion-info"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="Superficie, dormitorios, estado u otro dato que consideres útil"
            className={inputClass + " resize-none"}
          />
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-pink px-6 py-3.5 font-mono text-[0.75rem] tracking-[0.1em] text-paper uppercase transition-colors hover:bg-pink-bright"
        >
          <WhatsAppIcon size={16} />
          Enviar solicitud por WhatsApp
        </button>

        <p className="text-center font-body text-[0.7rem] text-stone">
          La tasación definitiva requiere análisis documental y visita al inmueble.
        </p>
      </form>
    </div>
  );
}
