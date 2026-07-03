"use client";

import { useCallback, useEffect, useState } from "react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  startIndex?: number;
  onClose: () => void;
};

// Visionneuse plein écran : clic hors image / Échap pour fermer, flèches pour naviguer.
export function Lightbox({ images, startIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, prev, next]);

  if (!count) return null;
  const current = images[Math.min(index, count - 1)];

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: la gestion clavier est globale (Échap)
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt || "Photo agrandie"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="lb__close" aria-label="Fermer" onClick={onClose}>
        ✕
      </button>
      {count > 1 && (
        <button type="button" className="lb__nav lb__nav--prev" aria-label="Photo précédente" onClick={prev}>
          ‹
        </button>
      )}
      <figure className="lb__figure">
        {/* biome-ignore lint/performance/noImgElement: tailles arbitraires en plein écran */}
        <img className="lb__img" src={current.src} alt={current.alt} />
        <figcaption className="lb__caption">
          {current.alt}
          {count > 1 && (
            <span className="lb__counter">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
      {count > 1 && (
        <button type="button" className="lb__nav lb__nav--next" aria-label="Photo suivante" onClick={next}>
          ›
        </button>
      )}
    </div>
  );
}
