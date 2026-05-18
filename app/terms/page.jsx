import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Terms of Use"
};

const termsSections = [
  {
    title: "Use of Content",
    text: "The articles, reviews, summaries, and design elements on this website are provided for general reading and inspiration unless otherwise stated."
  },
  {
    title: "Accuracy and Opinions",
    text: "Book commentary reflects editorial perspective and should be treated as opinion-based content, even when factual references are included."
  },
  {
    title: "Intellectual Property",
    text: "Website copy, branding, layouts, and original editorial material should not be reproduced without permission from the site owner."
  },
  {
    title: "External Links",
    text: "Links to publishers, retailers, or other websites are offered for convenience and do not imply endorsement of third-party content."
  },
  {
    title: "Updates to These Terms",
    text: "The website owner may update these terms over time. Continued use of the site means visitors accept the latest posted version."
  }
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Use"
        title="Simple terms that complete the website without overloading the reader."
        description="The page is structured for clarity, with compact legal sections that feel consistent with the rest of the editorial design."
      />

      <section className="container section legal-grid">
        {termsSections.map((section) => (
          <article className="legal-card reveal" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
