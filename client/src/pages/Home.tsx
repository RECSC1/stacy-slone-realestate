import { ArrowRight, Sparkles, Home as HomeIcon, TrendingUp, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { FeaturedListings } from "@/components/ui-blocks/FeaturedListings";
import { SITE, ASSETS, COMMUNITIES } from "@/config/site";
import { Link } from "wouter";

const VALUE_PROPS = [
  {
    icon: HomeIcon,
    title: "For Buyers",
    body: "From first showing to closing day, get a guide who knows the Triangle's neighborhoods inside and out.",
    href: "/buyer-inquiry",
    cta: "Start your search",
  },
  {
    icon: TrendingUp,
    title: "For Sellers",
    body: "Strategic pricing, polished marketing, and skilled negotiation to position your home to sell.",
    href: "/seller-inquiry",
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
      {/* ELEGANT HERO - Cream background, clean layout, right headshot */}
      <section className="relative overflow-hidden bg-primary py-12 sm:py-20 lg:py-32">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="section-eyebrow mb-4">
                  {SITE.serviceAreas.join(" · ")}
                </p>
                <h1 className="text-primary-dark leading-tight mb-6">
                  Choosing The RIGHT Realtor
                  <span className="block text-accent font-light italic mt-2">
                    DOES Make A Difference.
                  </span>
                </h1>
                <p className="text-lg text-text-light leading-relaxed max-w-xl">
                  Trusted, people-first real estate guidance for {SITE.serviceAreas.slice(0, 2).join(" and ")} and the Triangle, rooted in local insight, calm confidence, and genuine care.
                </p>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-6 text-sm font-medium text-text-light">
                <span>Realtor®</span>
                <span>KW Elite Realty</span>
                <span>{SITE.serviceAreas[0]} & Triangle Real Estate</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/buyer-inquiry">
                  <button className="btn-primary flex items-center gap-2">
                    Schedule a Consultation <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/ai-home-search">
                  <button className="btn-outline">
                    Explore Buyer Tools
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Headshot */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs">
                <Headshot />
                <div className="mt-6 text-center lg:text-right">
                  <p className="text-sm font-semibold text-primary-dark">
                    {SITE.agentName}
                  </p>
                  <p className="text-xs text-accent uppercase tracking-widest">
                    Realtor® · {SITE.brokerage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white border-t border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-4">About Stacy</p>
            <h2 className="text-primary-dark mb-8">
              From social work to real estate — the same heart, a new chapter.
            </h2>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              Before real estate, Stacy spent many years in community service — listening carefully, advocating fiercely, and helping families navigate the most important moments of their lives. That training never left her.
            </p>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              For years now, she has brought the same emotional intelligence and service-driven mindset to real estate, guiding clients through the Triangle with calm strategy and genuine warmth.
            </p>
            <p className="text-lg text-text-light leading-relaxed">
              The result is a quietly elevated experience — luxury-level marketing, polished representation, and a deeply human touch.
            </p>
            <Link href="/about">
              <button className="btn-outline mt-8">
                Read Stacy's full story
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">How Stacy Helps</p>
            <h2 className="text-primary-dark">Service tailored to your next chapter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="card group">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-primary-dark mb-3">{prop.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed mb-6">
                    {prop.body}
                  </p>
                  <Link href={prop.href}>
                    <button className="text-accent font-medium text-sm hover:text-accent-light flex items-center gap-2">
                      {prop.cta} <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white border-t border-border">
        <div className="container">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Properties</p>
            <h2 className="text-primary-dark mb-4">Listing previews & client stories</h2>
            <p className="text-text-light max-w-2xl">
              The property cards below are placeholders only and do not represent live MLS or IDX data. Listings will be updated once approved property data is available.
            </p>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* Communities */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Service Areas</p>
            <h2 className="text-primary-dark mb-4">Local expertise across the Triangle</h2>
            <p className="text-text-light max-w-2xl">
              From the historic streets of Chapel Hill to Cary's family neighborhoods, Stacy represents buyers and sellers across North Carolina's most loved communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNITIES.map((community) => (
              <Link key={community.slug} href={`/communities/${community.slug}`}>
                <div className="card group cursor-pointer">
                  <h3 className="text-primary-dark mb-2 group-hover:text-accent transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-text-light">{community.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Teaser */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white border-t border-border">
        <div className="container">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Exclusive Tools</p>
            <h2 className="text-primary-dark mb-4">Interactive buyer tools, designed for Triangle buyers</h2>
            <p className="text-text-light max-w-2xl">
              Search schools, study commutes, compare neighborhoods, and run financial scenarios — all in one calm, polished workspace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/ai-home-search">
              <div className="card group cursor-pointer">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">AI Tool</p>
                <h3 className="text-primary-dark mb-3 group-hover:text-accent transition-colors">
                  AI Home Search
                </h3>
                <p className="text-sm text-text-light">Describe your dream home and explore Triangle properties with AI guidance.</p>
              </div>
            </Link>
            <Link href="/school-search">
              <div className="card group cursor-pointer">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Tool</p>
                <h3 className="text-primary-dark mb-3 group-hover:text-accent transition-colors">
                  School Rating Search
                </h3>
                <p className="text-sm text-text-light">Explore schools across the Triangle with ratings and neighborhood data.</p>
              </div>
            </Link>
            <Link href="/mortgage-calculator">
              <div className="card group cursor-pointer">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Tool</p>
                <h3 className="text-primary-dark mb-3 group-hover:text-accent transition-colors">
                  Mortgage Calculator
                </h3>
                <p className="text-sm text-text-light">Run financial scenarios and understand your buying power.</p>
              </div>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/tools">
              <button className="btn-outline">
                Explore all tools
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 lg:py-32 bg-primary-dark text-white">
        <div className="container text-center">
          <h2 className="text-white mb-4">Your next chapter deserves thoughtful guidance.</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Whether you're considering a move, beginning a search, or simply gathering information, Stacy is here to listen and offer thoughtful, no-pressure guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="px-6 py-3 rounded-lg bg-accent text-primary-dark font-medium hover:bg-accent-light transition-all">
                Schedule a Consultation
              </button>
            </Link>
            <Link href="/resources">
              <button className="px-6 py-3 rounded-lg border-2 border-accent text-accent font-medium hover:bg-accent/10 transition-all">
                Explore Resources
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
