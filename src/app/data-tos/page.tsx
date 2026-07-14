import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Platform Terms of Service | AgentTag",
  description:
    "AgentTag Data Platform Terms of Service — the agreement governing data-processing, audit log exports, and privacy commitments for agent execution.",
  keywords: [
    "AgentTag data terms",
    "AgentTag data platform terms",
    "AgentTag audit ledger terms",
    "AI agent data governance agreement",
  ],
  alternates: { canonical: "https://agenttag.me/data-tos" },
  openGraph: {
    title: "Data Platform Terms of Service | AgentTag",
    description: "The agreement governing data-processing, audit log exports, and privacy commitments for agent execution.",
    url: "https://agenttag.me/data-tos",
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
      "@id": "https://agenttag.me/data-tos",
      url: "https://agenttag.me/data-tos",
      name: "Data Platform Terms of Service | AgentTag",
      description: "Data-processing, audit log exports, and privacy commitments for agent execution.",
      isPartOf: { "@id": "https://agenttag.me/#website" },
      breadcrumb: { "@id": "https://agenttag.me/data-tos#breadcrumb" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://agenttag.me/data-tos#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://agenttag.me" },
        { "@type": "ListItem", position: 2, name: "Data Platform TOS", item: "https://agenttag.me/data-tos" },
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
        <li className="text-white/70" aria-current="page">Data Platform TOS</li>
      </ol>
    </nav>
  );
}

const lastUpdated = "July 14, 2025";

const sections = [
  {
    id: "scope",
    title: "1. Scope & application",
    content: [
      "These Data Platform Terms apply to your use of AgentTag data-processing services such as the audit-ledger export, mandate synchronisation, and historical analytics.",
    ],
  },
  {
    id: "ownership",
    title: "2. Data ownership & licence",
    content: [
      "You retain ownership of agent-derived content. We process content only to provide the Service you request and only for the duration required to deliver that Service.",
    ],
  },
  {
    id: "training",
    title: "3. Model training restrictions",
    content: [
      "We will never train third-party models on your content and will disclose any sub-processor changes at least 30 days in advance.",
    ],
  },
  {
    id: "contact",
    title: "4. Full agreement & contact",
    content: [
      "For the complete Data Platform Terms, including security and confidentiality commitments, email contact@agenttag.me.",
    ],
  },
];

export default function DataTosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-32 pt-12">
        <Breadcrumb />

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 mb-6">
            Last updated: {lastUpdated}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
            Data Platform Terms
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            These Data Platform Terms govern the processing and safety of your agent-derived data, logs, and cryptographic credentials.
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-8 scroll-mt-24">
              <h2 className="font-display text-lg font-bold text-white mb-4">{s.title}</h2>
              <div className="space-y-4">
                {s.content.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-white/60">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/50 to-zinc-950/30 p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Need our Data Processing Agreement (DPA)?</h2>
          <p className="text-white/55 mb-6">Contact our compliance team at <a href="mailto:contact@agenttag.me" className="text-zinc-200 hover:underline">contact@agenttag.me</a></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://agenttag.me" className="inline-flex items-center gap-2 rounded-full hover:brightness-110 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(177deg, var(--crimson-br), var(--crimson))" }}>
              Back to AgentTag
            </a>
            <a href="/terms" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-3 text-sm font-semibold text-white/80 transition-all hover:scale-105 active:scale-95">
              Terms of Service →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
