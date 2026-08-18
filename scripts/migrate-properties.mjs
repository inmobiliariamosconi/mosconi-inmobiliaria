// One-off migration: loads the 7 properties that used to be hardcoded in
// src/lib/properties.ts (see git history) into Supabase, uploading their
// existing photos from public/propiedades/<slug>/ to Storage along the way.
//
// Safe to re-run: any slug that already exists in the database is skipped
// (reported, not overwritten), so running this twice never duplicates data.
// Nothing here touches or deletes public/propiedades/ or git history, so
// the original source data is never at risk — if the migrated rows in
// Supabase ever need to be undone, just delete them from the admin panel
// or the Supabase dashboard; nothing on this side is destructive.
//
// Usage (from the project root):
//   node --env-file=.env.local scripts/migrate-properties.mjs
//
// Requires in .env.local:
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   (Supabase dashboard → Settings → API —
//                                 "service_role" secret. Bypasses RLS, so
//                                 this script can insert without an admin
//                                 login. Never used anywhere in the app
//                                 itself — local/one-off use only.)

import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Faltan variables de entorno. Necesito NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local, " +
      "y correr el script con: node --env-file=.env.local scripts/migrate-properties.mjs",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Verbatim from the pre-CMS src/lib/properties.ts (see git log), with
// price/surface strings parsed into plain numbers for the new schema. The
// one piece of information that didn't map to a column — the "(8 x 25 m)"
// dimension note on the dúplex's terrain — was moved into its features
// list instead of being dropped.
const properties = [
  {
    slug: "terreno-barrio-libertad",
    title: "Terreno en esquina en Barrio Libertad",
    property_type: "Terreno",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Barrio Libertad, detrás del Paseo Libertad",
    price: 25000,
    currency: "USD",
    surface_total: 281,
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
  },
  {
    slug: "departamento-sarmiento-leguizamon",
    title: "Departamento en Sarmiento casi Leguizamón",
    property_type: "Departamento",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Calle Sarmiento casi esquina Leguizamón, frente al Hospital del Milagro",
    surface_total: 92,
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
  },
  {
    slug: "casa-avenida-belgica",
    title: "Casa en Avenida Bélgica",
    property_type: "Casa",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Avenida Bélgica",
    price: 90000,
    currency: "USD",
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
  },
  {
    slug: "terreno-praderas-san-lorenzo",
    title: "Terreno en Praderas de San Lorenzo",
    property_type: "Terreno",
    operation: "Venta",
    zone: "San Lorenzo",
    location: "Praderas de San Lorenzo, a 5 minutos del ingreso y cerca de Punto Shopping",
    price: 160000,
    currency: "USD",
    surface_total: 1570,
    features: [
      "Desnivel natural, ideal para aprovechar las vistas en un proyecto arquitectónico",
      "Seguridad privada las 24 horas",
      "Amenities",
      "Todos los servicios disponibles",
      "Entorno de tranquilidad",
    ],
    description:
      "Lote de 1.570 m² en Praderas de San Lorenzo, a solo 5 minutos del ingreso y muy cerca de Punto Shopping. Su desnivel natural lo convierte en un escenario ideal para desarrollar un proyecto arquitectónico aprovechando las vistas y el entorno. El barrio cuenta con seguridad privada las 24 horas, amenities y todos los servicios disponibles.",
  },
  {
    slug: "duplex-los-profesionales",
    title: "Dúplex a estrenar en Los Profesionales",
    property_type: "Casa",
    operation: "Venta",
    zone: null,
    location: "Barrio Los Profesionales",
    price: 150000,
    currency: "USD",
    surface_total: 200,
    surface_covered: 160,
    bedrooms: 3,
    bathrooms: 3,
    features: [
      "Terreno de 8 x 25 m",
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
  },
  {
    slug: "terreno-ruta9-vaqueros",
    title: "Terreno sobre Ruta Provincial N°9, Vaqueros",
    property_type: "Terreno",
    operation: "Venta",
    zone: "Vaqueros",
    location: "Vaqueros, sobre Ruta Provincial N° 9, zona comercial",
    price: 150000,
    currency: "USD",
    surface_total: 2700,
    features: [
      "Ubicación estratégica en la zona comercial de Vaqueros",
      "Todos los servicios",
      "Excelente accesibilidad sobre ruta",
      "Rodeado de naturaleza",
      "Apto para complejo turístico, desarrollo inmobiliario, locales comerciales o vivienda",
    ],
    description:
      "Terreno de 2.700 m² sobre Ruta Provincial N° 9, en el corazón de la zona comercial de Vaqueros. Cuenta con todos los servicios y excelente accesibilidad sobre la ruta. Por su ubicación y escala, es apto para complejo turístico, desarrollo inmobiliario, locales comerciales o vivienda.",
  },
  {
    slug: "departamento-dean-funes",
    title: "Departamento en Deán Funes",
    property_type: "Departamento",
    operation: "Venta",
    zone: "Salta Capital",
    location: "Calle Deán Funes",
    price: 110000,
    currency: "USD",
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
  },
];

async function migrateOne(property) {
  const { data: existing } = await supabase
    .from("properties")
    .select("id")
    .eq("slug", property.slug)
    .maybeSingle();

  if (existing) {
    console.log(`⏭  ${property.slug} — ya existe, se omite.`);
    return { imagesUploaded: 0, skipped: true };
  }

  const imagesDir = join(projectRoot, "public", "propiedades", property.slug);
  const filenames = readdirSync(imagesDir)
    .filter((f) => f.toLowerCase().endsWith(".jpg"))
    .sort();

  const { data: inserted, error: insertError } = await supabase
    .from("properties")
    .insert({ ...property, published: true, featured: false })
    .select("id")
    .single();

  if (insertError) {
    console.error(`✗  ${property.slug} — error al crear la propiedad: ${insertError.message}`);
    return { imagesUploaded: 0, skipped: false, failed: true };
  }

  let imagesUploaded = 0;
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i];
    const filePath = join(imagesDir, filename);
    const storagePath = `${property.slug}/${filename}`;
    const fileBuffer = readFileSync(filePath);

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(storagePath, fileBuffer, { contentType: "image/jpeg", upsert: false });

    if (uploadError) {
      console.error(`  ✗ ${filename}: ${uploadError.message}`);
      continue;
    }

    const { error: imageRowError } = await supabase
      .from("property_images")
      .insert({ property_id: inserted.id, storage_path: storagePath, position: i });

    if (imageRowError) {
      console.error(`  ✗ fila de imagen para ${filename}: ${imageRowError.message}`);
      continue;
    }

    imagesUploaded++;
  }

  console.log(`✓  ${property.slug} — creada con ${imagesUploaded}/${filenames.length} fotos.`);
  return { imagesUploaded };
}

let totalImages = 0;
let migrated = 0;
let skipped = 0;
let failed = 0;

for (const property of properties) {
  const result = await migrateOne(property);
  totalImages += result.imagesUploaded;
  if (result.skipped) skipped++;
  else if (result.failed) failed++;
  else migrated++;
}

console.log("\n— Resumen —");
console.log(`Propiedades encontradas en el script: ${properties.length}`);
console.log(`Creadas ahora: ${migrated}`);
console.log(`Ya existían (omitidas): ${skipped}`);
console.log(`Con errores: ${failed}`);
console.log(`Fotos subidas: ${totalImages}`);
console.log("Listo. Revisá /admin/propiedades para confirmar.");
