export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-copy">
        <span className="section-tag">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="page-hero-card">
          <span className="badge">Minimal UI</span>
          <span>Made to stay consistent across all pages.</span>
        </div>
      </div>
    </section>
  );
}
