import type { Template } from "tinacms";
import { imageField, linkField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const heroTemplate: Template = {
  name: "hero",
  label: "Section Héro (haut de page)",
  ui: {
    defaultItem: {
      align: "left",
      title: "Une expérience\nbistronomique",
      accentWord: "bistronomique",
      subtitle:
        "Cuisine maison, produits frais du marché, dans un cadre convivial et authentique.",
      primaryCta: { label: "Réserver une table", href: "tel:0494054976" },
    },
  },
  fields: [
    {
      name: "align",
      type: "string",
      label: "Placement du texte",
      required: true,
      options: [
        { value: "left", label: "À gauche" },
        { value: "center", label: "Centré" },
        { value: "right", label: "À droite" },
      ],
      description: "Position du texte sur la photo. Aucune autre disposition possible.",
    },
    {
      name: "eyebrow",
      type: "string",
      label: "Badge au-dessus du titre",
      description: "Petit badge type autocollant. Ex. « Place de la fontaine — Toulon ».",
    },
    {
      name: "title",
      type: "string",
      label: "Titre principal",
      required: true,
      ui: { component: "textarea" },
      description:
        "La grande accroche (3 à 8 mots). Un retour à la ligne = une nouvelle ligne à l'écran.",
    },
    {
      name: "accentWord",
      type: "string",
      label: "Mot à mettre en valeur",
      description:
        "Recopiez UN mot du titre : il sera coloré en orange et souligné d'un trait ondulé.",
    },
    {
      name: "subtitle",
      type: "string",
      label: "Sous-titre",
      ui: { component: "textarea" },
      description: "Une phrase qui précise la promesse.",
    },
    imageField("image", "Photo de fond", "La grande photo plein écran derrière le texte."),
    linkField("primaryCta", "Bouton principal", "L'action la plus importante (ex. réserver)."),
    linkField("secondaryCta", "Bouton secondaire (optionnel)"),
    {
      name: "badges",
      type: "object",
      label: "Autocollants (points forts)",
      list: true,
      description: "2 ou 3 maximum. Ex. « Fait maison », « Produits du marché ».",
      ui: {
        itemProps: (item?: { label?: string }) => ({ label: item?.label || "Autocollant" }),
        defaultItem: { label: "Fait maison" },
        validate: (value?: unknown[]) => {
          if (value && value.length > 3) return "3 autocollants maximum.";
        },
      },
      fields: [
        { name: "label", type: "string", label: "Texte", required: true },
      ],
    },
    ...titleAppearanceFields,
  ],
};
