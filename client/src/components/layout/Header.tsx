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
    <header style={{ backgroundColor: "white", borderBottom: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }} className="sticky top-0 z-50">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          {/* Logo */}
          <Link href="/">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1a1a1a", fontFamily: "serif" }}>
                {SITE.agentName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {NAV.map((item) => (
              <div key={item.href} style={{ position: "relative" }} className="group">
                <Link href={item.href}>
                  <button
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: isActive(item.href) ? "#1a1a1a" : "#666",
                      padding: "8px 0",
                      borderBottom: isActive(item.href) ? "2px solid #1a1a1a" : "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onMouseEnter={(e) => {
                      if (item.children) {
                        e.currentTarget.style.color = "#1a1a1a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (item.children && !isActive(item.href)) {
                        e.currentTarget.style.color = "#666";
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown style={{ width: "12px", height: "12px" }} />
                    )}
                  </button>
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "100%",
                      width: "224px",
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      opacity: 0,
                      visibility: "hidden",
                      transition: "all 0.2s",
                      padding: "8px 0",
                    }}
                    className="group-hover:opacity-100 group-hover:visible"
                  >
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 16px",
                            fontSize: "14px",
                            backgroundColor: isActive(child.href) ? "#f5f5f5" : "transparent",
                            color: isActive(child.href) ? "#1a1a1a" : "#666",
                            fontWeight: isActive(child.href) ? "500" : "400",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f5f5f5";
                            e.currentTarget.style.color = "#1a1a1a";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isActive(child.href) ? "#f5f5f5" : "transparent";
                            e.currentTarget.style.color = isActive(child.href) ? "#1a1a1a" : "#666";
                          }}
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
            <button
              style={{
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#1a1a1a",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#333";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1a1a";
              }}
            >
              Schedule
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#1a1a1a",
            }}
          >
            {mobileMenuOpen ? (
              <X style={{ width: "24px", height: "24px" }} />
            ) : (
              <Menu style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav style={{ borderTop: "1px solid #f0f0f0", paddingBottom: "16px" }}>
            {NAV.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.href ? null : item.href
                    )
                  }
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    backgroundColor: isActive(item.href) ? "#f5f5f5" : "transparent",
                    color: isActive(item.href) ? "#1a1a1a" : "#666",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      style={{
                        width: "16px",
                        height: "16px",
                        transform: openDropdown === item.href ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.children && openDropdown === item.href && (
                  <div style={{ backgroundColor: "#f5f5f5" }}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 32px",
                            fontSize: "14px",
                            color: "#666",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#1a1a1a";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#666";
                          }}
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
