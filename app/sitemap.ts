import type { MetadataRoute } from "next";
import client from "@/tina/__generated__/client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
  try {
    const pages = await client.queries.pageConnection();
    for (const edge of pages.data.pageConnection.edges ?? []) {
      const crumbs = edge?.node?._sys.breadcrumbs ?? [];
      if (!crumbs.length || crumbs.join("/") === "home") continue;
      entries.push({
        url: `${SITE_URL}/${crumbs.join("/")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // contenu local indisponible : la home suffit
  }
  return entries;
}
