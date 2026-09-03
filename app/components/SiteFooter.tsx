import { ROOT_DOMAIN } from "@/app/lib/config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/30 sm:flex-row">
        <span className="font-mono">{ROOT_DOMAIN}</span>
        <div className="flex gap-6">
          <a href="#faq" className="transition hover:text-white/60">Acceptable use</a>
          <a href="#faq" className="transition hover:text-white/60">Terms</a>
          <a href="#faq" className="transition hover:text-white/60">Support</a>
        </div>
      </div>
    </footer>
  );
}
