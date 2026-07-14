import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Governance Case Studies | AgentTag",
  description:
    "Read customer case studies showing how teams deploy, tag, and govern autonomous AI agents in production environments using AgentTag.",
  keywords: [
    "AI agent case studies",
    "AgentTag case studies",
    "autonomous agent case studies",
    "AI governance in production",
  ],
  alternates: { canonical: "https://agenttag.me/case-studies" },
  openGraph: {
    title: "AI Agent Governance Case Studies | AgentTag",
    description: "Read customer case studies showing how teams deploy, tag, and govern autonomous AI agents in production.",
    url: "https://agenttag.me/case-studies",
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
      "@id": "https://agenttag.me/case-studies",
      url: "https://agenttag.me/case-studies",
      name: "AI Agent Governance Case Studies | AgentTag",
      description: "Customer case studies demonstrating AgentTag in production environments.",
      isPartOf: { "@id": "https://agenttag.me/#website" },
      breadcrumb: { "@id": "https://agenttag.me/case-studies#breadcrumb" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://agenttag.me/case-studies#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://agenttag.me" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://agenttag.me/case-studies" },
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
        <li className="text-white/70" aria-current="page">Case Studies</li>
      </ol>
    </nav>
  );
}

export default function CaseStudiesPage() {
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
            Case Studies
          </h1>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
          <p className="text-white/80 text-base leading-relaxed">
            Customer case studies are being prepared for public release.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            If you operate an autonomous-agent deployment and would like to be featured, email{" "}
            <a href="mailto:contact@agenttag.me" className="text-zinc-200 hover:underline">
              contact@agenttag.me
            </a>{" "}
            with a short description of your agent system and the controls you would expect.
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
