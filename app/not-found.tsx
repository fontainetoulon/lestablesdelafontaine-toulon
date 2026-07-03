import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", paddingBlock: "4rem" }}>
        <p>
          <span className="sticker">Oups…</span>
        </p>
        <h1 className="section-head__title" style={{ marginTop: "1rem" }}>
          Cette page s&apos;est <span className="accent-word">évaporée</span>
        </h1>
        <p className="section-head__intro" style={{ margin: "1rem auto 2rem" }}>
          Comme l&apos;eau de la fontaine un jour d&apos;été. Revenez à l&apos;accueil,
          la table est mise.
        </p>
        <Link href="/" className="btn btn--primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
