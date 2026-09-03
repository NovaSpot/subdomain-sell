"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2, ArrowRight } from "lucide-react";
import { ROOT_DOMAIN } from "@/app/lib/config";
import CheckoutModal from "@/app/components/CheckoutModal";

type Status = "idle" | "checking" | "available" | "taken" | "invalid";

type CheckResponse = {
  handle: string;
  valid: boolean;
  available: boolean;
  reason?: string;
  tier: "standard" | "premium";
  price: number;
};

const SAMPLE_HANDLES = ["priya", "0x", "juno", "wren"];

export default function ClaimConsole() {
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  const runCheck = useCallback(async (handle: string) => {
    const id = ++requestId.current;
    setStatus("checking");
    try {
      const res = await fetch(`/api/check-subdomain?handle=${encodeURIComponent(handle)}`);
      const data: CheckResponse = await res.json();
      if (id !== requestId.current) return; // stale response, ignore
      setResult(data);
      if (!data.valid) setStatus("invalid");
      else setStatus(data.available ? "available" : "taken");
    } catch {
      if (id !== requestId.current) return;
      setStatus("invalid");
      setResult({ handle, valid: false, available: false, reason: "Couldn't reach the registry. Try again.", tier: "standard", price: 0 });
    }
  }, []);

  useEffect(() => {
    const clean = raw.trim().toLowerCase();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (clean.length === 0) {
      setStatus("idle");
      setResult(null);
      return;
    }
    debounceRef.current = setTimeout(() => runCheck(clean), 380);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [raw, runCheck]);

  const canClaim = status === "available" && result?.available;

  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-28">
      {/* subtle coordinate-grid backdrop, fading to the base color */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-sm text-wire-400/90">
          $ whois yourname.{ROOT_DOMAIN}
        </p>

        <h1 className="mx-auto mt-6 max-w-3xl text-[2.75rem] font-medium leading-[1.08] tracking-tight text-paper sm:text-6xl">
          <span className="font-display">Your name, permanently</span>
          <br />
          <span className="font-display text-glow">wired into {ROOT_DOMAIN}.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/55">
          Claim a subdomain, point it anywhere you build — GitHub Pages,
          Vercel, Notion, a bare IP — and keep it as long as you renew it.
          No hosting bundled in, no lock-in.
        </p>

        {/* the search / registry lookup */}
        <div id="claim" className="mx-auto mt-12 max-w-xl scroll-mt-24">
          <div
            className={`flex items-center rounded-xl border bg-ink-800/80 pl-5 pr-2 py-2 shadow-wire transition-colors ${
              status === "available"
                ? "border-emerald-400/40"
                : status === "taken" || status === "invalid"
                ? "border-red-400/30"
                : "border-white/10"
            }`}
          >
            <input
              value={raw}
              onChange={(e) => setRaw(e.target.value.toLowerCase())}
              placeholder="yourname"
              maxLength={32}
              spellCheck={false}
              autoComplete="off"
              aria-label="Desired subdomain handle"
              className="w-full bg-transparent font-mono text-lg text-paper placeholder:text-white/25 focus:outline-none"
            />
            <span className="whitespace-nowrap font-mono text-lg text-white/35">
              .{ROOT_DOMAIN}
            </span>
            <button
              onClick={() => canClaim && setModalOpen(true)}
              disabled={!canClaim}
              className="ml-3 flex shrink-0 items-center gap-1.5 rounded-lg bg-wire-500 px-4 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-wire-600 disabled:cursor-not-allowed disabled:bg-ink-600 disabled:text-white/35"
            >
              Claim
              <ArrowRight size={15} />
            </button>
          </div>

          {/* live feedback row */}
          <div className="mt-3 flex min-h-[24px] items-center justify-center gap-2 text-sm">
            <AnimatePresence mode="wait">
              {status === "checking" && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-white/45"
                >
                  <Loader2 size={14} className="animate-spin" />
                  checking the zone…
                </motion.div>
              )}
              {status === "available" && result && (
                <motion.div
                  key="available"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 font-mono text-emerald-400"
                >
                  <Check size={14} />
                  {result.handle}.{ROOT_DOMAIN} is open — ${result.price}/yr
                </motion.div>
              )}
              {status === "taken" && result && (
                <motion.div
                  key="taken"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-red-400"
                >
                  <X size={14} />
                  {result.reason ?? "Already claimed."}
                </motion.div>
              )}
              {status === "invalid" && result && (
                <motion.div
                  key="invalid"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-amber-400"
                >
                  <X size={14} />
                  {result.reason}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/30">
            <span>Try:</span>
            {SAMPLE_HANDLES.map((h) => (
              <button
                key={h}
                onClick={() => setRaw(h)}
                className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-white/50 transition hover:border-wire-400/40 hover:text-wire-400"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && canClaim && (
        <CheckoutModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          handle={result.handle}
          tier={result.tier}
          price={result.price}
        />
      )}
    </section>
  );
}
