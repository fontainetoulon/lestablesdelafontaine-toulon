import type { Collection } from "tinacms";
import { heroTemplate } from "@/components/blocks/Hero/template";
import { menuTemplate } from "@/components/blocks/Menu/template";
import { galleryTemplate } from "@/components/blocks/Gallery/template";
import { testimonialsTemplate } from "@/components/blocks/Testimonials/template";
import { instagramTemplate } from "@/components/blocks/Instagram/template";
import { mapTemplate } from "@/components/blocks/Map/template";
import { ctaTemplate } from "@/components/blocks/Cta/template";
import { contactTemplate } from "@/components/blocks/Contact/template";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre de la page (référencement)",
      name: "title",
      description: "Le titre affiché dans l'onglet du navigateur et sur Google.",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Description (référencement)",
      name: "description",
      ui: { component: "textarea" },
      description:
        "1 à 2 phrases qui résument la page pour Google (160 caractères max conseillés).",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections de la page",
      ui: {
        description:
          "Ajoutez, réordonnez et configurez les sections. Glissez pour réorganiser.",
      },
      templates: [
        heroTemplate,
        menuTemplate,
        galleryTemplate,
        testimonialsTemplate,
        instagramTemplate,
        mapTemplate,
        ctaTemplate,
        contactTemplate,
      ],
    },
  ],
};

export default Page;
