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
    <header style={{ backgroundColor: "white", borderBottom: "1px solid #d4c5b9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }} className="sticky top-0 z-50">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "88px" }}>
          {/* Logo */}
          <Link href="/">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontSize: "18px", fontWeight: "600", color: "#2d2d2d", fontFamily: "serif", letterSpacing: "-0.5px" }}>
                {SITE.agentName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {NAV.map((item) => (
              <div key={item.href} style={{ position: "relative" }} className="group">
                <Link href={item.href}>
                  <button
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: isActive(item.href) ? "#2d2d2d" : "#666",
                      padding: "4px 0",
                      borderBottom: isActive(item.href) ? "2px solid #b8956a" : "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      letterSpacing: "0.3px",
                    }}
                    onMouseEnter={(e) => {
                      if (item.children) {
                        e.currentTarget.style.color = "#2d2d2d";
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
                      backgroundColor: "#faf8f5",
                      border: "1px solid #d4c5b9",
                      borderRadius: "0",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                      opacity: 0,
                      visibility: "hidden",
                      transition: "all 0.3s ease",
                      padding: "12px 0",
                      marginTop: "8px",
                    }}
                    className="group-hover:opacity-100 group-hover:visible"
                  >
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <button
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 20px",
                            fontSize: "13px",
                            backgroundColor: isActive(child.href) ? "#f5f3f0" : "transparent",
                            color: isActive(child.href) ? "#2d2d2d" : "#666",
                            fontWeight: isActive(child.href) ? "500" : "400",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            letterSpacing: "0.3px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f5f3f0";
                            e.currentTarget.style.color = "#2d2d2d";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isActive(child.href) ? "#f5f3f0" : "transparent";
                            e.currentTarget.style.color = isActive(child.href) ? "#2d2d2d" : "#666";
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
                padding: "10px 28px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#f5f3f0",
                backgroundColor: "#2d2d2d",
                border: "1px solid #2d2d2d",
                borderRadius: "0",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2d2d2d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2d2d2d";
                e.currentTarget.style.color = "#f5f3f0";
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
