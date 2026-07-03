import type { Template } from "tinacms";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const aboutTemplate: Template = {
  name: "about",
  label: "Section À propos",
  ui: {
    defaultItem: {
      eyebrow: "À propos",
      title: "Un restaurant Original au cœur de Toulon",
      accentWord: "Original",
      variant: "media-right",
      body: "Présentez votre établissement en quelques phrases.",
    },
  },
  fields: [
    {
      name: "eyebrow",
      type: "string",
      label: "Badge au-dessus du titre",
      description: "Petit badge type autocollant. Ex. « À propos ».",
    },
    {
      name: "title",
      type: "string",
      label: "Titre",
      required: true,
    },
    {
      name: "accentWord",
      type: "string",
      label: "Mot à mettre en valeur",
      description:
        "Recopiez UN mot du titre : il sera coloré en orange et souligné d'un trait ondulé.",
    },
    {
      name: "body",
      type: "string",
      label: "Texte de présentation",
      required: true,
      ui: { component: "textarea" },
      description: "Une ligne vide = un nouveau paragraphe.",
    },
    {
      name: "variant",
      type: "string",
      label: "Position des photos",
      required: true,
      options: [
        { value: "media-right", label: "Photos à droite" },
        { value: "media-left", label: "Photos à gauche" },
      ],
    },
    {
      name: "photos",
      type: "object",
      label: "Photos (1 ou 2)",
      list: true,
      description: "Deux photos maximum, affichées en polaroïds superposés.",
      ui: {
        itemProps: (item?: { alt?: string }) => ({ label: item?.alt || "Photo" }),
        validate: (value?: unknown[]) => {
          if (value && value.length > 2) return "2 photos maximum.";
        },
      },
      fields: [
        { name: "src", type: "image", label: "Fichier image", required: true },
        {
          name: "alt",
          type: "string",
          label: "Texte alternatif (accessibilité + référencement)",
          required: true,
          description: "Décrivez la photo en une phrase. Obligatoire.",
        },
      ],
    },
    ...titleAppearanceFields,
  ],
};
