import type { Template } from "tinacms";
import { imageField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

// Le block « services » Siteforge, adapté au restaurant : la carte du moment.
export const menuTemplate: Template = {
  name: "services",
  label: "Section Carte & Menus",
  ui: {
    defaultItem: {
      title: "La carte du moment",
      intro:
        "3 entrées, 3 plats, 3 desserts — une carte courte qui change chaque mois, au rythme du marché.",
      note: "La carte change tous les mois, au fil des saisons.",
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
      label: "Titre de la section",
      required: true,
    },
    {
      name: "intro",
      type: "string",
      label: "Introduction",
      ui: { component: "textarea" },
      description: "Une ou deux phrases sous le titre.",
    },
    {
      name: "items",
      type: "object",
      label: "Plats / formules",
      list: true,
      description: "Ajoutez vos plats ou formules. Glissez pour réordonner.",
      ui: {
        itemProps: (item?: { title?: string }) => ({ label: item?.title || "Plat" }),
        defaultItem: {
          title: "Plat du marché",
          description: "Selon l'arrivage du jour et l'humeur du chef.",
        },
      },
      fields: [
        imageField("image", "Photo (optionnel)", "Une photo du plat, format paysage."),
        { name: "title", type: "string", label: "Nom du plat / de la formule", required: true },
        {
          name: "description",
          type: "string",
          label: "Description",
          required: true,
          ui: { component: "textarea" },
        },
        {
          name: "price",
          type: "string",
          label: "Prix (optionnel)",
          description: "Ex. « 24 € » ou « Entrée + plat 19 € ». Laissez vide pour ne rien afficher.",
        },
      ],
    },
    {
      name: "note",
      type: "string",
      label: "Note sous la grille (optionnel)",
      description: "Affichée dans un autocollant. Ex. « La carte change tous les mois ».",
    },
    ...titleAppearanceFields,
  ],
};
