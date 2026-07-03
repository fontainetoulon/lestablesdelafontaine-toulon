import { tinaField } from "tinacms/dist/react";
import { Media } from "@/components/Media";
import { Splat } from "@/components/Splat";
import { titleStyle } from "@/components/titleStyle";

export function Instagram({ data }: { data: any }) {
  return (
    <section className="section section--sage splat-host">
      <Splat color="orange" className="splat--instagram" />
      <div className="container">
        <div className="insta__head reveal">
          <h2
            className="section-head__title"
            style={titleStyle(data)}
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
          {data.profileUrl && data.handle && (
            <a
              className="insta__handle"
              href={data.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-tina-field={tinaField(data, "handle")}
            >
              {data.handle} ↗
            </a>
          )}
        </div>
        <div className="insta__grid">
          {data.posts?.map((post: any, i: number) => (
            <a
              key={i}
              className="insta__item reveal"
              href={post?.postUrl || data.profileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={post?.image?.alt || "Voir sur Instagram"}
              data-tina-field={tinaField(post)}
            >
              {post?.image?.src && (
                <Media
                  image={post.image}
                  fill
                  sizes="(max-width: 760px) 50vw, 25vw"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
