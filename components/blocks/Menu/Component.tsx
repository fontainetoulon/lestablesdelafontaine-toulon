"use client";

import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { Splat } from "@/components/Splat";
import { titleStyle } from "@/components/titleStyle";

function itemPhotos(item: any): LightboxImage[] {
  const photos: LightboxImage[] = (item?.photos ?? [])
    .filter((p: any) => p?.src)
    .map((p: any) => ({ src: p.src, alt: p.alt ?? "" }));
  if (!photos.length && item?.image?.src) {
    photos.push({ src: item.image.src, alt: item.image.alt ?? "" });
  }
  return photos;
}

// Rend un texte en mettant en gras les portions encadrées de **deux étoiles**.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  );
}

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

export function Menu({ data }: { data: any }) {
  const [lightbox, setLightbox] = useState<LightboxImage[] | null>(null);

  const leadParagraphs = String(data.leadBody ?? "")
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <section className="section menu-section" id="carte">
      <Splat color="orange" className="splat--menu" />
      <Splat color="bleu" className="splat--menu-2" />
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

        <div className="menu-hero" data-has-lead={data.leadEyebrow ? "true" : "false"}>
        {data.leadEyebrow && (
          <div className="menu-lead reveal">
            <div className="menu-lead__head">
              <p className="menu-lead__eyebrow" data-tina-field={tinaField(data, "leadEyebrow")}>
                {data.leadEyebrow}
              </p>
              {data.leadTitle && (
                <h3
                  className="menu-lead__title"
                  data-tina-field={tinaField(data, "leadTitle")}
                >
                  <TitleWithAccent title={data.leadTitle} accentWord={data.leadAccentWord} />
                </h3>
              )}
            </div>
            {leadParagraphs.length > 0 && (
              <div className="menu-lead__body" data-tina-field={tinaField(data, "leadBody")}>
                {leadParagraphs.map((paragraph: string, i: number) => (
                  <p key={i}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            )}
            {data.leadFeatures?.length > 0 && (
              <ul className="feature-list">
                {data.leadFeatures.map((feature: any, i: number) => (
                  <li key={i} className="feature" data-tina-field={tinaField(feature)}>
                    <span className="feature__check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22">
                        <path
                          d="M5 12.5l4.5 4.5L19 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="feature__title" data-tina-field={tinaField(feature, "title")}>
                        {feature.title}
                      </p>
                      {feature.description && (
                        <p
                          className="feature__desc"
                          data-tina-field={tinaField(feature, "description")}
                        >
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {data.menuImage?.src && (
          <div className="menu__board-wrap reveal">
            <button
              type="button"
              className="menu__board"
              onClick={() =>
                setLightbox([{ src: data.menuImage.src, alt: data.menuImage.alt ?? "" }])
              }
              aria-label="Agrandir la carte"
              data-tina-field={tinaField(data, "menuImage")}
            >
              <Media
                image={data.menuImage}
                width={900}
                height={1200}
                sizes="(max-width: 760px) 92vw, 640px"
                className="menu__board-img"
              />
              <span className="sticker menu__board-hint" aria-hidden="true">
                🔍 Cliquez pour agrandir
              </span>
            </button>
          </div>
        )}
        </div>

        <ul className="menu__grid">
          {data.items?.map((item: any, i: number) => {
            const photos = itemPhotos(item);
            const cover = item?.image?.src ? item.image : item?.photos?.[0];
            return (
              <li key={i} className="menu-card reveal" data-tina-field={tinaField(item)}>
                <button
                  type="button"
                  className="menu-card__button"
                  onClick={() => photos.length && setLightbox(photos)}
                  disabled={!photos.length}
                  aria-label={
                    photos.length
                      ? `Voir les photos — ${item?.title} (${photos.length})`
                      : item?.title
                  }
                >
                  {cover?.src && (
                    <div className="menu-card__media">
                      <Media
                        image={cover}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {photos.length > 1 && (
                        <span className="menu-card__count" aria-hidden="true">
                          {photos.length} photos
                        </span>
                      )}
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
                    {photos.length > 0 && (
                      <span className="menu-card__cta" aria-hidden="true">
                        Voir les photos →
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {data.note && (
          <div className="menu__note reveal">
            <span className="sticker" data-tina-field={tinaField(data, "note")}>
              {data.note}
            </span>
          </div>
        )}
      </div>

      {lightbox && <Lightbox images={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
