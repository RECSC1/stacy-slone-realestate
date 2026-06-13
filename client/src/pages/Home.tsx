import { Link } from "wouter";
import {
  ArrowRight,
  Sparkles,
  Home as HomeIcon,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteLayout } from "@/components/layout/SiteLayout";
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
    <SiteLayout>
      <Seo />

      {/* LUXURY HERO - Deep Navy with Gold Accents */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="grid min-h-[100vh] grid-cols-1 lg:grid-cols-2">
          {/* Left: Premium Text Content */}
          <div className="flex flex-col justify-center px-8 py-20 sm:px-12 sm:py-24 lg:px-16">
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/90">
                  {SITE.brokerage} · {SITE.region}
                </p>
                <h1 className="mt-6 font-serif text-6xl leading-[1.1] text-white sm:text-7xl lg:text-8xl font-bold">
                  {SITE.tagline}
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-white/85 font-light">
                {SITE.subTagline}
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Link
                  href="/home-valuation"
                  className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  What's My Home Worth?
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center gap-2 border-2 border-accent/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent transition-all duration-300 hover:border-accent hover:bg-white/10"
                >
                  Browse Homes
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Luxury Headshot Panel */}
          <div className="relative hidden flex-col items-center justify-center bg-gradient-to-b from-primary/80 to-primary/60 p-8 lg:flex">
            <div className="w-full max-w-md">
              <Headshot />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS - Luxury Cards */}
      <Section className="bg-background py-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground">
            Trusted Guidance for Every Step
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {VALUE_PROPS.map((vp) => (
            <Link
              key={vp.title}
              href={vp.href}
              className="group card-luxury"
            >
              <vp.icon className="h-10 w-10 text-accent" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">
                {vp.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {vp.body}
              </p>
              <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent">
                {vp.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ABOUT PREVIEW - Luxury Two-Column */}
      <Section className="bg-secondary py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Meet Your Realtor
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Stacy Wilson Slone
            </h2>
            <p className="text-lg leading-relaxed text-foreground/80 mb-4">
              With deep roots in the Triangle and a passion for connecting people with their perfect homes, Stacy brings strategic expertise and genuine care to every transaction.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Whether you're buying, selling, or relocating, Stacy's market knowledge and personalized approach ensure you achieve your real estate goals with confidence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              Learn more about Stacy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Headshot />
          </div>
        </div>
      </Section>

      {/* FEATURED LISTINGS */}
      <Section className="bg-background py-24">
        <div className="mb-16">
          <h2 className="font-serif text-4xl font-bold text-foreground">
            Featured Listings
          </h2>
          <div className="mt-4 h-1 w-20 bg-accent" />
        </div>
        <FeaturedListings />
      </Section>

      {/* COMMUNITIES PREVIEW */}
      <Section className="bg-secondary py-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground">
            Explore Triangle Communities
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COMMUNITIES.slice(0, 4).map((community) => (
            <Link
              key={community.slug}
              href={`/communities/${community.slug}`}
              className="group card-luxury"
            >
              <MapPin className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                {community.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore this vibrant Triangle community
              </p>
              <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/communities"
            className="btn-luxury"
          >
            View All Communities
          </Link>
        </div>
      </Section>

      {/* AI TOOLS TEASER */}
      <Section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 text-white">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Powered by AI
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/85 mb-12">
            Describe your ideal home in plain language. Our AI-powered tools help you explore neighborhoods, compare schools, and discover properties that match your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai-home-search"
              className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary transition-all hover:shadow-2xl hover:scale-105"
            >
              Try AI Home Search
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 border-2 border-accent/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent transition-all hover:border-accent hover:bg-white/10"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-background py-24">
        <div className="rounded-lg bg-secondary p-12 text-center lg:p-16">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
            Whether you're buying, selling, or just exploring, Stacy is here to guide you through every step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-luxury"
            >
              Get in Touch
            </Link>
            <Link
              href="/home-valuation"
              className="btn-luxury-outline"
            >
              Get Home Value
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
