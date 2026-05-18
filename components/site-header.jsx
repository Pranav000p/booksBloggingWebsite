import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">C</span>
          <span className="brand-copy">
            <span className="brand-title">Chapter & Grain</span>
            <span className="brand-subtitle">Book blogs, reviews, and summaries</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>

        <Link className="button secondary" href="/journal">
          Start Reading
        </Link>
      </div>
    </header>
  );
}
