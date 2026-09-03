import SiteHeader from "@/app/components/SiteHeader";
import ClaimConsole from "@/app/components/ClaimConsole";
import ValueGrid from "@/app/components/ValueGrid";
import DnsDemo from "@/app/components/DnsDemo";
import Pricing from "@/app/components/Pricing";
import Faq from "@/app/components/Faq";
import SiteFooter from "@/app/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-950">
      <SiteHeader />
      <ClaimConsole />
      <ValueGrid />
      <DnsDemo />
      <Pricing />
      <Faq />
      <SiteFooter />
    </main>
  );
}
