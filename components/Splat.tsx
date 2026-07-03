// Tache décorative de la marque (orange / bleu) — purement ornementale.
type Props = {
  color?: "orange" | "bleu";
  className?: string;
};

const SRC: Record<string, string> = {
  orange: "/decor/tache-orange.png",
  bleu: "/decor/tache-bleu.webp",
};

export function Splat({ color = "orange", className }: Props) {
  return (
    // biome-ignore lint/performance/noImgElement: asset décoratif léger, hors flux de contenu
    <img
      src={SRC[color]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`splat ${className ?? ""}`.trim()}
    />
  );
}
