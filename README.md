# devhandle.com — subdomain storefront

A Next.js (App Router) landing + booking flow for selling subdomains
under a root domain.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `app/lib/config.ts` — change `ROOT_DOMAIN`, reserved words, and pricing here.
  Everything else reads from this file.
- `app/api/check-subdomain/route.ts` — mock availability API (GET or POST
  with `?handle=`). Validates syntax, checks a reserved-word list, and a
  small fixed set of "taken" handles. Swap the `TAKEN` set for a real
  DNS-zone or database lookup in production.
- `app/components/ClaimConsole.tsx` — the hero + live search input, with
  debounced calls to the API route.
- `app/components/CheckoutModal.tsx` — the claim flow: pick a record type
  (CNAME / A / redirect), enter a destination and email, "Continue to
  Stripe Checkout." The actual Stripe session creation is stubbed with a
  comment showing where to wire in `stripe.checkout.sessions.create(...)`
  via a server action or API route.
- `app/components/Pricing.tsx`, `DnsDemo.tsx`, `ValueGrid.tsx`, `Faq.tsx` —
  the rest of the page, all driven by the same config file.

## Wiring up real payments

Replace the `setTimeout` in `CheckoutModal.tsx`'s `handleSubmit` with a
call to an API route that creates a Stripe Checkout session and redirects
`window.location.href` to `session.url`. On the Stripe webhook for
`checkout.session.completed`, provision the DNS record server-side rather
than trusting the client.
