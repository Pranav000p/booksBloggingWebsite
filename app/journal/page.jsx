import { PageHero } from "@/components/page-hero";
import { journalEntries } from "@/lib/site-data";

export const metadata = {
  title: "Journal"
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="A curated feed of reviews, summaries, lists, and reading notes."
        description="This page acts like the publishing hub of the site, giving the platform a dedicated space for blog content beyond the homepage."
      />

      <section className="container section">
        <div className="chip-row">
          <span className="chip active">All Posts</span>
          <span className="chip">Reviews</span>
          <span className="chip">Summaries</span>
          <span className="chip">Reading Guides</span>
        </div>

        <div className="journal-layout">
          <div className="story-grid">
            {journalEntries.map((entry) => (
              <article className="story-card reveal" key={entry.title}>
                <p className="story-meta">
                  {entry.category} <span>|</span> {entry.author}
                </p>
                <h3>{entry.title}</h3>
                <p>{entry.blurb}</p>
                <div className="story-footer">
                  <span>{entry.readTime}</span>
                  <span>{entry.mood}</span>
                </div>
              </article>
            ))}
          </div>

          <aside className="side-note reveal">
            <span className="section-tag">Editorial Rhythm</span>
            <h2>Built for a growing content library.</h2>
            <p>
              The journal layout gives you a clean home for future CMS content, category pages, and
              featured collections without changing the visual language of the website.
            </p>
            <div className="side-note-block">
              <p className="eyebrow">Suggested next step</p>
              <p>
                Connect these cards to a CMS or local markdown source once you are ready to move
                beyond static frontend content.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
