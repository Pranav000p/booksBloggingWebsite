"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["Blogs", "#blogs"],
  ["Reviews", "#reviews"],
  ["Summaries", "#genres"],
  ["Authors", "#voice"],
  ["About", "#about"]
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container site-header-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Folio home">
          F<span>O</span>LIO
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#newsletter">
          Subscribe
          <span aria-hidden="true">-&gt;</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {navItems.map(([label, href], index) => (
          <a
            href={href}
            key={label}
            onClick={closeMenu}
            style={{ "--delay": `${index * 60}ms` }}
          >
            {label}
          </a>
        ))}
        <a href="#newsletter" onClick={closeMenu} style={{ "--delay": "300ms" }}>
          Subscribe
        </a>
      </div>
    </header>
  );
}
