import type { Template } from "tinacms";
import { imageField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const galleryTemplate: Template = {
  name: "gallery",
  label: "Section Galerie photos",
  ui: {
    defaultItem: {
      title: "En salle & en terrasse",
      variant: "grid",
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
      name: "variant",
      type: "string",
      label: "Disposition",
      required: true,
      options: [
        { value: "grid", label: "Grille (photos carrées)" },
        { value: "masonry", label: "Mosaïque (hauteurs variées)" },
        { value: "large", label: "Grands polaroïds (2 par ligne)" },
      ],
    },
    {
      name: "images",
      type: "object",
      label: "Photos",
      list: true,
      description: "Glissez pour réordonner.",
      ui: {
        itemProps: (item?: { caption?: string; image?: { alt?: string } }) => ({
          label: item?.caption || item?.image?.alt || "Photo",
        }),
      },
      fields: [
        imageField("image", "Photo"),
        {
          name: "caption",
          type: "string",
          label: "Légende (optionnel)",
          description: "Petite phrase manuscrite sous la photo.",
        },
      ],
    },
    ...titleAppearanceFields,
  ],
};
