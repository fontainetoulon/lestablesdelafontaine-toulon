import NextImage from "next/image";

type ImageObj = { src?: string | null; alt?: string | null };

type Props = {
  image?: ImageObj | null;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  tinaField?: string;
};

// Rend une image depuis l'objet { src, alt } (alt garanti par le schéma).
// ⚠️ next/image fill exige un parent positionné (gotcha §10.6).
export function Media({
  image,
  className,
  priority,
  fill,
  sizes,
  width = 1200,
  height = 800,
  tinaField,
}: Props) {
  if (!image?.src) return null;
  const alt = image.alt ?? "";
  if (fill) {
    return (
      <NextImage
        data-tina-field={tinaField}
        src={image.src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
      />
    );
  }
  return (
    <NextImage
      data-tina-field={tinaField}
      src={image.src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      className={className}
      priority={priority}
    />
  );
}
