import type { Collection } from "tinacms";
import { imageField, linkField } from "@/tina/fields";
import { ColorPickerInput } from "@/tina/fields/ColorPicker";

const Global: Collection = {
  label: "Réglages du site",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
  },
  fields: [
    // ---------- HEADER ----------
    {
      type: "object",
      label: "En-tête (header)",
      name: "header",
      fields: [
        imageField("logo", "Logo", "Affiché en haut à gauche et dans le pied de page."),
        {
          type: "string",
          label: "Nom du site",
          name: "siteName",
          required: true,
        },
        {
          type: "object",
          label: "Liens de navigation",
          name: "nav",
          list: true,
          description: "Les liens du menu principal. Glissez pour réordonner.",
          ui: {
            itemProps: (item?: { label?: string }) => ({ label: item?.label || "Lien" }),
            defaultItem: { href: "#carte", label: "La carte" },
          },
          fields: [
            {
              type: "string",
              label: "Destination",
              name: "href",
              required: true,
              description: "Une ancre (#carte) ou un chemin interne (/contact).",
            },
            { type: "string", label: "Texte affiché", name: "label", required: true },
          ],
        },
        linkField("cta", "Bouton d'action", "Le bouton mis en avant à droite (ex. Réserver)."),
      ],
    },

    // ---------- FOOTER ----------
    {
      type: "object",
      label: "Pied de page (footer)",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Phrase de présentation",
          name: "baseline",
          ui: { component: "textarea" },
          description: "Courte phrase sous le logo dans le pied de page.",
        },
        {
          type: "object",
          label: "Réseaux sociaux",
          name: "social",
          list: true,
          ui: {
            itemProps: (item?: { network?: string }) => ({
              label: item?.network || "Réseau",
            }),
            defaultItem: { network: "instagram", url: "https://www.instagram.com/" },
          },
          fields: [
            {
              type: "string",
              label: "Réseau",
              name: "network",
              required: true,
              options: [
                { value: "instagram", label: "Instagram" },
                { value: "facebook", label: "Facebook" },
                { value: "tiktok", label: "TikTok" },
              ],
            },
            {
              type: "string",
              label: "Adresse du profil",
              name: "url",
              required: true,
              ui: {
                validate: (value?: string) => {
                  if (value && !/^https:\/\//i.test(value)) {
                    return "Doit commencer par https://";
                  }
                },
              },
            },
          ],
        },
      ],
    },

    // ---------- COORDONNÉES ----------
    {
      type: "object",
      label: "Coordonnées & horaires",
      name: "contact",
      fields: [
        { type: "string", label: "Téléphone", name: "phone" },
        { type: "string", label: "Email", name: "email" },
        {
          type: "string",
          label: "Adresse",
          name: "address",
          ui: { component: "textarea" },
        },
        { type: "string", label: "Code postal", name: "zip" },
        { type: "string", label: "Ville", name: "city" },
        {
          type: "object",
          label: "Horaires d'ouverture",
          name: "hours",
          list: true,
          ui: {
            itemProps: (item?: { days?: string }) => ({ label: item?.days || "Horaire" }),
            defaultItem: { days: "Mardi — Samedi", opening: "10h — 15h" },
          },
          fields: [
            { type: "string", label: "Jours", name: "days", required: true },
            { type: "string", label: "Heures", name: "opening", required: true },
          ],
        },
      ],
    },

    // ---------- APPARENCE ----------
    {
      type: "object",
      label: "Apparence",
      name: "appearance",
      description:
        "Réglages visuels globaux. Chaque section peut aussi surcharger son titre.",
      fields: [
        {
          type: "string",
          label: "Couleur d'accent",
          name: "accentColor",
          description: "La couleur des boutons et mots mis en valeur.",
          // Le type FieldProps du composant custom n'est pas exporté par tinacms
          ui: { component: ColorPickerInput as unknown as string },
        },
        {
          type: "string",
          label: "Police des titres",
          name: "headingFont",
          options: [
            { value: "heading", label: "Bricolage (ronde & expressive)" },
            { value: "accent", label: "Fraunces (serif de caractère)" },
            { value: "body", label: "Jakarta (sobre)" },
          ],
        },
        {
          type: "string",
          label: "Taille générale du texte",
          name: "fontScale",
          options: [
            { value: "compact", label: "Compact" },
            { value: "normal", label: "Normal" },
            { value: "large", label: "Grand" },
          ],
        },
        {
          type: "string",
          label: "Taille des titres",
          name: "headingScale",
          options: [
            { value: "small", label: "Petits" },
            { value: "compact", label: "Compacts" },
            { value: "normal", label: "Normaux" },
            { value: "large", label: "Grands" },
          ],
        },
        {
          type: "string",
          label: "Style des formes",
          name: "shapeStyle",
          description: "Arrondi des cartes et boutons.",
          options: [
            { value: "sharp", label: "Net" },
            { value: "soft", label: "Doux" },
            { value: "round", label: "Rond" },
          ],
        },
      ],
    },

    // ---------- RÉFÉRENCEMENT ----------
    {
      type: "object",
      label: "Référencement (SEO)",
      name: "seo",
      fields: [
        {
          type: "string",
          label: "Titre du site (Google)",
          name: "metaTitle",
          description: "Ex. « Les Tables de la Fontaine — Restaurant bistronomique à Toulon ».",
        },
        {
          type: "string",
          label: "Description du site (Google)",
          name: "metaDescription",
          ui: { component: "textarea" },
        },
        imageField(
          "ogImage",
          "Image de partage",
          "Affichée quand le site est partagé (réseaux sociaux, WhatsApp…). Format paysage."
        ),
      ],
    },
  ],
};

export default Global;
