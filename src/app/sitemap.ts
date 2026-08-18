import type { MetadataRoute } from "next";
import { getPublishedSlugs } from "@/lib/properties";

const BASE_URL = "https://inmobiliariamosconi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPublishedSlugs();

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/propiedades`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/tasaciones`, changeFrequency: "monthly", priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${BASE_URL}/propiedades/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
