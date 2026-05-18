import { PageHero } from "@/components/page-hero";
import { editorialTimeline, readerBenefits } from "@/lib/site-data";

export const metadata = {
  title: "About Us"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A books blog designed to feel like a favorite independent bookstore."
        description="We focus on quiet, thoughtful presentation so reviews and summaries feel intimate, intelligent, and easy to explore."
      />

      <section className="container section split-layout">
        <div className="split-copy">
          <span className="section-tag">Our Story</span>
          <h2>Chapter & Grain began as a way to archive slow reading in a fast internet.</h2>
          <p>
            The idea behind this frontend is simple: give books, ideas, and language room to
            breathe. Instead of loud interface patterns, the design uses texture, typography, and
            spacious composition to make every post feel more considered.
          </p>
        </div>

        <div className="story-card large-card reveal">
          <p className="story-meta">Editorial Direction</p>
          <h3>Minimal by design, not by default.</h3>
          <p>
            The theme uses warm neutrals, deep forest accents, soft glass surfaces, and serif-led
            typography to keep the website visually attractive without losing readability.
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading compact">
          <div>
            <span className="section-tag">Editorial Values</span>
            <h2>What shapes the reading experience.</h2>
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
      </section>

      <section className="container section">
        <div className="section-heading compact">
          <div>
            <span className="section-tag">How We Work</span>
            <h2>Simple steps for a growing editorial platform.</h2>
          </div>
        </div>

        <div className="timeline-grid">
          {editorialTimeline.map((item) => (
            <article className="timeline-card reveal" key={item.step}>
              <p className="feature-index">{item.step}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
