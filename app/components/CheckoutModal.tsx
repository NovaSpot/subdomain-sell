"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { ROOT_DOMAIN } from "@/app/lib/config";

type RecordType = "cname" | "a" | "redirect";

const RECORD_OPTIONS: { id: RecordType; label: string; placeholder: string; hint: string }[] = [
  { id: "cname", label: "CNAME", placeholder: "yourproject.vercel.app", hint: "Points at another hostname — Vercel, Netlify, GitHub Pages, etc." },
  { id: "a", label: "A record", placeholder: "203.0.113.42", hint: "Points directly at a server's IPv4 address." },
  { id: "redirect", label: "URL redirect", placeholder: "https://github.com/you", hint: "Visitors are forwarded to this URL. No hosting required." },
];

export default function CheckoutModal({
  open,
  onClose,
  handle,
  tier,
  price,
}: {
  open: boolean;
  onClose: () => void;
  handle: string;
  tier: "standard" | "premium";
  price: number;
}) {
  const [step, setStep] = useState<"configure" | "processing" | "done">("configure");
  const [recordType, setRecordType] = useState<RecordType>("cname");
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setStep("configure");
      setDestination("");
      setEmail("");
      setRecordType("cname");
    }
  }, [open]);

  const activeOption = RECORD_OPTIONS.find((r) => r.id === recordType)!;
  const canSubmit = destination.trim().length > 2 && email.includes("@");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStep("processing");
    // Placeholder for a real Stripe Checkout session creation, e.g.:
    // const session = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ handle, recordType, destination, email }) })
    // window.location.href = session.url
    setTimeout(() => setStep("done"), 1400);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Claim ${handle}.${ROOT_DOMAIN}`}
            className="glass relative w-full max-w-md rounded-t-2xl border-t sm:rounded-2xl sm:border"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="p-6">
              {step === "configure" && (
                <>
                  <p className="font-mono text-xs text-wire-400">
                    {tier === "premium" ? "short handle" : "standard handle"}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-medium text-paper">
                    {handle}
                    <span className="text-white/40">.{ROOT_DOMAIN}</span>
                  </h3>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <fieldset>
                      <legend className="mb-2 text-sm text-white/60">Where should it point?</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {RECORD_OPTIONS.map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setRecordType(opt.id)}
                            className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                              recordType === opt.id
                                ? "border-wire-400/50 bg-wire-500/15 text-wire-400"
                                : "border-white/10 text-white/50 hover:border-white/20"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/35">{activeOption.hint}</p>
                    </fieldset>

                    <label className="block">
                      <span className="mb-1.5 block text-sm text-white/60">Destination</span>
                      <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder={activeOption.placeholder}
                        required
                        className="w-full rounded-lg border border-white/10 bg-ink-900 px-3 py-2.5 font-mono text-sm text-paper placeholder:text-white/25 focus:border-wire-400/50 focus:outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm text-white/60">Email for the receipt and DNS alerts</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        className="w-full rounded-lg border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-paper placeholder:text-white/25 focus:border-wire-400/50 focus:outline-none"
                      />
                    </label>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-900/60 px-4 py-3">
                      <span className="text-sm text-white/60">Due today</span>
                      <span className="font-mono text-lg text-paper">${price}<span className="text-sm text-white/40">/yr</span></span>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-wire-500 py-3 text-sm font-semibold text-white transition enabled:hover:bg-wire-600 disabled:cursor-not-allowed disabled:bg-ink-600 disabled:text-white/35"
                    >
                      <Lock size={14} />
                      Continue to Stripe Checkout
                    </button>
                    <p className="text-center text-xs text-white/25">
                      You'll finish payment on Stripe's secure page. We never see your card.
                    </p>
                  </form>
                </>
              )}

              {step === "processing" && (
                <div className="flex flex-col items-center justify-center gap-4 py-14">
                  <motion.div
                    className="h-8 w-8 rounded-full border-2 border-wire-400/30 border-t-wire-400"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  <p className="text-sm text-white/50">Reserving {handle}.{ROOT_DOMAIN}…</p>
                </div>
              )}

              {step === "done" && (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 size={40} className="text-emerald-400" />
                  <h3 className="font-display text-xl text-paper">Handle reserved</h3>
                  <p className="max-w-xs text-sm text-white/50">
                    In production, this hands off to Stripe Checkout, then provisions
                    the {activeOption.label} record on payment confirmation. DNS
                    propagates in under five minutes.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 flex items-center gap-1 text-sm font-medium text-wire-400 hover:text-wire-300"
                  >
                    Done <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
