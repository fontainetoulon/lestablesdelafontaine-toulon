import { Bricolage_Grotesque, Fraunces, Plus_Jakarta_Sans } from "next/font/google";

// Direction artistique : Décalé / Ludique (HEPTERACT_WEBSKIN_1 — playful-quirky).
// Toutes les polices sont self-hostées au build par next/font (aucun CDN externe).

// Titres : display expressif, chunky, plein de caractère.
export const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Corps : sans lisible et propre — la personnalité vit dans les titres.
export const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Accent : serif « wonk » pour les mots soulignés, les prix, les clins d'œil.
export const accent = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-accent",
  display: "swap",
  style: ["normal", "italic"],
});
