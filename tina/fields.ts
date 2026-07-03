import type { TinaField } from "tinacms";

// Image AVEC alt obligatoire. Le champ `image` de Tina ne stocke qu'un chemin ;
// on enveloppe src + alt dans un objet pour rendre l'alt requis.
export const imageField = (
  name = "image",
  label = "Image",
  description?: string
): TinaField => ({
  name,
  type: "object",
  label,
  description,
  fields: [
    { name: "src", type: "image", label: "Fichier image", required: true },
    {
      name: "alt",
      type: "string",
      label: "Texte alternatif (accessibilité + référencement)",
      required: true,
      description:
        "Décrivez l'image en une phrase. Ex. « Terrasse du restaurant devant la fontaine ». Obligatoire.",
    },
  ],
});

// Bouton / lien réutilisable.
export const linkField = (
  name = "cta",
  label = "Bouton / lien",
  description?: string
): TinaField => ({
  name,
  type: "object",
  label,
  description,
  fields: [
    {
      name: "label",
      type: "string",
      label: "Texte du bouton",
      required: true,
    },
    {
      name: "href",
      type: "string",
      label: "Destination",
      required: true,
      description:
        "Une URL complète (https://…), un chemin interne (/contact), une ancre (#carte) ou un numéro (tel:0494054976).",
      ui: {
        validate: (value?: string) => {
          if (!value) return;
          if (!/^(https?:\/\/|\/|#|tel:|mailto:)/i.test(value)) {
            return "Doit commencer par https://, /, #, tel: ou mailto:";
          }
        },
      },
    },
    {
      name: "newTab",
      type: "boolean",
      label: "Ouvrir dans un nouvel onglet",
    },
  ],
});
