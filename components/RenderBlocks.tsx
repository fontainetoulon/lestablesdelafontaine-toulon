import { tinaField } from "tinacms/dist/react";
import { Hero } from "@/components/blocks/Hero/Component";
import { Menu } from "@/components/blocks/Menu/Component";
import { Gallery } from "@/components/blocks/Gallery/Component";
import { Testimonials } from "@/components/blocks/Testimonials/Component";
import { Instagram } from "@/components/blocks/Instagram/Component";
import { MapAccess } from "@/components/blocks/Map/Component";
import { Cta } from "@/components/blocks/Cta/Component";
import { Contact } from "@/components/blocks/Contact/Component";

const BLOCKS: Record<string, React.ComponentType<{ data: any }>> = {
  PageBlocksHero: Hero,
  PageBlocksServices: Menu,
  PageBlocksGallery: Gallery,
  PageBlocksTestimonials: Testimonials,
  PageBlocksInstagram: Instagram,
  PageBlocksMap: MapAccess,
  PageBlocksCta: Cta,
  PageBlocksContact: Contact,
};

export function RenderBlocks({ blocks }: { blocks?: any[] | null }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => {
        const Component = block?.__typename ? BLOCKS[block.__typename] : undefined;
        if (!Component) return null;
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Component data={block} />
          </div>
        );
      })}
    </>
  );
}
