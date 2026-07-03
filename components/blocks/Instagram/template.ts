import type { Template } from "tinacms";
import { imageField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

// Grille de posts éditables (images + liens) — pas de flux live (fiable et rapide).
export const instagramTemplate: Template = {
  name: "instagram",
  label: "Section Instagram",
  ui: {
    defaultItem: {
      title: "La cuisine en direct",
      handle: "@lestablesdelafontaine.toulon",
      profileUrl: "https://www.instagram.com/lestablesdelafontaine.toulon/",
    },
  },
  fields: [
    { name: "title", type: "string", label: "Titre de la section", required: true },
    {
      name: "handle",
      type: "string",
      label: "Nom du compte",
      required: true,
      description: "Ex. @lestablesdelafontaine.toulon",
    },
    {
      name: "profileUrl",
      type: "string",
      label: "Lien vers le profil Instagram",
      required: true,
      ui: {
        validate: (value?: string) => {
          if (value && !/^https:\/\//i.test(value)) return "Doit commencer par https://";
        },
      },
    },
    {
      name: "posts",
      type: "object",
      label: "Publications affichées",
      list: true,
      description:
        "4 photos idéalement. Mettez à jour ces images quand vous publiez sur Instagram.",
      ui: {
        itemProps: (item?: { image?: { alt?: string } }) => ({
          label: item?.image?.alt || "Publication",
        }),
        validate: (value?: unknown[]) => {
          if (value && value.length > 8) return "8 publications maximum.";
        },
      },
      fields: [
        imageField("image", "Photo de la publication"),
        {
          name: "postUrl",
          type: "string",
          label: "Lien vers la publication (optionnel)",
          description: "Vide = renvoie vers le profil.",
        },
      ],
    },
    ...titleAppearanceFields,
  ],
};
