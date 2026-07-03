import type { CSSProperties } from "react";

type TitleAppearance = {
  titleSize?: string | null;
  titleFont?: string | null;
  titleColor?: string | null;
};

const SIZE_SCALE: Record<string, string> = {
  small: "0.82",
  normal: "1",
  large: "1.18",
};

// Apparence du titre pilotée par les champs Tina (niveau block > global).
// Retourne un style inline qui ne consomme QUE des tokens.
export function titleStyle(data: TitleAppearance): CSSProperties {
  const style: CSSProperties & Record<string, string> = {};
  if (data.titleSize && SIZE_SCALE[data.titleSize]) {
    style["--heading-scale"] = SIZE_SCALE[data.titleSize];
  }
  if (data.titleFont) {
    style.fontFamily = `var(--font-${data.titleFont})`;
  }
  if (data.titleColor === "accent") {
    style.color = "var(--accent)";
  } else if (data.titleColor === "ink") {
    style.color = "var(--ink)";
  }
  return style;
}
