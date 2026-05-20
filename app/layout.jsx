import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: {
    default: "Folio",
    template: "%s | Folio"
  },
  description:
    "A dark editorial books blog for reviews, reading notes, and thoughtful summaries.",
  keywords: ["books blog", "book reviews", "summaries", "reading notes", "next.js"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
