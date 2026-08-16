// Single source of truth for real, client-provided property listings.
// Nothing fabricated: every field comes from the client's own text or from
// text/signage visible in the client's own photos. Fields the source
// material didn't specify are left undefined and simply not rendered.

export type PropertyType = "Casa" | "Departamento" | "Terreno";
export type Operation = "Venta" | "Alquiler";

export type Property = {
  slug: string;
  title: string;
  type: PropertyType;
  operation: Operation;
  /** Matches a name in `zones` when confidently known; omitted otherwise. */
  zone?: string;
  location: string;
  price?: string;
  surfaceTotal?: string;
  surfaceCovered?: string;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  description: string;
  /** Image paths under /public/propiedades/<slug>/, main image first. */
  images: string[];
};

function images(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => `/propiedades/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);
}

export const properties: Property[] = [
  {
    slug: "terreno-barrio-libertad",
    title: "Terreno en esquina en Barrio Libertad",
    type: "Terreno",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Barrio Libertad, detrás del Paseo Libertad",
    price: "USD 25.000",
    surfaceTotal: "281 m²",
    features: [
      "Terreno en esquina",
      "Papeles al día",
      "Todos los servicios, excepto gas",
      "A metros del Paseo Libertad",
      "Rodeado de comercios y servicios",
      "Varias líneas de colectivo cercanas",
      "Acceso rápido por Avenida Principal",
    ],
    description:
      "Terreno en esquina de 281 m², con papeles al día y todos los servicios disponibles excepto gas. Ubicado en Barrio Libertad, a metros del Paseo Libertad, en una zona de gran crecimiento y buena conectividad: rodeada de comercios y servicios, con varias líneas de colectivo cercanas y acceso rápido por Avenida Principal. Ideal para construir una vivienda, desarrollar un proyecto o invertir.",
    images: images("terreno-barrio-libertad", 13),
  },
  {
    slug: "departamento-sarmiento-leguizamon",
    title: "Departamento en Sarmiento casi Leguizamón",
    type: "Departamento",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Calle Sarmiento casi esquina Leguizamón, frente al Hospital del Milagro",
    surfaceTotal: "92 m²",
    bedrooms: 2,
    bathrooms: 1,
    features: [
      "Patio de luz con buena ventilación",
      "Muebles empotrados",
      "Cocina con bajo mesada",
      "Apto crédito",
      "A pocas cuadras de Avenida Entre Ríos",
      "Cerca de Jumbo y Easy",
    ],
    description:
      "Departamento de 92 m² en calle Sarmiento, casi esquina Leguizamón, frente al Hospital del Milagro y a pocas cuadras de Avenida Entre Ríos. Cuenta con 2 dormitorios cómodos, 1 baño completo, patio de luz con buena ventilación, muebles empotrados y cocina con bajo mesada. Apto crédito. Zona con comercios y servicios, cerca de Jumbo y Easy.",
    images: images("departamento-sarmiento-leguizamon", 9),
  },
  {
    slug: "casa-avenida-belgica",
    title: "Casa en Avenida Bélgica",
    type: "Casa",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Avenida Bélgica",
    price: "USD 90.000",
    bedrooms: 3,
    bathrooms: 1,
    features: [
      "Ingreso principal por Avenida Bélgica y salida por calle trasera",
      "Cocina-comedor integrada",
      "Living independiente",
      "Cochera cubierta",
      "Patio trasero con galería a medio construir",
      "Portón trasero",
      "Jardín delantero",
      "Cerco perimetral con rejas",
    ],
    description:
      "Casa de 3 dormitorios y baño completo sobre Avenida Bélgica, con ingreso principal por la avenida y salida por calle trasera. Cocina-comedor integrada, living independiente y cochera cubierta. Cuenta con patio trasero con galería a medio construir, portón trasero, jardín delantero y cerco perimetral con rejas.",
    images: images("casa-avenida-belgica", 19),
  },
  {
    slug: "terreno-praderas-san-lorenzo",
    title: "Terreno en Praderas de San Lorenzo",
    type: "Terreno",
    operation: "Venta",
    zone: "San Lorenzo",
    location: "Praderas de San Lorenzo, a 5 minutos del ingreso y cerca de Punto Shopping",
    price: "USD 160.000",
    surfaceTotal: "1.570 m²",
    features: [
      "Desnivel natural, ideal para aprovechar las vistas en un proyecto arquitectónico",
      "Seguridad privada las 24 horas",
      "Amenities",
      "Todos los servicios disponibles",
      "Entorno de tranquilidad",
    ],
    description:
      "Lote de 1.570 m² en Praderas de San Lorenzo, a solo 5 minutos del ingreso y muy cerca de Punto Shopping. Su desnivel natural lo convierte en un escenario ideal para desarrollar un proyecto arquitectónico aprovechando las vistas y el entorno. El barrio cuenta con seguridad privada las 24 horas, amenities y todos los servicios disponibles.",
    images: images("terreno-praderas-san-lorenzo", 9),
  },
  {
    slug: "duplex-los-profesionales",
    title: "Dúplex a estrenar en Los Profesionales",
    type: "Casa",
    operation: "Venta",
    location: "Barrio Los Profesionales",
    price: "USD 150.000",
    surfaceTotal: "200 m² (8 x 25 m)",
    surfaceCovered: "160 m² cubiertos",
    bedrooms: 3,
    bathrooms: 3,
    features: [
      "Dormitorio principal en suite",
      "Cocina comedor",
      "Living comedor",
      "Galería con asador",
      "Patio trasero",
      "Entrada para vehículo",
      "Balcones",
      "A estrenar",
      "Diseño moderno",
    ],
    description:
      "Dúplex a estrenar en Barrio Los Profesionales, sobre un terreno de 8 x 25 m (200 m²) con 160 m² cubiertos. Cuenta con 3 dormitorios (principal en suite), 3 baños, cocina comedor, living comedor, galería con asador, patio trasero, entrada para vehículo y balcones. Diseño moderno y ambientes amplios, ideal para vivienda familiar o inversión.",
    images: images("duplex-los-profesionales", 16),
  },
  {
    slug: "terreno-ruta9-vaqueros",
    title: "Terreno sobre Ruta Provincial N°9, Vaqueros",
    type: "Terreno",
    operation: "Venta",
    zone: "Vaqueros",
    location: "Vaqueros, sobre Ruta Provincial N° 9, zona comercial",
    price: "USD 150.000",
    surfaceTotal: "2.700 m²",
    features: [
      "Ubicación estratégica en la zona comercial de Vaqueros",
      "Todos los servicios",
      "Excelente accesibilidad sobre ruta",
      "Rodeado de naturaleza",
      "Apto para complejo turístico, desarrollo inmobiliario, locales comerciales o vivienda",
    ],
    description:
      "Terreno de 2.700 m² sobre Ruta Provincial N° 9, en el corazón de la zona comercial de Vaqueros. Cuenta con todos los servicios y excelente accesibilidad sobre la ruta. Por su ubicación y escala, es apto para complejo turístico, desarrollo inmobiliario, locales comerciales o vivienda.",
    images: images("terreno-ruta9-vaqueros", 8),
  },
  {
    slug: "departamento-dean-funes",
    title: "Departamento en Deán Funes",
    type: "Departamento",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Calle Deán Funes",
    price: "USD 110.000",
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Amplia cocina con bajo mesada",
      "Comedor independiente con grandes ventanales",
      "Living al ingreso",
      "Balcones con excelente iluminación",
      "Cochera / espacio de estacionamiento en subsuelo",
      "Todos los servicios",
      "Cerca de comercios",
      "Próximo a colegios privados y escuelas públicas",
      "A minutos del centro",
      "Paradas de colectivo cercanas",
    ],
    description:
      "Departamento de 3 dormitorios y 2 baños completos en calle Deán Funes. Amplia cocina con bajo mesada, comedor independiente con grandes ventanales y living al ingreso. Cuenta con balcones con excelente iluminación y cochera / espacio de estacionamiento en subsuelo. Ubicación estratégica: cerca de comercios, próximo a colegios y a minutos del centro.",
    images: images("departamento-dean-funes", 15),
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}
