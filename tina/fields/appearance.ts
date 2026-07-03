import type { TinaField } from "tinacms";

// Groupe d'apparence réutilisable pour le TITRE de chaque section.
// Le niveau block PRIME sur les réglages globaux (SITEFORGE-GEN-DIRECTIVES §3B).
// Tous optionnels : vide = réglage global.
export const titleAppearanceFields: TinaField[] = [
  {
    name: "titleSize",
    type: "string",
    label: "Taille du titre",
    description: "Vide = taille standard du site.",
    options: [
      { value: "small", label: "Petit" },
      { value: "normal", label: "Normal" },
      { value: "large", label: "Grand" },
    ],
  },
  {
    name: "titleFont",
    type: "string",
    label: "Police du titre",
    description: "Vide = police des titres du site.",
    options: [
      { value: "heading", label: "Bricolage (ronde & expressive)" },
      { value: "accent", label: "Fraunces (serif de caractère)" },
      { value: "body", label: "Jakarta (sobre)" },
    ],
  },
  {
    name: "titleColor",
    type: "string",
    label: "Couleur du titre",
    description: "Vide = couleur du texte standard.",
    options: [
      { value: "ink", label: "Encre (bleu nuit)" },
      { value: "accent", label: "Accent (orange)" },
    ],
  },
];
