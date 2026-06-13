import { Link } from "wouter";
import {
  ArrowRight,
  Sparkles,
  Home as HomeIcon,
  TrendingUp,
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { FeaturedListings } from "@/components/ui-blocks/FeaturedListings";
import { SITE, ASSETS, COMMUNITIES } from "@/config/site";

const VALUE_PROPS = [
  {
    icon: HomeIcon,
    title: "For Buyers",
    body: "From first showing to closing day, get a guide who knows the Triangle's neighborhoods inside and out.",
    href: "/buy",
    cta: "Start your search",
  },
  {
    icon: TrendingUp,
    title: "For Sellers",
    body: "Strategic pricing, polished marketing, and skilled negotiation to position your home to sell.",
    href: "/sell",
    cta: "Get your home value",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    body: "Describe your dream home in plain language and explore the Triangle with smart, modern tools.",
    href: "/ai-home-search",
    cta: "Try AI Home Search",
  },
];

export default function Home() {
  return (
    <>
      <Seo />

      {/* HERO - Bold Two-Column Layout */}
      <section className="relative isolate">
        <div className="grid min-h-[90vh] grid-cols-1 lg:grid-cols-2">
          {/* Left: Text Content on Solid Charcoal */}
          <div className="flex flex-col justify-center bg-foreground px-8 py-20 sm:px-12 sm:py-24 lg:px-16">
            <div className="animate-fade-up space-y-8">
              <div>
                <p className="eyebrow text-background/70 tracking-widest">
                  {SITE.brokerage} · {SITE.region}
                </p>
                <h1 className="mt-6 font-serif text-5xl leading-[1.15] text-background sm:text-6xl lg:text-7xl">
                  {SITE.tagline}
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-background/80">
                {SITE.subTagline}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/home-valuation"
                  className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  What's My Home Worth?
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center gap-2 border-2 border-background/40 px-8 py-4 text-sm font-semibold tracking-wide text-background transition-all duration-200 hover:border-background/70 hover:bg-background/10"
                >
                  Browse Homes
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Stacy's Headshot */}
          <div className="relative hidden flex-col items-center justify-center bg-secondary p-8 lg:flex">
            <div className="w-full max-w-sm">
              <Headshot />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <Section className="bg-background">
        <div className="grid gap-8 md:grid-cols-3">
          {VALUE_PROPS.map((vp) => (
            <Link
              key={vp.title}
              href={vp.href}
              className="group flex flex-col border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <vp.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl text-foreground">
                {vp.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {vp.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                {vp.cta}
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED LISTINGS */}
      <Section className="bg-secondary/40">
        <div className="space-y-8">
          <div>
            <SectionHeading
              title="Featured Listings"
              description="Handpicked homes across the Triangle, curated for quality and opportunity."
            />
          </div>
          <FeaturedListings />
        </div>
      </Section>

      {/* COMMUNITIES PREVIEW */}
      <Section className="bg-background">
        <div className="space-y-8">
          <div>
            <SectionHeading
              title="Explore the Triangle"
              description="From established Raleigh neighborhoods to emerging markets in Cary and beyond."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMMUNITIES.slice(0, 4).map((community) => (
              <Link
                key={community.slug}
                href={`/communities/${community.slug}`}
                className="group flex flex-col border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                  {community.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{community.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <Link
              href="/communities"
              className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              View all communities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* AI TOOLS TEASER */}
      <Section className="bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Powered by AI"
              title="Smart Tools for the Modern Buyer"
            />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Describe your dream home in plain language. Our AI-powered tools help you explore the Triangle with precision, from neighborhood comparisons to school ratings and property insights.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ai-home-search"
                className="inline-flex items-center gap-2 bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg active:scale-95"
              >
                Try AI Home Search
                <Sparkles className="h-4 w-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 border border-primary/30 px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5"
              >
                All Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative hidden h-96 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 lg:block" />
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section className="bg-foreground text-background">
        <div className="max-w-2xl space-y-6">
          <div>
            <h2 className="font-serif text-4xl leading-tight text-background">
              Ready to make your move?
            </h2>
            <p className="mt-4 text-lg text-background/80">
              Whether you're buying, selling, or just exploring, Stacy is here to guide you through every step.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg active:scale-95"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 border border-background/30 px-8 py-4 text-sm font-semibold text-background transition-colors hover:bg-background/10"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
