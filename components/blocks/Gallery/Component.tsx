"use client";

import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { titleStyle } from "@/components/titleStyle";

export function Gallery({ data }: { data: any }) {
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = (data.images ?? [])
    .filter((item: any) => item?.image?.src)
    .map((item: any) => ({
      src: item.image.src,
      alt: item.caption || item.image.alt || "",
    }));

  return (
    <section className="section section--tint gallery" data-variant={data.variant ?? "grid"}>
      <div className="container">
        <header className="section-head reveal">
          <h2
            className="section-head__title"
            style={titleStyle(data)}
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
          {data.intro && (
            <p className="section-head__intro" data-tina-field={tinaField(data, "intro")}>
              {data.intro}
            </p>
          )}
        </header>
        <div className="gallery__grid">
          {data.images?.map((item: any, i: number) => (
            <figure key={i} className="gallery__item reveal" data-tina-field={tinaField(item)}>
              <button
                type="button"
                className="gallery__zoom"
                onClick={() => setStartIndex(i)}
                aria-label={`Agrandir — ${item?.caption || item?.image?.alt || "photo"}`}
              >
                <div className="gallery__frame">
                  {item?.image?.src && (
                    <Media
                      image={item.image}
                      fill
                      sizes="(max-width: 900px) 50vw, 40vw"
                      tinaField={tinaField(item, "image")}
                    />
                  )}
                </div>
                {item?.caption && (
                  <figcaption
                    className="gallery__caption"
                    data-tina-field={tinaField(item, "caption")}
                  >
                    {item.caption}
                  </figcaption>
                )}
              </button>
            </figure>
          ))}
        </div>
      </div>
      {startIndex !== null && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          startIndex={Math.min(startIndex, lightboxImages.length - 1)}
          onClose={() => setStartIndex(null)}
        />
      )}
    </section>
  );
}
