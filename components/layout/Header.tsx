"use client";

import { useState } from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { CtaLink } from "@/components/CtaLink";

export function Header({ header }: { header: any }) {
  const [open, setOpen] = useState(false);

  const navLinks = (extraClass = "") =>
    header?.nav?.map((item: any, i: number) => {
      const cls = `site-header__link ${extraClass}`.trim();
      const props = {
        key: i,
        className: cls,
        "data-tina-field": tinaField(item),
        onClick: () => setOpen(false),
      };
      return item?.href?.startsWith("/") ? (
        <Link href={item.href} {...props}>
          {item?.label}
        </Link>
      ) : (
        <a href={item?.href} {...props}>
          {item?.label}
        </a>
      );
    });

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link href="/" className="site-header__brand" aria-label="Retour à l'accueil">
          {header?.logo?.src && (
            <Media
              image={header.logo}
              className="site-header__logo"
              width={104}
              height={104}
              sizes="52px"
              priority
              tinaField={tinaField(header, "logo")}
            />
          )}
          <span className="site-header__name" data-tina-field={tinaField(header, "siteName")}>
            {header?.siteName}
          </span>
        </Link>
        <nav className="site-header__nav" aria-label="Navigation principale">
          {navLinks()}
        </nav>
        <div className="site-header__actions">
          {header?.cta?.href && (
            <CtaLink
              {...header.cta}
              className="btn btn--primary site-header__cta"
              tinaField={tinaField(header, "cta")}
            />
          )}
          <button
            type="button"
            className="site-header__burger"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="menu-mobile"
        className="site-header__drawer"
        data-open={open}
        aria-label="Navigation mobile"
      >
        {navLinks()}
      </nav>
    </header>
  );
}
