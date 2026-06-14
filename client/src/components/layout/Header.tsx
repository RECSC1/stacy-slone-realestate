import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE } from "@/config/site";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV: NavItem[] = [
  { label: "About", href: "/about" },
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
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
      { label: "Property Alerts", href: "/property-alerts" },
      { label: "Neighborhood Comparison", href: "/compare-neighborhoods" },
      { label: "School Search", href: "/school-search" },
      { label: "Local Landmarks", href: "/local-landmarks" },
      { label: "Virtual Staging", href: "/virtual-staging" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary-dark text-[#fbf6ef] shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between lg:h-[84px]">
          {/* Logo */}
          <Link href="/">
            <span className="cursor-pointer font-serif text-lg font-semibold tracking-tight text-[#fbf6ef] sm:text-xl">
              {SITE.agentName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <div key={item.href} className="group relative">
                <Link href={item.href}>
                  <button
                    className={`flex items-center gap-1.5 py-1 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
                      isActive(item.href)
                        ? "text-[#fbf6ef]"
                        : "text-[#fbf6ef]/65 hover:text-[#fbf6ef]"
                    }`}
                  >
                    <span
                      className={
                        isActive(item.href)
                          ? "border-b-2 border-accent pb-1"
                          : "border-b-2 border-transparent pb-1"
                      }
                    >
                      {item.label}
                    </span>
                    {item.children && <ChevronDown className="h-3 w-3" />}
                  </button>
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-56 translate-y-1 border border-accent/25 bg-[#1e1a17] p-2 opacity-0 shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          className={`block w-full px-4 py-2.5 text-left text-[13px] tracking-wide transition-colors ${
                            isActive(child.href)
                              ? "bg-white/5 text-accent-light"
                              : "text-[#fbf6ef]/70 hover:bg-white/5 hover:text-[#fbf6ef]"
                          }`}
                        >
                          {child.label}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button (desktop) */}
          <Link href="/contact" className="hidden lg:block">
            <button className="bg-accent px-7 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary-dark transition-colors hover:bg-accent-light">
              Schedule
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#fbf6ef] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 pb-4 lg:hidden">
            {NAV.map((item) => (
              <div key={item.href} className="border-b border-white/5">
                <div className="flex items-center">
                  <Link href={item.href} className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <span
                      className={`block px-2 py-3.5 text-sm font-medium uppercase tracking-wider ${
                        isActive(item.href) ? "text-accent-light" : "text-[#fbf6ef]/80"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                  {item.children && (
                    <button
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.href ? null : item.href)
                      }
                      className="p-3 text-[#fbf6ef]/70"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.children && openDropdown === item.href && (
                  <div className="bg-white/[0.03] pb-2">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full px-6 py-2.5 text-left text-sm text-[#fbf6ef]/65 hover:text-[#fbf6ef]"
                        >
                          {child.label}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="mt-4 w-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary-dark">
                Schedule a Consultation
              </button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
