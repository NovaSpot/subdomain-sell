"use client";

import { useState } from "react";
import { ROOT_DOMAIN } from "@/app/lib/config";

const TARGETS = [
  { id: "vercel", label: "Vercel", record: "CNAME", value: "cname.vercel-dns.com" },
  { id: "pages", label: "GitHub Pages", record: "CNAME", value: "you.github.io" },
  { id: "notion", label: "Notion", record: "CNAME", value: "custom-domain.notion.site" },
  { id: "ip", label: "Custom IP", record: "A", value: "203.0.113.42" },
];

export default function DnsDemo() {
  const [active, setActive] = useState(TARGETS[0]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-medium text-paper sm:text-4xl">
            Point it anywhere. Change your mind later.
          </h2>
          <p className="mt-3 max-w-md text-white/50">
            Pick where your handle resolves to — a hosting platform, a bare
            server, or a plain redirect. Update it any time from the
            dashboard; changes go live without re-buying anything.
          </p>

          <div className="mt-8 flex flex-col gap-2">
            {TARGETS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${
                  active.id === t.id
                    ? "border-wire-400/40 bg-wire-500/10 text-paper"
                    : "border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                {t.label}
                <span className="font-mono text-xs text-white/30">{t.record}</span>
              </button>
            ))}
          </div>
        </div>

        {/* mock dashboard panel */}
        <div className="glass rounded-2xl p-1">
          <div className="rounded-xl bg-ink-950/60 p-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              <span className="ml-3 font-mono text-xs text-white/30">dns · you.{ROOT_DOMAIN}</span>
            </div>

            <div className="mt-6 space-y-3 font-mono text-sm">
              <Row k="Handle" v={`you.${ROOT_DOMAIN}`} />
              <Row k="Record type" v={active.record} highlight />
              <Row k="Points to" v={active.value} highlight />
              <Row k="TTL" v="300s" />
              <Row k="SSL" v="issued · auto-renews" />
              <div className="flex items-center gap-2 pt-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400/90">propagated to all edge nodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
      <span className="text-white/35">{k}</span>
      <span className={highlight ? "text-wire-400" : "text-white/70"}>{v}</span>
    </div>
  );
}
