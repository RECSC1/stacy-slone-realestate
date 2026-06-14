import { Link } from "wouter";
import {
  Sparkles,
  MessageCircle,
  Calculator,
  Bell,
  Scale,
  Compass,
  GraduationCap,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";

const TOOLS = [
  { icon: Sparkles, t: "AI Home Search", b: "Describe your dream home in plain language and get guidance for any North Carolina area.", href: "/ai-home-search" },
  { icon: MessageCircle, t: "AI Concierge", b: "Ask any buyer or seller question about North Carolina real estate, anytime.", href: "/concierge" },
  { icon: Calculator, t: "Mortgage Calculator", b: "Estimate your monthly payment to plan your home search.", href: "/mortgage-calculator" },
  { icon: Bell, t: "Property Alerts", b: "Be first to know when matching homes hit the market.", href: "/property-alerts" },
  { icon: Scale, t: "Compare Neighborhoods", b: "Weigh two North Carolina areas side by side on what matters to you.", href: "/compare-neighborhoods" },
  { icon: GraduationCap, t: "School Search", b: "Research schools and districts across North Carolina.", href: "/school-search" },
  { icon: Compass, t: "House Direction Finder", b: "See how a home's orientation shapes its natural light.", href: "/house-direction-finder" },
  { icon: Wand2, t: "Virtual Staging", b: "See how presentation helps buyers connect with a home.", href: "/virtual-staging" },
];

export default function Tools() {
  return (
    <>
      <Seo
        title="Triangle NC Real Estate Tools"
        description="Smart real estate tools for the Triangle NC from Stacy Wilson Slone, KW Elite Realty — AI Home Search, AI Concierge, mortgage calculator, property alerts, and more."
      />
      <PageHero
        eyebrow="Smarter Real Estate"
        title="Tools to make your move easier"
        description="A suite of modern, AI-powered tools to help you research, plan, and decide with confidence."
      />

      <Section className="section-lg section-dark">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.t}
              href={t.href}
              className="group flex flex-col card bg-white hover:border-accent transition-all"
            >
              <t.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h2 className="mt-6 font-serif text-xl text-primary-dark font-semibold">{t.t}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-light font-light">
                {t.b}
              </p>
              <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-widest">
                Open tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
