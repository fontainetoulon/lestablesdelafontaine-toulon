import Link from "next/link";

type Props = {
  label?: string | null;
  href?: string | null;
  newTab?: boolean | null;
  className?: string;
  tinaField?: string;
};

export function CtaLink({ label, href, newTab, className, tinaField }: Props) {
  if (!href || !label) return null;
  const cls = className ?? "btn btn--primary";
  const isInternal = href.startsWith("/") && !newTab;
  if (isInternal) {
    return (
      <Link href={href} className={cls} data-tina-field={tinaField}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      data-tina-field={tinaField}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
