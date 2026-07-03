import { tinaField } from "tinacms/dist/react";
import NextImage from "next/image";
import { Splat } from "@/components/Splat";
import { titleStyle } from "@/components/titleStyle";

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

export function About({ data }: { data: any }) {
  const paragraphs = String(data.body ?? "")
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <section className="section about splat-host" id="apropos" data-variant={data.variant ?? "media-right"}>
      <Splat color="bleu" className="splat--about" />
      <div className="container">
        <div className="about__layout">
          <div className="about__text reveal">
            {data.eyebrow && (
              <p className="about__eyebrow">
                <span className="sticker" data-tina-field={tinaField(data, "eyebrow")}>
                  {data.eyebrow}
                </span>
              </p>
            )}
            <h2
              className="section-head__title"
              style={titleStyle(data)}
              data-tina-field={tinaField(data, "title")}
            >
              <TitleWithAccent title={data.title ?? ""} accentWord={data.accentWord} />
            </h2>
            <div className="about__body" data-tina-field={tinaField(data, "body")}>
              {paragraphs.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          {data.photos?.length > 0 && (
            <div className="about__media reveal">
              {data.photos.slice(0, 2).map((photo: any, i: number) =>
                photo?.src ? (
                  <div key={i} className="about__polaroid" data-tina-field={tinaField(photo)}>
                    <NextImage
                      src={photo.src}
                      alt={photo.alt ?? ""}
                      width={640}
                      height={800}
                      sizes="(max-width: 900px) 70vw, 360px"
                    />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
