import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Privacy Policy"
};

const privacySections = [
  {
    title: "Information We Collect",
    text: "We may collect information you choose to share through contact forms, newsletter signups, or other direct interactions on the website."
  },
  {
    title: "How We Use Information",
    text: "Information is used to respond to enquiries, improve the reading experience, and support editorial communication related to the website."
  },
  {
    title: "Cookies and Analytics",
    text: "Basic analytics and cookie tools may be used to understand traffic patterns, favorite content types, and site performance."
  },
  {
    title: "Third-Party Services",
    text: "If future integrations are added for forms, newsletters, or analytics, those services may process information according to their own privacy terms."
  },
  {
    title: "Your Choices",
    text: "Visitors can request updates or removal of submitted information and can choose whether to participate in optional communications."
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="A clear, reader-friendly privacy page for the website frontend."
        description="This content is intentionally simple and easy to scan, giving your project a complete legal foundation while staying visually aligned with the rest of the site."
      />

      <section className="container section legal-grid">
        {privacySections.map((section) => (
          <article className="legal-card reveal" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
