import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { CtaLink } from "@/components/CtaLink";
import { titleStyle } from "@/components/titleStyle";

export function Cta({ data }: { data: any }) {
  const phoneHref = data.phone ? `tel:${String(data.phone).replace(/\s/g, "")}` : undefined;
  return (
    <section className="cta" data-bg={data.background ?? "accent"} id="reservation">
      {data.background === "image" && data.bgImage?.src && (
        <div className="cta__bgmedia" data-tina-field={tinaField(data, "bgImage")}>
          <Media image={data.bgImage} fill sizes="100vw" />
        </div>
      )}
      {data.background === "image" && <div className="cta__scrim" aria-hidden="true" />}
      <div className="cta__inner container reveal">
        <h2
          className="cta__title"
          style={titleStyle(data)}
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="cta__subtitle" data-tina-field={tinaField(data, "subtitle")}>
            {data.subtitle}
          </p>
        )}
        {data.button?.href && (
          <CtaLink
            {...data.button}
            className="btn btn--light"
            tinaField={tinaField(data, "button")}
          />
        )}
        {data.phone && (
          <a className="cta__phone" href={phoneHref} data-tina-field={tinaField(data, "phone")}>
            ou appelez le {data.phone}
          </a>
        )}
      </div>
    </section>
  );
}
