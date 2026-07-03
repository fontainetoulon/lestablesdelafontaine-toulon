import type { Template } from "tinacms";
import { imageField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const testimonialsTemplate: Template = {
  name: "testimonials",
  label: "Section Avis clients",
  ui: {
    defaultItem: {
      title: "Ils ont aimé",
    },
  },
  fields: [
    { name: "title", type: "string", label: "Titre de la section", required: true },
    {
      name: "intro",
      type: "string",
      label: "Introduction (optionnel)",
      ui: { component: "textarea" },
    },
    {
      name: "items",
      type: "object",
      label: "Avis",
      list: true,
      description: "Copiez ici vos meilleurs avis Google. Glissez pour réordonner.",
      ui: {
        itemProps: (item?: { authorName?: string }) => ({
          label: item?.authorName || "Avis",
        }),
        defaultItem: {
          quote: "Une adresse à ne pas manquer !",
          authorName: "Un client",
          rating: 5,
        },
      },
      fields: [
        {
          name: "quote",
          type: "string",
          label: "Citation",
          required: true,
          ui: { component: "textarea" },
        },
        { name: "authorName", type: "string", label: "Nom du client", required: true },
        {
          name: "authorRole",
          type: "string",
          label: "Précision (optionnel)",
          description: "Ex. « Avis Google » ou « Habitué du midi ».",
        },
        {
          name: "rating",
          type: "number",
          label: "Note (1 à 5)",
          description: "Nombre d'étoiles affichées. Entre 1 et 5.",
          ui: {
            validate: (value?: number) => {
              if (value != null && (value < 1 || value > 5)) return "Entre 1 et 5.";
            },
          },
        },
        imageField("avatar", "Photo du client (optionnel)"),
      ],
    },
    ...titleAppearanceFields,
  ],
};
