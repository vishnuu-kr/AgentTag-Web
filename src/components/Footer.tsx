"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide global layout footer on the homepage and support page, as they provide their own custom footer
  if (pathname === "/" || pathname === "/support" || pathname === "/support/") {
    return null;
  }

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="https://agenttag.me" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <img src="/favicon.svg" alt="AgentTag Logo" height={24} width={24} style={{ filter: 'invert(1)' }} className="h-6 w-auto" />
            <span className="font-display text-sm font-bold text-foreground">AgentTag</span>
          </a>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/about" className="text-xs text-white/50 hover:text-white transition-colors">About</a>
            <a href="/security" className="text-xs text-white/50 hover:text-white transition-colors">Security</a>
            <a href="/support" className="text-xs text-white/50 hover:text-white transition-colors">Support</a>
            <a href="/blog" className="text-xs text-white/50 hover:text-white transition-colors">Blog</a>
            <a href="/privacy" className="text-xs text-white/50 hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="text-xs text-white/50 hover:text-white transition-colors">Terms</a>
          </nav>
          <p className="text-xs text-white/30">© {new Date().getFullYear()} AgentTag</p>
        </div>
      </div>
    </footer>
  );
}
