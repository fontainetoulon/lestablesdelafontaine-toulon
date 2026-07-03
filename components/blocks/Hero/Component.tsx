import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { CtaLink } from "@/components/CtaLink";
import { titleStyle } from "@/components/titleStyle";

// Le titre est un textarea : \n = retour à la ligne (white-space: pre-line),
// et le mot accentué est coloré + souligné d'un squiggle.
function TitleWithAccent({ title, accentWord }: { title: string; accentWord?: string | null }) {
  if (!accentWord || !title.includes(accentWord)) return <>{title}</>;
  const [before, ...rest] = title.split(accentWord);
  return (
    <>
      {before}
      <span className="accent-word">{accentWord}</span>
      {rest.join(accentWord)}
    </>
  );
}

export function Hero({ data }: { data: any }) {
  return (
    <section className="hero" data-align={data.align ?? "left"}>
      {data.image?.src && (
        <div className="hero__media" data-tina-field={tinaField(data, "image")}>
          <Media image={data.image} fill priority sizes="100vw" />
        </div>
      )}
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__inner container">
        {data.eyebrow && (
          <p className="hero__eyebrow">
            <span className="sticker" data-tina-field={tinaField(data, "eyebrow")}>
              {data.eyebrow}
            </span>
          </p>
        )}
        <h1
          className="hero__title"
          style={titleStyle(data)}
          data-tina-field={tinaField(data, "title")}
        >
          <TitleWithAccent title={data.title ?? ""} accentWord={data.accentWord} />
        </h1>
        {data.subtitle && (
          <p className="hero__subtitle" data-tina-field={tinaField(data, "subtitle")}>
            {data.subtitle}
          </p>
        )}
        <div className="hero__ctas">
          {data.primaryCta?.href && (
            <CtaLink {...data.primaryCta} tinaField={tinaField(data, "primaryCta")} />
          )}
          {data.secondaryCta?.href && (
            <CtaLink
              {...data.secondaryCta}
              className="btn btn--ghost"
              tinaField={tinaField(data, "secondaryCta")}
            />
          )}
        </div>
        {data.badges?.length > 0 && (
          <div className="hero__badges">
            {data.badges.map((badge: any, i: number) => (
              <span key={i} className="sticker" data-tina-field={tinaField(badge)}>
                {badge?.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <svg
        className="hero__wave"
        viewBox="0 0 1440 74"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,74 480,6 720,30 C960,54 1200,70 1440,34 L1440,74 L0,74 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
