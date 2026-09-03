import { Zap, ShieldCheck, GitBranch, Infinity as InfinityIcon } from "lucide-react";

const ITEMS = [
  {
    icon: Zap,
    title: "DNS live in minutes",
    body: "Records propagate to our edge resolvers as soon as checkout completes — no ticket, no waiting on support.",
  },
  {
    icon: ShieldCheck,
    title: "SSL included, always",
    body: "Every handle gets a certificate the moment it's claimed, renewed automatically for as long as you keep the handle.",
  },
  {
    icon: GitBranch,
    title: "Full record control",
    body: "Manage A, CNAME, TXT, and wildcard records yourself from the dashboard — repoint your handle whenever your stack changes.",
  },
  {
    icon: InfinityIcon,
    title: "Renew yearly or lock it in",
    body: "Standard handles renew annually at a fixed price. Ask about a lifetime rate if you want to stop thinking about it.",
  },
];

export default function ValueGrid() {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="max-w-lg">
        <h2 className="font-display text-3xl font-medium text-paper sm:text-4xl">
          Built like infrastructure, not a marketing gimmick.
        </h2>
        <p className="mt-3 text-white/50">
          Your handle is a real subdomain with real DNS records you control —
          not a redirect service that can disappear.
        </p>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="group bg-ink-900 p-6 transition-colors hover:bg-ink-800">
            <Icon size={20} className="text-wire-400" strokeWidth={1.75} />
            <h3 className="mt-4 font-display text-[15px] font-medium text-paper">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
