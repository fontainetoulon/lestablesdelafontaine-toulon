// JSON-LD Restaurant — piloté par les réglages Tina (rien en dur).
export function StructuredData({ global, siteUrl }: { global: any; siteUrl: string }) {
  const contact = global?.contact;
  const seo = global?.seo;
  const header = global?.header;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: header?.siteName ?? "Restaurant",
    url: siteUrl,
    servesCuisine: "Cuisine française maison",
    priceRange: "€€",
  };

  if (seo?.metaDescription) data.description = seo.metaDescription;
  if (contact?.phone) data.telephone = String(contact.phone).replace(/\s/g, "");
  if (header?.logo?.src) data.image = `${siteUrl}${header.logo.src}`;
  if (contact?.address) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: String(contact.address).replace(/\n/g, ", "),
      postalCode: contact?.zip ?? undefined,
      addressLocality: contact?.city ?? undefined,
      addressCountry: "FR",
    };
  }
  if (contact?.hours?.length) {
    data.openingHours = contact.hours.map((h: any) => `${h?.days} ${h?.opening}`);
  }
  const socials = global?.footer?.social?.map((s: any) => s?.url).filter(Boolean);
  if (socials?.length) data.sameAs = socials;

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
