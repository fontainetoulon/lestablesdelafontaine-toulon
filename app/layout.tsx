import React from "react";
import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { heading, body, accent } from "@/app/fonts";
import { Appearance } from "@/components/Appearance";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";

import "@/styles.css";

export const revalidate = 30;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

async function getGlobal() {
  try {
    const res = await client.queries.global({ relativePath: "index.json" });
    return res.data.global;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  const title =
    global?.seo?.metaTitle ?? global?.header?.siteName ?? "Les Tables de la Fontaine";
  const description = global?.seo?.metaDescription ?? undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${global?.header?.siteName ?? title}`,
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: SITE_URL,
      images: global?.seo?.ogImage?.src
        ? [{ url: global.seo.ogImage.src, alt: global.seo.ogImage.alt ?? "" }]
        : undefined,
    },
  };
}

// Anti-clignotement des animations de scroll : pose reveal-on AVANT le 1er
// paint, avec filet de sécurité reveal-go si le JS ne se charge pas.
// ⚠️ suppressHydrationWarning obligatoire sur <html> (gotcha §10.3).
const antiFlashScript = `(function(){var d=document.documentElement;d.classList.add('reveal-on');setTimeout(function(){d.classList.add('reveal-go')},2600)})()`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  return (
    <html
      lang="fr"
      data-style="decale"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${accent.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
        <Appearance appearance={global?.appearance} />
        <ScrollReveal />
        <a href="#contenu" className="sr-only">
          Aller au contenu
        </a>
        <Header header={global?.header} />
        <main id="contenu">{children}</main>
        <Footer global={global} />
        <StructuredData global={global} siteUrl={SITE_URL} />
      </body>
    </html>
  );
}
