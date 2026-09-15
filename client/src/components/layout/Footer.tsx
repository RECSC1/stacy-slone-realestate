import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, COMPLIANCE } from "@/config/site";

const EXPLORE = [
  { label: "Search Homes", href: "/buy" },
  { label: "Home Valuation", href: "/home-valuation" },
  { label: "Communities", href: "/communities" },
  { label: "AI Home Search", href: "/ai-home-search" },
  { label: "Resources", href: "/resources" },
  { label: "About Stacy", href: "/about" },
];

const TOOLS = [
  { label: "All Tools", href: "/tools" },
  { label: "AI Concierge", href: "/concierge" },
  { label: "Mortgage Calculator", href: "/mortgage-calculator" },
  { label: "Property Alerts", href: "/property-alerts" },
  { label: "Compare Neighborhoods", href: "/compare-neighborhoods" },
  { label: "Virtual Staging", href: "/virtual-staging" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
      {children}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const linkClass =
    "text-sm text-[#fbf6ef]/65 transition-colors hover:text-accent-light";

  return (
    <footer className="bg-primary-dark text-[#fbf6ef]">
      {/* Hairline tan rule for editorial structure */}
      <div className="h-px w-full bg-accent/30" />

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-16 lg:grid-cols-4 lg:gap-10 lg:px-8">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl font-semibold text-[#fbf6ef]">
            {SITE.agentName}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            {SITE.brokerage}
          </p>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-[#fbf6ef]/60">
            Trusted real estate guidance across Durham, Hillsborough, Mebane,
            Burlington, Oxford, and the greater Triangle.
          </p>
        </div>

        {/* Explore */}
        <div>
          <Heading>Explore</Heading>
          <div className="flex flex-col gap-3">
            {EXPLORE.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <Heading>Tools</Heading>
          <div className="flex flex-col gap-3">
            {TOOLS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <Heading>Connect</Heading>
          <div className="flex flex-col gap-4 text-sm font-light text-[#fbf6ef]/70">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2.5 hover:text-accent-light"
            >
              <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="flex items-center gap-2.5 hover:text-accent-light"
            >
              <Mail className="h-4 w-4 text-accent" /> {SITE.email}
            </a>
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{" "}
              {SITE.officeAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Legal / compliance */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] space-y-3 px-5 py-8 text-xs font-light leading-relaxed text-[#fbf6ef]/55 sm:px-6 lg:px-8">
          <p>{COMPLIANCE.equalHousing}</p>
          <p>{COMPLIANCE.idxDisclaimer}</p>
          <p>{SITE.brokerageDisclaimer}</p>
          <p className="border-t border-white/10 pt-4 text-[#fbf6ef]/70">
            &copy; {year} {SITE.agentName}. All rights reserved. &middot;{" "}
            <Link href="/privacy" className="hover:text-accent-light">
              Privacy Policy
            </Link>{" "}
            &middot;{" "}
            <Link href="/terms" className="hover:text-accent-light">
              Terms of Use
            </Link>
          </p>
          <p className="pt-1 text-[11px] text-[#fbf6ef]/45">
            Website designed by{" "}
            <a
              href="https://conciergeforrealtors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fbf6ef]/55 transition-colors hover:text-accent-light"
            >
              Real Estate Concierge Services Co, LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
