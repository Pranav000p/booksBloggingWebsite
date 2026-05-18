import Link from "next/link";
import {
  featuredEssays,
  publishingTracks,
  readerBenefits,
  siteMetrics
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="reveal">
            <span className="section-tag">Editorial Book Journal</span>
            <h1>Quietly beautiful writing for readers who linger after the last page.</h1>
            <p className="hero-copy">
              Chapter & Grain is a calm space for book blogs, precise summaries, and honest
              reviews designed like an independent reading room.
            </p>
            <div className="button-row">
              <Link className="button" href="/journal">
                Browse the Journal
              </Link>
              <Link className="button secondary" href="/about">
                About the Studio
              </Link>
            </div>
          </div>

          <div className="hero-panel float-card">
            <div className="hero-panel-header">
              <p className="eyebrow">This week on the shelf</p>
              <span className="badge">Fresh Notes</span>
            </div>

            <div className="stack-list">
              {featuredEssays.slice(0, 3).map((story) => (
                <article className="mini-story" key={story.title}>
                  <div>
                    <p className="mini-story-meta">
                      {story.category} <span>|</span> {story.readTime}
                    </p>
                    <h2>{story.title}</h2>
                  </div>
                  <p>{story.blurb}</p>
                </article>
              ))}
            </div>

            <div className="quote-card">
              <p>
                &ldquo;The best book conversations feel unhurried. We built the interface the same
                way.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="metric-grid">
          {siteMetrics.map((item) => (
            <article className="metric-card reveal" key={item.label}>
              <p className="metric-value">{item.value}</p>
              <h2>{item.label}</h2>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="section-tag">Featured Writing</span>
            <h2>Thoughtful posts that balance insight, warmth, and clarity.</h2>
          </div>
          <Link className="text-link" href="/journal">
            View all entries
          </Link>
        </div>

        <div className="story-grid">
          {featuredEssays.map((story) => (
            <article className="story-card reveal" key={story.title}>
              <p className="story-meta">
                {story.category} <span>|</span> {story.author}
              </p>
              <h3>{story.title}</h3>
              <p>{story.blurb}</p>
              <div className="story-footer">
                <span>{story.readTime}</span>
                <span>{story.mood}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section split-layout">
        <div className="split-copy">
          <span className="section-tag">What We Publish</span>
          <h2>Built for summaries, reviews, and reflective book blogging.</h2>
          <p>
            The layout keeps the experience minimal, but the structure is ready for multiple
            content styles so the site can grow with your editorial voice.
          </p>
        </div>

        <div className="stack-grid">
          {publishingTracks.map((track) => (
            <article className="feature-card reveal" key={track.title}>
              <p className="feature-index">{track.index}</p>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="reader-panel">
          <div className="section-heading compact">
            <div>
              <span className="section-tag">Why It Feels Different</span>
              <h2>A simple UI that still has personality.</h2>
            </div>
          </div>

          <div className="benefit-grid">
            {readerBenefits.map((benefit) => (
              <article className="benefit-card reveal" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-card reveal">
          <div>
            <span className="section-tag">Ready To Publish</span>
            <h2>Start with reviews today and expand into essays, lists, and reading guides.</h2>
          </div>
          <div className="button-row">
            <Link className="button" href="/contact">
              Contact Us
            </Link>
            <Link className="button ghost" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
