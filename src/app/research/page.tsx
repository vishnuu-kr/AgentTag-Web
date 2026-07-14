import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Identity & Governance Research | AgentTag",
  description:
    "Explore research, threat models, working papers, and specifications for autonomous AI agent governance and cryptographic identity.",
  keywords: [
    "AI agent research",
    "AI agent security models",
    "cryptographic agent identity research",
    "AgentTag threat models",
  ],
  alternates: { canonical: "https://agenttag.me/research" },
  openGraph: {
    title: "AI Agent Identity & Governance Research | AgentTag",
    description: "Explore research, threat models, working papers, and specifications for autonomous AI agent governance.",
    url: "https://agenttag.me/research",
    siteName: "AgentTag",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://agenttag.me/research",
      url: "https://agenttag.me/research",
      name: "AI Agent Identity & Governance Research | AgentTag",
      description: "Research drafts, notes, and threat models for AgentTag primitives.",
      isPartOf: { "@id": "https://agenttag.me/#website" },
      breadcrumb: { "@id": "https://agenttag.me/research#breadcrumb" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://agenttag.me/research#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://agenttag.me" },
        { "@type": "ListItem", position: 2, name: "Research", item: "https://agenttag.me/research" },
      ],
    },
  ],
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-xs text-white/40">
        <li><a href="https://agenttag.me" className="hover:text-white transition-colors">Home</a></li>
        <li aria-hidden="true">›</li>
        <li className="text-white/70" aria-current="page">Research</li>
      </ol>
    </nav>
  );
}

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-32 pt-12">
        <Breadcrumb />

        <header className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Research
          </h1>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
          <p className="text-white/80 text-base leading-relaxed">
            Notes, drafts, and references on the AgentTag Control Plane primitives: Ed25519 DIDs, hash-chained audit ledgers, mandate signing, and step-up human-in-the-loop controls.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Working papers and threat models are released as we ship each primitive.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full hover:brightness-110 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(177deg, var(--crimson-br), var(--crimson))" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to AgentTag
          </a>
        </div>
      </main>
    </>
  );
}
