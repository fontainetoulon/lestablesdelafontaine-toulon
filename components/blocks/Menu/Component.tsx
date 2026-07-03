import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { titleStyle } from "@/components/titleStyle";

export function Menu({ data }: { data: any }) {
  return (
    <section className="section" id="carte">
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
        <ul className="menu__grid">
          {data.items?.map((item: any, i: number) => (
            <li key={i} className="menu-card reveal" data-tina-field={tinaField(item)}>
              {item?.image?.src && (
                <div className="menu-card__media">
                  <Media
                    image={item.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    tinaField={tinaField(item, "image")}
                  />
                </div>
              )}
              <div className="menu-card__body">
                <div className="menu-card__top">
                  <h3 className="menu-card__title" data-tina-field={tinaField(item, "title")}>
                    {item?.title}
                  </h3>
                  {item?.price && (
                    <span className="menu-card__price" data-tina-field={tinaField(item, "price")}>
                      {item.price}
                    </span>
                  )}
                </div>
                <p className="menu-card__desc" data-tina-field={tinaField(item, "description")}>
                  {item?.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {data.note && (
          <div className="menu__note reveal">
            <span className="sticker" data-tina-field={tinaField(data, "note")}>
              {data.note}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
