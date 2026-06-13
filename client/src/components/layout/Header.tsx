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
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-xl font-serif font-bold text-gray-900">
                {SITE.agentName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <div key={item.href} className="relative group">
                <Link href={item.href}>
                  <button
                    className={`text-sm font-medium transition-colors py-2 ${
                      isActive(item.href)
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {item.label}
                      {item.children && (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            isActive(child.href)
                              ? "bg-gray-50 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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

          {/* CTA Button */}
          <Link href="/contact">
            <button className="hidden lg:block px-6 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              Schedule
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-900 p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            {NAV.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.href ? null : item.href
                    )
                  }
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive(item.href)
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.children && openDropdown === item.href && (
                  <div className="bg-gray-50">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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
        )}
      </div>
    </header>
  );
}
