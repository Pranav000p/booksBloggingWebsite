import { footerColumns } from "@/lib/site-data";

export function SiteFooter() {
  const getLinkHref = (label, link) => {
    if (label === "Navigate") {
      if (link === "Blogs") return "#blogs";
      if (link === "Reviews") return "#reviews";
      if (link === "Summaries") return "#genres";
      if (link === "Authors") return "#voice";
      if (link === "About") return "/about";
    }
    if (label === "Connect" && link === "Contact") {
      return "/contact";
    }
    return "#";
  };

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
              <a href={getLinkHref(column.label, link)} key={link}>
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="container footer-bar">
        <p>&copy; {new Date().getFullYear()} FOLIO. All rights reserved.</p>
        <p>RSS | GitHub | Twitter | Instagram</p>
      </div>
    </footer>
  );
}

