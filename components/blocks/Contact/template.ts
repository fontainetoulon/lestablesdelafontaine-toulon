import type { Template } from "tinacms";
import { titleAppearanceFields } from "@/tina/fields/appearance";

export const contactTemplate: Template = {
  name: "contact",
  label: "Section Contact",
  ui: {
    defaultItem: {
      title: "Écrivez-nous",
      email: "contact@lestablesdelafontainetoulon.fr",
      showForm: true,
    },
  },
  fields: [
    { name: "title", type: "string", label: "Titre de la section", required: true },
    {
      name: "intro",
      type: "string",
      label: "Introduction (optionnel)",
      ui: { component: "textarea" },
      description: "Ex. « Une question, un groupe, une privatisation ? »",
    },
    {
      name: "email",
      type: "string",
      label: "Email de contact",
      required: true,
      ui: {
        validate: (value?: string) => {
          if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
            return "Adresse email invalide.";
          }
        },
      },
    },
    { name: "phone", type: "string", label: "Téléphone (optionnel)" },
    {
      name: "address",
      type: "string",
      label: "Adresse (optionnel)",
      ui: { component: "textarea" },
    },
    {
      name: "showForm",
      type: "boolean",
      label: "Afficher le formulaire de contact",
      description: "Formulaire fixe (nom, email, message). Aucune configuration risquée.",
    },
    ...titleAppearanceFields,
  ],
};
