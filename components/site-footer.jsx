import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-panel">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <h2>Chapter & Grain</h2>
            <p>
              A simple, editorial-style frontend for book blogs, summaries, and reviews with an
              inviting, bookstore-inspired visual identity.
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </nav>
        </div>

        <div className="site-footer-bar">
          <p>Designed for calm reading, thoughtful discovery, and future publishing growth.</p>
          <p>(c) {new Date().getFullYear()} Chapter & Grain</p>
        </div>
      </div>
    </footer>
  );
}
