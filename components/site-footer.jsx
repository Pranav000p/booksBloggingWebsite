import { footerColumns } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home">
            F<span>O</span>LIO
          </a>
          <p>A midnight library for reviews, summaries, essays, and beautifully slow reading.</p>
        </div>

        {footerColumns.map((column) => (
          <nav className="footer-column" key={column.label} aria-label={column.label}>
            <h2>{column.label}</h2>
            {column.links.map((link) => (
              <a href="#home" key={link}>
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="container footer-bar">
        <p>(c) 2024 Folio</p>
        <p>RSS | GitHub | Twitter | Instagram</p>
      </div>
    </footer>
  );
}
