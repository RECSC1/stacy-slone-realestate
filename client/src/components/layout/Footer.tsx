import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, COMPLIANCE, ASSETS } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-white">
      <div className="container grid gap-16 py-20 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl text-primary-dark font-semibold">
            {SITE.agentName}
          </p>
          <p className="section-eyebrow mt-3 mb-4">
            {SITE.brokerage}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-light font-light">
            Trusted real estate guidance across the Triangle — Raleigh, Durham,
            Chapel Hill, Cary, and the communities in between.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="section-eyebrow mb-6 text-primary-dark">Explore</p>
          <ul className="space-y-3 text-sm text-text-light font-light">
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
          <p className="section-eyebrow mb-6 text-primary-dark">Tools</p>
          <ul className="space-y-3 text-sm text-text-light font-light">
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
          <p className="section-eyebrow mb-6 text-primary-dark">Connect</p>
          <ul className="space-y-4 text-sm text-text-light font-light">
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

      {/* KW Elite Branding */}
      <div className="border-t border-accent bg-primary py-6">
        <div className="container flex items-center justify-between">
          <img
            src={ASSETS.kwEliteLogo}
            alt="Keller Williams Elite Realty"
            className="h-10 w-auto"
          />
          <p className="text-xs text-text-light font-light">
            Proudly affiliated with Keller Williams Elite Realty
          </p>
        </div>
      </div>

      {/* Legal / compliance */}
      <div className="border-t border-border bg-white">
        <div className="container space-y-3 py-8 text-xs leading-relaxed text-text-light font-light">
          <p>{COMPLIANCE.equalHousing}</p>
          <p>{COMPLIANCE.idxDisclaimer}</p>
          <p>{SITE.brokerageDisclaimer}</p>
          <p className="pt-4 border-t border-accent">
            &copy; {year} {SITE.agentName}. All rights reserved. &middot;{" "}
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>{" "}
            &middot;{" "}
            <Link href="/terms" className="hover:text-accent">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
