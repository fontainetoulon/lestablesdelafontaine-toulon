import { tinaField } from "tinacms/dist/react";
import { titleStyle } from "@/components/titleStyle";

export function MapAccess({ data }: { data: any }) {
  const phoneHref = data.phone ? `tel:${String(data.phone).replace(/\s/g, "")}` : undefined;
  return (
    <section className="section" id="acces">
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
        <div className="map__layout reveal">
          {data.embedUrl && (
            <div className="map__frame" data-tina-field={tinaField(data, "embedUrl")}>
              <iframe
                src={data.embedUrl}
                title="Carte — nous trouver"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
          <div className="map__panel">
            {data.address && (
              <div>
                <h3>Adresse</h3>
                <p
                  style={{ whiteSpace: "pre-line" }}
                  data-tina-field={tinaField(data, "address")}
                >
                  {data.address}
                </p>
              </div>
            )}
            {data.phone && (
              <div>
                <h3>Réservation</h3>
                <p>
                  <a href={phoneHref} data-tina-field={tinaField(data, "phone")}>
                    {data.phone}
                  </a>
                </p>
              </div>
            )}
            {data.hours?.length > 0 && (
              <div>
                <h3>Horaires</h3>
                <ul className="map__hours">
                  {data.hours.map((slot: any, i: number) => (
                    <li key={i} data-tina-field={tinaField(slot)}>
                      <span className="map__hours-days">{slot?.days}</span>
                      <span>{slot?.opening}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.accessNote && (
              <p style={{ whiteSpace: "pre-line" }} data-tina-field={tinaField(data, "accessNote")}>
                {data.accessNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
