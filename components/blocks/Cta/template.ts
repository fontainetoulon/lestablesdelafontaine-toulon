import type { Template } from "tinacms";
import { imageField, linkField } from "@/tina/fields";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const ctaTemplate: Template = {
  name: "cta",
  label: "Section Réservation (bandeau)",
  ui: {
    defaultItem: {
      title: "Une table vous attend près de la fontaine",
      background: "accent",
      button: { label: "Réserver au 04 94 05 49 76", href: "tel:0494054976" },
    },
  },
  fields: [
    { name: "title", type: "string", label: "Titre", required: true },
    {
      name: "subtitle",
      type: "string",
      label: "Sous-titre (optionnel)",
      ui: { component: "textarea" },
    },
    {
      name: "background",
      type: "string",
      label: "Fond du bandeau",
      required: true,
      options: [
        { value: "accent", label: "Orange (couleur d'accent)" },
        { value: "ink", label: "Bleu nuit" },
        { value: "image", label: "Photo (avec voile sombre)" },
      ],
    },
    imageField("bgImage", "Photo de fond (si fond « Photo »)"),
    linkField("button", "Bouton"),
    {
      name: "phone",
      type: "string",
      label: "Téléphone affiché sous le bouton (optionnel)",
      description: "Ex. « ou appelez le 04 94 05 49 76 ».",
    },
    ...titleAppearanceFields,
  ],
};
