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

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={ASSETS.heroHome}
            alt="Charleston-inspired Triangle North Carolina home with classic architecture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/45 to-transparent" />
        </div>

        <div className="container flex min-h-[78vh] flex-col justify-center py-24">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow text-background/90">
              {SITE.brokerage} &middot; {SITE.region}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-background sm:text-5xl lg:text-6xl">
              {SITE.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/90">
              {SITE.subTagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/home-valuation"
                className="bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:opacity-95 active:scale-[0.97]"
              >
                What's My Home Worth?
              </Link>
              <Link
                href="/buy"
                className="border border-background/40 bg-background/10 px-7 py-3.5 text-sm font-medium tracking-wide text-background backdrop-blur transition-colors hover:bg-background/20"
              >
                Browse Homes
              </Link>
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
              <span className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                {vp.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ABOUT / CREDIBILITY PREVIEW with headshot */}
      <Section className="bg-secondary/50">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Meet Stacy"
              title="A trusted Triangle Realtor who puts your goals first"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {SITE.agentName} is a dedicated real estate professional with{" "}
                {SITE.brokerage}, serving buyers and sellers across Raleigh,
                Durham, Chapel Hill, Cary, and the surrounding Triangle
                communities.
              </p>
              <p>
                Her approach is simple: listen closely, communicate clearly, and
                advocate relentlessly. Whether you're buying your first home,
                selling a long-time residence, or relocating to the area, Stacy
                brings local insight and a steady hand to every step.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
              >
                More About Stacy
              </Link>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-sm lg:order-2">
            <Headshot withPanel />
          </div>
        </div>
      </Section>

      {/* FEATURED LISTINGS */}
      <FeaturedListings />

      {/* COMMUNITIES */}
      <Section className="bg-secondary/50">
        <SectionHeading
          align="center"
          eyebrow="Explore the Triangle"
          title="Communities Stacy serves"
          description="Get to know the distinct character of each Triangle market and find where you belong."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITIES.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={c.image}
                alt={`${c.name}, North Carolina real estate with Stacy Wilson Slone`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="flex items-center gap-1.5 text-xs text-background/80">
                  <MapPin className="h-3.5 w-3.5" /> Triangle, NC
                </p>
                <p className="mt-1 font-serif text-2xl text-background">
                  {c.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            View all communities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* AI TOOLS TEASER */}
      <Section className="bg-primary text-primary-foreground">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary-foreground/80">
              Smarter Real Estate
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Modern tools that make your move easier
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/85">
              Describe your ideal home in plain language with AI Home Search, ask
              the AI Concierge anything about buying or selling in the Triangle,
              or set up custom property alerts so you never miss a match.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ai-home-search"
                className="flex items-center gap-2 bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform active:scale-[0.97]"
              >
                <Sparkles className="h-4 w-4" /> AI Home Search
              </Link>
              <Link
                href="/concierge"
                className="flex items-center gap-2 border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <MessageCircle className="h-4 w-4" /> Ask the Concierge
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "AI Home Search", href: "/ai-home-search", icon: Sparkles },
              { label: "AI Concierge", href: "/concierge", icon: MessageCircle },
              { label: "Mortgage Calculator", href: "/mortgage-calculator", icon: TrendingUp },
              { label: "Property Alerts", href: "/property-alerts", icon: HomeIcon },
            ].map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="flex items-center gap-3 border border-primary-foreground/25 bg-primary-foreground/5 p-5 text-sm font-medium transition-colors hover:bg-primary-foreground/15"
              >
                <t.icon className="h-5 w-5" /> {t.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={ASSETS.ctaHome}
            alt="Elegant Triangle North Carolina home exterior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-background md:text-4xl">
            Ready to make your next move in the Triangle?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-background/85">
            Let's talk about your goals. Reach out today for a no-pressure
            conversation about buying, selling, or relocating.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
            >
              Get in Touch
            </Link>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 border border-background/40 bg-background/10 px-7 py-3.5 text-sm font-medium text-background backdrop-blur transition-colors hover:bg-background/20"
            >
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
