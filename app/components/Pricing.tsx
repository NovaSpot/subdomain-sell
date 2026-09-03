import { Check } from "lucide-react";
import { PRICING_TIERS, ROOT_DOMAIN } from "@/app/lib/config";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="max-w-lg">
        <h2 className="font-display text-3xl font-medium text-paper sm:text-4xl">
          Two tiers. Priced by length, not by feature-gating.
        </h2>
        <p className="mt-3 text-white/50">
          Every handle gets the same infrastructure. Shorter handles cost
          more because there are fewer of them left — not because we hold
          features back.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PRICING_TIERS.map((tier) => {
          const featured = tier.id === "premium";
          return (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-8 ${
                featured
                  ? "border-amber-400/30 bg-gradient-to-b from-amber-400/[0.06] to-transparent"
                  : "border-white/10 bg-ink-900/60"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-ink-950">
                  Scarce
                </span>
              )}
              <p className="font-mono text-xs text-white/40">{tier.length}</p>
              <h3 className="mt-1 font-display text-2xl font-medium text-paper">{tier.name}</h3>
              <p className="mt-2 text-sm text-white/50">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-paper">
                  {tier.id === "premium" ? "from " : ""}${tier.price}
                </span>
                <span className="text-white/40">/{tier.cadence}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/65">
                    <Check size={15} className={featured ? "mt-0.5 shrink-0 text-amber-400" : "mt-0.5 shrink-0 text-wire-400"} />
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#claim"
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition ${
                  featured
                    ? "bg-amber-400 text-ink-950 hover:bg-amber-300"
                    : "bg-wire-500 text-white hover:bg-wire-600"
                }`}
              >
                Claim now
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-white/30">
        Renewal price is locked at purchase for standard handles. {ROOT_DOMAIN} never auto-upgrades your tier.
      </p>
    </section>
  );
}
