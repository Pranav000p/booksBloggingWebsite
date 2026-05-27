import { FolioInteractions, GenreStrip, NewsletterForm } from "@/components/folio-interactions";
import { featuredPosts, genres, stats, testimonials } from "@/lib/site-data";
import { BookGridScroll } from "@/components/book-grid-scroll";


function SectionTitle({ eyebrow, title }) {
  return (
    <div className="section-heading char-reveal">
      <span className="section-tag">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function BookScene() {
  return (
    <div className="book-scene" aria-hidden="true">
      <div className="floating-book book-one">
        <span />
      </div>
      <div className="floating-book book-two">
        <span />
      </div>
      <div className="floating-book book-three">
        <span />
      </div>
      <div className="open-book">
        <i />
        <i />
      </div>
    </div>
  );
}

function PostCard({ post, featured = false }) {
  return (
    <article className={`post-card reveal ${featured ? "post-card-featured" : ""}`}>
      <div className={`post-cover ${post.palette}`} aria-hidden="true">
        {post.image ? (
          <img 
            src={post.image} 
            alt={`Cover for ${post.title}`} 
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <span />
        )}
      </div>
      <div className="post-copy">
        <span className={`tag tag-${post.tone}`}>{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="post-meta">
          <span className="avatar">{post.author.slice(0, 1)}</span>
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <a href="#newsletter" className="read-link">
          Read Post -&gt;
        </a>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <FolioInteractions />

      <section className="hero page-section" id="home">
        <div className="hero-image-layer">
          <img src="/images/hero-books-ambient.jpg" alt="Midnight Library Ambient Backdrop" aria-hidden="true" />
          <BookScene />
        </div>
        <div className="hero-glow" />
        <div className="hero-vignette" />

        <div className="container hero-content">
          <p className="hero-eyebrow reveal">Est. 2024 | Literary Reviews</p>
          <h1 className="hero-title">
            Where Every <em>Page</em>
            <span>Tells a <em>Story</em></span>
            <span>Worth Telling</span>
          </h1>
          <p className="hero-copy reveal">
            Folio is a midnight reading room for book reviews, precise summaries, and essays
            written with candlelit patience.
          </p>
          <div className="hero-actions reveal">
            <a className="button primary" href="#blogs">
              Begin Reading
            </a>
            <a className="button ghost" href="#reviews">
              Browse Reviews
            </a>
          </div>
          <div className="hero-stats reveal">
            {stats.map((item) => (
              <span key={item.label}>
                <strong>{item.value}</strong> {item.label}
              </span>
            ))}
          </div>
        </div>

        <a className="scroll-indicator" href="#blogs" aria-label="Scroll to posts">
          <span />
        </a>
      </section>

      <BookGridScroll />

      <section className="section posts-section page-section" id="blogs">
        <div className="container">
          <SectionTitle
            eyebrow="Latest Posts"
            title="New criticism, summaries, and reading notes from the quiet shelf."
          />
          <div className="post-grid" id="reviews">
            <PostCard post={featuredPosts[0]} featured />
            {featuredPosts.slice(1).map((post) => (
              <PostCard post={post} key={post.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="section page-section" id="genres">
        <div className="container">
          <SectionTitle eyebrow="Genre Browsing" title="Move across the stacks by mood and form." />
        </div>
        <GenreStrip>
          {[...genres, ...genres].map((genre, index) => (
            <article
              className="genre-card"
              key={`${genre.name}-${index}`}
              style={{ "--genre": genre.color }}
            >
              <span className="genre-icon">{genre.icon}</span>
              <h3>{genre.name}</h3>
              <p>{genre.count}</p>
              <a href="#blogs">Browse -&gt;</a>
            </article>
          ))}
        </GenreStrip>
      </section>

      <section className="section about-section page-section" id="about">
        <div className="container about-grid">
          <div className="pull-quote reveal">
            <span aria-hidden="true">&quot;</span>
            <p>
              We read for the sentence that keeps glowing after the room goes dark.
            </p>
          </div>
          <div className="about-copy reveal" id="voice">
            <span className="section-tag">Our Editorial Voice</span>
            <p>
              Folio treats every review as a small act of attention. We prefer texture over noise,
              context over hot takes, and criticism that leaves room for wonder.
            </p>
            <p>
              Summaries stay exact without becoming mechanical. Essays move slowly enough for the
              reader to feel the shape of a book, not just its plot.
            </p>
            <div className="stat-pills">
              <span>12 editors</span>
              <span>96% reader return</span>
            </div>
            <a href="#newsletter" className="read-link">
              Meet the reading room -&gt;
            </a>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="marquee" aria-hidden="true">
          <div>
            {["Asha 5/5", "Noah 5/5", "Mira 5/5", "Dev 5/5", "Ira 5/5", "Samira 5/5"].map(
              (item) => (
                <span key={item}>{item}</span>
              )
            )}
          </div>
          <div>
            {["Asha 5/5", "Noah 5/5", "Mira 5/5", "Dev 5/5", "Ira 5/5", "Samira 5/5"].map(
              (item) => (
                <span key={`${item}-copy`}>{item}</span>
              )
            )}
          </div>
        </div>

        <div className="container">
          <SectionTitle eyebrow="Reader Reviews" title="What the regulars keep telling us." />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card reveal" key={item.name}>
                <div className="stars" aria-label="5 star rating">
                  <span>*****</span>
                </div>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <div className="reviewer">
                  <div>
                    <strong>{item.name}</strong>
                    <span>Verified Reader</span>
                  </div>
                  <i aria-hidden="true" />
                  <small>{item.book}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-section page-section" id="newsletter">
        <div className="container newsletter-inner reveal">
          <span aria-hidden="true" className="newsletter-mark">
            &quot;
          </span>
          <span className="section-tag">Stay in the Story</span>
          <h2>Notes from the midnight shelf.</h2>
          <p>
            One finely edited letter each week: reviews, summaries, reading lists, and the
            sentences we cannot stop carrying around.
          </p>
          <NewsletterForm />
          <small>12,000 readers | No spam | Leave anytime</small>
        </div>
      </section>
    </>
  );
}
