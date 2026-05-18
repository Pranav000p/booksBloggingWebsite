import { PageHero } from "@/components/page-hero";
import { contactChannels } from "@/lib/site-data";

export const metadata = {
  title: "Contact Us"
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about editorial ideas, partnerships, and reader conversations."
        description="This page includes a polished frontend contact experience that can later be connected to email, a CMS, or a backend form handler."
      />

      <section className="container section contact-layout">
        <div className="stack-grid">
          {contactChannels.map((channel) => (
            <article className="feature-card reveal" key={channel.label}>
              <p className="feature-index">{channel.label}</p>
              <h3>{channel.value}</h3>
              <p>{channel.description}</p>
              <a className="text-link" href={channel.href}>
                Reach out
              </a>
            </article>
          ))}
        </div>

        <div className="form-card reveal">
          <div className="section-heading compact">
            <div>
              <span className="section-tag">Frontend Preview</span>
              <h2>Send a message</h2>
            </div>
          </div>

          <form className="contact-form">
            <label>
              Full name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email address
              <input type="email" placeholder="name@example.com" />
            </label>
            <label>
              Topic
              <select defaultValue="General enquiry">
                <option>General enquiry</option>
                <option>Guest post</option>
                <option>Brand partnership</option>
                <option>Review request</option>
              </select>
            </label>
            <label>
              Message
              <textarea placeholder="Tell us what you would like to build or discuss." rows="6" />
            </label>
            <button className="button" type="button">
              Send message
            </button>
            <p className="form-note">
              This form is ready for frontend presentation and can be connected to your preferred
              submission workflow later.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
