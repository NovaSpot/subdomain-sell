// Change ROOT_DOMAIN and this propagates through the whole app —
// search bar, DNS demo, pricing, and checkout copy all read from here.
export const ROOT_DOMAIN = "devhandle.com";

export const RESERVED_WORDS = [
  "www", "api", "admin", "root", "mail", "smtp", "ftp", "ns1", "ns2",
  "app", "dashboard", "status", "docs", "blog", "support", "help",
  "billing", "checkout", "stripe", "webmail", "cpanel", "staging",
  "dev", "test", "beta", "cdn", "static", "assets", "img", "images",
  "login", "signup", "auth", "oauth", "secure", "vpn", "portal",
];

export const MIN_LENGTH = 3;
export const MAX_LENGTH = 32;

export type PricingTier = {
  id: "standard" | "premium";
  name: string;
  length: string;
  price: number;
  cadence: "yr" | "one-time";
  tagline: string;
  bullets: string[];
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "standard",
    name: "Standard handle",
    length: "4+ characters",
    price: 12,
    cadence: "yr",
    tagline: "For personal sites, portfolios, and project pages.",
    bullets: [
      "One subdomain, renewed yearly",
      "Free SSL, auto-renewed",
      "A, AAAA, CNAME, and TXT records",
      "Wildcard record for *.yourhandle." + ROOT_DOMAIN,
      "Point at GitHub Pages, Vercel, Notion, or any IP",
    ],
  },
  {
    id: "premium",
    name: "Short handle",
    length: "2–3 characters",
    price: 149,
    cadence: "yr",
    tagline: "Rare, high-signal handles. Priced by scarcity.",
    bullets: [
      "Everything in Standard",
      "Priority abuse review (faster restore if flagged)",
      "5 DNS records instead of 2",
      "First right of renewal, locked in at this rate",
      "Transferable to another account once per year",
    ],
  },
];

// Toy pricing curve for short handles — shorter and more vowel-dense
// (i.e. more pronounceable, more valuable) handles cost more.
export function quoteShortHandle(handle: string): number {
  const base = 149;
  const lengthMultiplier = handle.length === 2 ? 2.2 : 1;
  return Math.round(base * lengthMultiplier);
}
