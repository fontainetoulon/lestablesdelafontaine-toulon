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
    imageField(
      "menuImage",
      "Photo de la carte (optionnel)",
      "La photo de votre menu du mois. Les visiteurs cliquent dessus pour l'agrandir — remplacez-la à chaque nouvelle carte."
    ),
    {
      name: "items",
      type: "object",
      label: "Catégories (entrées, plats, desserts…)",
      list: true,
      description:
        "Chaque catégorie devient une carte cliquable qui ouvre sa galerie de photos.",
      ui: {
        itemProps: (item?: { title?: string }) => ({ label: item?.title || "Catégorie" }),
        defaultItem: {
          title: "Les plats",
          description: "Selon l'arrivage du jour et l'humeur du chef.",
        },
      },
      fields: [
        imageField(
          "image",
          "Photo de couverture (optionnel)",
          "La photo affichée sur la carte. Vide = première photo de la galerie."
        ),
        { name: "title", type: "string", label: "Nom de la catégorie", required: true },
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
          description: "Ex. « 14 € » ou « 45 € / pers ». Laissez vide pour ne rien afficher.",
        },
        {
          name: "photos",
          type: "object",
          label: "Galerie de photos",
          list: true,
          description:
            "Les photos ouvertes en grand quand on clique sur la carte. Glissez pour réordonner.",
          ui: {
            itemProps: (item?: { alt?: string }) => ({ label: item?.alt || "Photo" }),
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
