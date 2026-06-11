import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Buy",
    href: "/buy",
    children: [
      { label: "Search Homes", href: "/buy" },
      { label: "AI Home Search", href: "/ai-home-search" },
      { label: "Property Alerts", href: "/property-alerts" },
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    children: [
      { label: "Home Valuation", href: "/home-valuation" },
      { label: "Virtual Staging", href: "/virtual-staging" },
    ],
  },
  {
    label: "Communities",
    href: "/communities",
    children: [
      { label: "All Communities", href: "/communities" },
      { label: "Compare Neighborhoods", href: "/compare-neighborhoods" },
      { label: "School Search", href: "/school-search" },
      { label: "Local Landmarks", href: "/local-landmarks" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "All Tools", href: "/tools" },
      { label: "AI Home Search", href: "/ai-home-search" },
      { label: "AI Concierge", href: "/concierge" },
      { label: "House Direction Finder", href: "/house-direction-finder" },
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-serif text-xl leading-tight tracking-wide text-foreground sm:text-2xl">
              {SITE.agentName}
            </span>
            <span className="eyebrow mt-1 text-muted-foreground">
              {SITE.brokerage}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary",
                  location === item.href && "text-primary",
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full w-56 animate-fade-up border border-border bg-card p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Link
            href="/home-valuation"
            className="bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:opacity-95 active:scale-[0.97]"
          >
            Home Value
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/50 py-1">
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-muted-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <Link
                href="/home-valuation"
                className="bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Get My Home Value
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
