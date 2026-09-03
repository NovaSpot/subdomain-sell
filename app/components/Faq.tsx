"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Lock, RotateCcw } from "lucide-react";
import { ROOT_DOMAIN } from "@/app/lib/config";

const FAQS = [
  {
    q: "What happens if I don't renew?",
    a: `You get a 30-day grace period after expiry where the handle still resolves but shows a renewal notice. After that, it returns to the available pool and anyone can claim it — we don't hold expired handles for you indefinitely.`,
  },
  {
    q: "Can you take a handle away from me?",
    a: `Only for abuse: phishing, malware distribution, impersonation, or content that violates the acceptable use policy. You'll get an email with the specific reason and a chance to respond before anything is disabled.`,
  },
  {
    q: "How many DNS records can I add?",
    a: `Standard handles get 2 records (plus the wildcard), short handles get 5. If you need more — say, several subdomains under your handle — reach out and we'll usually accommodate it manually.`,
  },
  {
    q: "Do you host my site too?",
    a: `No. ${ROOT_DOMAIN} sells the handle and manages DNS — you still host your site wherever you like: Vercel, GitHub Pages, a VPS, whatever. This keeps your handle portable if you ever change hosts.`,
  },
  {
    q: "Is there a lifetime option?",
    a: `For standard handles, yes — a one-time payment that waives future renewals. It's not listed as a default price because we review each request manually to prevent bulk squatting. Ask via support after checkout.`,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24">
      <h2 className="font-display text-3xl font-medium text-paper sm:text-4xl">
        Questions worth asking before you buy.
      </h2>

      <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-6 text-[15px] font-medium text-paper">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-white/50">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-10 text-sm text-white/35">
        <span className="flex items-center gap-2">
          <Lock size={15} /> Stripe-secured checkout
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck size={15} /> Free SSL on every handle
        </span>
        <span className="flex items-center gap-2">
          <RotateCcw size={15} /> 30-day renewal grace period
        </span>
      </div>
    </section>
  );
}
