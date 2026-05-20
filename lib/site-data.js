export const stats = [
  { value: "1,200+", label: "Books" },
  { value: "340", label: "Authors" },
  { value: "48K", label: "Readers" }
];

export const featuredPosts = [
  {
    title: "The Secret History",
    category: "Fiction",
    tone: "cool",
    author: "Donna Tartt",
    date: "May 12, 2026",
    readTime: "12 min",
    excerpt:
      "A dark, gripping tale of moral decay, intellectual arrogance, and murder at an elite New England college.",
    palette: "cover-sage",
    image: "/images/secret-history.jpg"
  },
  {
    title: "Metamorphosis",
    category: "Fiction",
    tone: "warm",
    author: "Franz Kafka",
    date: "May 8, 2026",
    readTime: "4 min",
    excerpt:
      "The unsettling, absurd story of Gregor Samsa, a traveling salesman who wakes up transformed into a giant insect.",
    palette: "cover-amber",
    image: "/images/metamorphosis.jpg"
  },
  {
    title: "The Art Stone",
    category: "Art",
    tone: "neutral",
    author: "Jesse A. Ellis",
    date: "May 3, 2026",
    readTime: "8 min",
    excerpt:
      "An exploration of creativity, nature, and the timeless connections between human expression and the physical world.",
    palette: "cover-navy",
    image: "/images/art-stone.jpg"
  },
  {
    title: "Eight Books for a Window-Lit Rainstorm",
    category: "Lists",
    tone: "warm",
    author: "Nadia Kapoor",
    date: "Apr 29, 2026",
    readTime: "4 min",
    excerpt:
      "A mood-led shelf for readers who want melancholy, intelligence, and a little candlelight.",
    palette: "cover-amber"
  }
];

export const genres = [
  { icon: "F", name: "Fiction", count: "128 posts", color: "#7A2840" },
  { icon: "E", name: "Essays", count: "76 posts", color: "#2A5040" },
  { icon: "B", name: "Biography", count: "54 posts", color: "#2A3F60" },
  { icon: "H", name: "History", count: "41 posts", color: "#563A68" },
  { icon: "P", name: "Poetry", count: "33 posts", color: "#6A4A2B" },
  { icon: "M", name: "Mystery", count: "62 posts", color: "#36535E" }
];

export const testimonials = [
  {
    name: "Ira M.",
    quote:
      "Folio makes criticism feel generous. I come for reviews and leave with a better vocabulary for why books stay with me.",
    book: "The Memory House"
  },
  {
    name: "Dev R.",
    quote:
      "The summaries are concise without being bloodless. They keep the feeling of the original intact.",
    book: "River Notes"
  },
  {
    name: "Samira K.",
    quote:
      "It feels like an old reading room learned how to breathe on the web. Beautiful, but still useful.",
    book: "A Field of Lamps"
  }
];

export const footerColumns = [
  {
    label: "Navigate",
    links: ["Blogs", "Reviews", "Summaries", "Authors", "About"]
  },
  {
    label: "Categories",
    links: ["Fiction", "Essays", "Biography", "History", "Poetry"]
  },
  {
    label: "Connect",
    links: ["RSS", "GitHub", "Twitter", "Instagram", "Contact"]
  }
];

export const siteMetrics = [
  {
    value: "1,200+",
    label: "Books indexed",
    note: "Reviews, summaries, and reading notes arranged for a richer editorial archive."
  },
  {
    value: "340",
    label: "Authors covered",
    note: "A growing shelf that moves across fiction, essays, biography, poetry, and history."
  },
  {
    value: "48K",
    label: "Monthly readers",
    note: "A focused reading community built around thoughtful criticism and calm discovery."
  },
  {
    value: "12K",
    label: "Newsletter readers",
    note: "Weekly recommendations without noise, spam, or algorithmic hurry."
  }
];

export const featuredEssays = featuredPosts.slice(0, 3).map((post) => ({
  title: post.title,
  category: post.category,
  author: post.author,
  readTime: post.readTime,
  mood: "Candlelit and precise",
  blurb: post.excerpt
}));

export const journalEntries = featuredPosts.map((post) => ({
  title: post.title,
  category: post.category,
  author: post.author,
  readTime: post.readTime,
  mood: "Atmospheric",
  blurb: post.excerpt
}));

export const publishingTracks = [
  {
    index: "Track 01",
    title: "Reviews",
    description: "Long-form criticism with strong hierarchy and enough quiet space for nuance."
  },
  {
    index: "Track 02",
    title: "Summaries",
    description: "Concise recaps that preserve theme, tone, structure, and reader context."
  },
  {
    index: "Track 03",
    title: "Reading Notes",
    description: "Flexible editorial fragments for quotes, annotations, lists, and essays."
  }
];

export const readerBenefits = [
  {
    title: "Editorial atmosphere",
    description: "Dark surfaces, warm typography, and spacious pacing make every piece feel considered."
  },
  {
    title: "Readable structure",
    description: "The interface supports skimming without stripping the writing of its literary voice."
  },
  {
    title: "Ready to grow",
    description: "The content model can expand into archives, author pages, newsletters, and CMS data."
  }
];

export const editorialTimeline = [
  {
    step: "Stage 01",
    title: "Choose the shelf",
    description: "Define the categories, tones, and book conversations the publication should own."
  },
  {
    step: "Stage 02",
    title: "Publish with rhythm",
    description: "Use recurring formats for reviews, summaries, essays, lists, and reader letters."
  },
  {
    step: "Stage 03",
    title: "Build the archive",
    description: "Add search, filtering, author trails, and CMS workflows once the foundation is live."
  }
];

export const contactChannels = [
  {
    label: "Editorial",
    value: "hello@folio-library.com",
    description: "For essays, reviews, guest posts, and reading-room correspondence.",
    href: "mailto:hello@folio-library.com"
  },
  {
    label: "Partnerships",
    value: "partners@folio-library.com",
    description: "For publishers, bookstores, festivals, and thoughtful brand collaborations.",
    href: "mailto:partners@folio-library.com"
  },
  {
    label: "Reader Notes",
    value: "@folio.library",
    description: "For recommendations, quote exchanges, and weekly reader conversations.",
    href: "#"
  }
];
