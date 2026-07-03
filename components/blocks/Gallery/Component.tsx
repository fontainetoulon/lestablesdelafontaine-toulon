import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { titleStyle } from "@/components/titleStyle";

export function Gallery({ data }: { data: any }) {
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
              <div className="gallery__frame">
                {item?.image?.src && (
                  <Media
                    image={item.image}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
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
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
