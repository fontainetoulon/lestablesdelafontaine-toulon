import type { Template } from "tinacms";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const mapTemplate: Template = {
  name: "map",
  label: "Section Carte & Accès",
  ui: {
    defaultItem: {
      title: "Nous trouver",
      address: "Place Gustave Lambert\n83000 Toulon",
      phone: "04 94 05 49 76",
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
      name: "embedUrl",
      type: "string",
      label: "Lien d'intégration Google Maps",
      description:
        "Dans Google Maps : Partager → Intégrer une carte → copiez l'adresse (https://www.google.com/maps/…).",
      ui: {
        validate: (value?: string) => {
          if (value && !/^https:\/\/(www\.)?google\.com\/maps/i.test(value)) {
            return "Doit commencer par https://www.google.com/maps";
          }
        },
      },
    },
    {
      name: "address",
      type: "string",
      label: "Adresse",
      ui: { component: "textarea" },
    },
    { name: "phone", type: "string", label: "Téléphone" },
    {
      name: "hours",
      type: "object",
      label: "Horaires",
      list: true,
      description: "Une ligne par plage. Glissez pour réordonner.",
      ui: {
        itemProps: (item?: { days?: string }) => ({ label: item?.days || "Horaire" }),
        defaultItem: { days: "Mardi — Samedi", opening: "10h — 15h" },
      },
      fields: [
        { name: "days", type: "string", label: "Jours", required: true },
        { name: "opening", type: "string", label: "Heures", required: true },
      ],
    },
    {
      name: "accessNote",
      type: "string",
      label: "Note d'accès (optionnel)",
      ui: { component: "textarea" },
      description: "Ex. « À deux pas du port, parking Place d'Armes à 5 min à pied ».",
    },
    ...titleAppearanceFields,
  ],
};
