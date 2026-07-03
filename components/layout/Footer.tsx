"use client";

import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";

const NETWORK_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function Footer({ global }: { global: any }) {
  const header = global?.header;
  const footer = global?.footer;
  const contact = global?.contact;
  const year = new Date().getFullYear();
  const phoneHref = contact?.phone
    ? `tel:${String(contact.phone).replace(/\s/g, "")}`
    : undefined;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div>
          {header?.logo?.src && (
            <Media
              image={header.logo}
              className="site-footer__logo"
              width={168}
              height={168}
              sizes="84px"
            />
          )}
          {footer?.baseline && (
            <p className="site-footer__baseline" data-tina-field={tinaField(footer, "baseline")}>
              {footer.baseline}
            </p>
          )}
        </div>
        <div>
          <h3>Nous trouver</h3>
          <ul>
            {contact?.address && (
              <li style={{ whiteSpace: "pre-line" }} data-tina-field={tinaField(contact, "address")}>
                {contact.address}
                {contact?.zip || contact?.city ? (
                  <>
                    {"\n"}
                    {[contact?.zip, contact?.city].filter(Boolean).join(" ")}
                  </>
                ) : null}
              </li>
            )}
            {contact?.phone && (
              <li>
                <a href={phoneHref} data-tina-field={tinaField(contact, "phone")}>
                  {contact.phone}
                </a>
              </li>
            )}
            {contact?.email && (
              <li>
                <a href={`mailto:${contact.email}`} data-tina-field={tinaField(contact, "email")}>
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3>Horaires</h3>
          <ul>
            {contact?.hours?.map((slot: any, i: number) => (
              <li key={i} data-tina-field={tinaField(slot)}>
                {slot?.days} · {slot?.opening}
              </li>
            ))}
          </ul>
          {footer?.social?.length > 0 && (
            <>
              <h3 style={{ marginTop: "1.4rem" }}>Suivez-nous</h3>
              <ul>
                {footer.social.map((item: any, i: number) => (
                  <li key={i}>
                    <a
                      href={item?.url}
                      target="_blank"
                      rel="noreferrer"
                      data-tina-field={tinaField(item)}
                    >
                      {NETWORK_LABELS[item?.network] ?? item?.network}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="site-footer__bottom container">
        <span>
          © {year} {header?.siteName}
        </span>
        <span>Site réalisé avec ❤ à Toulon</span>
      </div>
    </footer>
  );
}
