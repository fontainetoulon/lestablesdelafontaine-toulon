type AppearanceData = {
  accentColor?: string | null;
  headingFont?: string | null;
  fontScale?: string | null;
  headingScale?: string | null;
  shapeStyle?: string | null;
} | null;

const FONT_SCALE: Record<string, string> = {
  compact: "0.94",
  normal: "1",
  large: "1.08",
};

const HEADING_SCALE: Record<string, string> = {
  small: "0.85",
  compact: "0.93",
  normal: "1",
  large: "1.12",
};

const RADIUS: Record<string, string> = {
  sharp: "6px",
  soft: "14px",
  round: "22px",
};

// Injecte les réglages d'apparence choisis par le client (Tina → variables CSS).
export function Appearance({ appearance }: { appearance?: AppearanceData }) {
  if (!appearance) return null;
  const vars: string[] = [];
  if (appearance.accentColor && /^#[0-9a-f]{3,8}$/i.test(appearance.accentColor)) {
    vars.push(`--accent:${appearance.accentColor}`);
  }
  if (appearance.headingFont) {
    vars.push(`--font-display:var(--font-${appearance.headingFont})`);
  }
  if (appearance.fontScale && FONT_SCALE[appearance.fontScale]) {
    vars.push(`--font-scale:${FONT_SCALE[appearance.fontScale]}`);
  }
  if (appearance.headingScale && HEADING_SCALE[appearance.headingScale]) {
    vars.push(`--heading-scale:${HEADING_SCALE[appearance.headingScale]}`);
  }
  if (appearance.shapeStyle && RADIUS[appearance.shapeStyle]) {
    vars.push(`--radius:${RADIUS[appearance.shapeStyle]}`);
  }
  if (!vars.length) return null;
  return <style>{`:root{${vars.join(";")}}`}</style>;
}
