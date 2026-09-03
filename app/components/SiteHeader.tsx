"use client";

import { Terminal } from "lucide-react";
import { ROOT_DOMAIN } from "@/app/lib/config";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-wire-500/15 text-wire-400">
            <Terminal size={16} strokeWidth={2} />
          </span>
          <span className="font-mono text-[15px] tracking-tight text-paper">
            {ROOT_DOMAIN}
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#claim" className="transition hover:text-white">Claim a handle</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
        <a
          href="#claim"
          className="rounded-lg border border-wire-400/30 bg-wire-500/10 px-4 py-2 text-sm font-medium text-wire-400 transition hover:bg-wire-500/20"
        >
          Check a handle
        </a>
      </div>
    </header>
  );
}
