import { tinaField } from "tinacms/dist/react";
import { ContactForm } from "@/components/ContactForm";
import { titleStyle } from "@/components/titleStyle";

export function Contact({ data }: { data: any }) {
  const phoneHref = data.phone ? `tel:${String(data.phone).replace(/\s/g, "")}` : undefined;
  return (
    <section className="section section--tint" id="contact">
      <div className="container">
        <div className="contact__layout">
          <div className="reveal">
            <header className="section-head" style={{ marginBottom: "0.5rem" }}>
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
            <ul className="contact__list">
              <li>
                <a href={`mailto:${data.email}`} data-tina-field={tinaField(data, "email")}>
                  {data.email}
                </a>
              </li>
              {data.phone && (
                <li>
                  <a href={phoneHref} data-tina-field={tinaField(data, "phone")}>
                    {data.phone}
                  </a>
                </li>
              )}
              {data.address && (
                <li style={{ whiteSpace: "pre-line" }} data-tina-field={tinaField(data, "address")}>
                  {data.address}
                </li>
              )}
            </ul>
          </div>
          {data.showForm && (
            <div className="reveal">
              <ContactForm to={data.email} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
