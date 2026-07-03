import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { titleStyle } from "@/components/titleStyle";

export function Testimonials({ data }: { data: any }) {
  return (
    <section className="section">
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
        <ul className="testimonials__grid">
          {data.items?.map((item: any, i: number) => (
            <li key={i} className="t-card reveal" data-tina-field={tinaField(item)}>
              <blockquote className="t-card__quote" data-tina-field={tinaField(item, "quote")}>
                {item?.quote}
              </blockquote>
              {typeof item?.rating === "number" && item.rating >= 1 && (
                <div
                  className="t-card__rating"
                  role="img"
                  aria-label={`Note : ${item.rating} sur 5`}
                >
                  {"★".repeat(Math.min(5, Math.round(item.rating)))}
                </div>
              )}
              <div className="t-card__author">
                {item?.avatar?.src && (
                  <Media
                    image={item.avatar}
                    className="t-card__avatar"
                    width={88}
                    height={88}
                    sizes="44px"
                    tinaField={tinaField(item, "avatar")}
                  />
                )}
                <span>
                  <span className="t-card__name" data-tina-field={tinaField(item, "authorName")}>
                    {item?.authorName}
                  </span>
                  {item?.authorRole && (
                    <span className="t-card__role" data-tina-field={tinaField(item, "authorRole")}>
                      {" "}
                      — {item.authorRole}
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
