// Single source of truth for real, user-provided business content.
// Nothing fabricated: no invented stats, testimonials, phone numbers or addresses.

const whatsappDigits = "5493874450303";

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const business = {
  name: "Mosconi Inmobiliaria",
  legalName: "Graciela Mosconi Inmobiliaria",
  tagline: "Inmobiliaria en Salta",
  yearsActive: 21,
  facebookUrl: "https://www.facebook.com/mosconig",
  whatsappNumber: "+54 9 3874 45-0303",
  whatsappUrl: whatsappLink("Hola, me gustaría recibir información sobre Mosconi Inmobiliaria."),
  description:
    "Inmobiliaria en Salta especializada en venta y alquiler de propiedades, tasaciones y desarrollos inmobiliarios. Brindamos asesoramiento inmobiliario personalizado para familias, inversores y compradores locales y extranjeros.",
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/tasaciones", label: "Tasaciones" },
  { href: "/contacto", label: "Contacto" },
];

export type Zone = {
  name: string;
  descriptor: string;
};

export const zones: Zone[] = [
  { name: "Salta Capital", descriptor: "El corazón de la ciudad" },
  { name: "Zona Norte", descriptor: "Crecimiento y nuevos desarrollos" },
  { name: "Tres Cerritos", descriptor: "Residencial y consolidado" },
  { name: "San Lorenzo", descriptor: "Verde, tranquilo, a metros del cerro" },
  { name: "Vaqueros", descriptor: "Naturaleza a la salida de la ciudad" },
];

export type Service = {
  code: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    code: "VTA",
    title: "Venta de propiedades",
    description:
      "Acompañamos todo el proceso de venta: valuación, difusión, visitas y cierre de la operación con transparencia.",
  },
  {
    code: "ALQ",
    title: "Alquiler",
    description:
      "Gestionamos alquileres para propietarios e inquilinos, con contratos claros y seguimiento durante todo el período.",
  },
  {
    code: "TAS",
    title: "Tasaciones",
    description:
      "Tasamos tu propiedad con criterio profesional y conocimiento actualizado del mercado inmobiliario de Salta.",
  },
  {
    code: "DES",
    title: "Desarrollos inmobiliarios",
    description:
      "Asesoramos y acompañamos proyectos de desarrollo, desde la evaluación del terreno hasta la comercialización.",
  },
  {
    code: "ASE",
    title: "Asesoramiento personalizado",
    description:
      "Un trato cercano para familias, inversores y compradores locales y extranjeros, en cada paso de la operación.",
  },
];
