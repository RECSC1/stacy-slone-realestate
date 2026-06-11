import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, COMPLIANCE } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl text-foreground">
            {SITE.agentName}
          </p>
          <p className="eyebrow mt-2 text-muted-foreground">
            {SITE.brokerage}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Trusted real estate guidance across the Triangle — Raleigh, Durham,
            Chapel Hill, Cary, and the communities in between.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="eyebrow mb-4 text-foreground">Explore</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/buy" className="hover:text-primary">Search Homes</Link></li>
            <li><Link href="/home-valuation" className="hover:text-primary">Home Valuation</Link></li>
            <li><Link href="/communities" className="hover:text-primary">Communities</Link></li>
            <li><Link href="/ai-home-search" className="hover:text-primary">AI Home Search</Link></li>
            <li><Link href="/resources" className="hover:text-primary">Resources</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Stacy</Link></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <p className="eyebrow mb-4 text-foreground">Tools</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/tools" className="hover:text-primary">All Tools</Link></li>
            <li><Link href="/concierge" className="hover:text-primary">AI Concierge</Link></li>
            <li><Link href="/mortgage-calculator" className="hover:text-primary">Mortgage Calculator</Link></li>
            <li><Link href="/property-alerts" className="hover:text-primary">Property Alerts</Link></li>
            <li><Link href="/compare-neighborhoods" className="hover:text-primary">Compare Neighborhoods</Link></li>
            <li><Link href="/virtual-staging" className="hover:text-primary">Virtual Staging</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow mb-4 text-foreground">Connect</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.officeAddress}
            </li>
          </ul>
        </div>
      </div>

      {/* Legal / compliance */}
      <div className="border-t border-border">
        <div className="container space-y-2 py-6 text-xs leading-relaxed text-muted-foreground">
          <p>{COMPLIANCE.equalHousing}</p>
          <p>{COMPLIANCE.idxDisclaimer}</p>
          <p>{SITE.brokerageDisclaimer} &middot; License {SITE.licenseNumber}</p>
          <p className="pt-2">
            &copy; {year} {SITE.agentName}, {SITE.brokerage}. All rights
            reserved. &middot;{" "}
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>{" "}
            &middot;{" "}
            <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
