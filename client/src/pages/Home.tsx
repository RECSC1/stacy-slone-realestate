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
      {/* LUXURY HERO - Editorial, refined, Charleston-inspired */}
      <section className="relative overflow-hidden bg-primary section-lg border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-6">
                <p className="section-eyebrow mb-2">
                  {SITE.serviceAreas.join(" · ")}
                </p>
                <h1 className="text-primary-dark leading-tight">
                  Choosing The RIGHT Realtor
                  <span className="block text-accent font-light italic mt-3">
                    DOES Make A Difference.
                  </span>
                </h1>
                <div className="h-px bg-accent w-16 my-4"></div>
                <p className="text-lg text-text-light leading-relaxed max-w-2xl font-light">
                  Trusted, people-first real estate guidance for {SITE.serviceAreas.slice(0, 2).join(" and ")} and the Triangle, rooted in local insight, calm confidence, and genuine care.
                </p>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-8 text-sm font-semibold text-text-light border-t border-accent pt-6 mt-6">
                <span className="uppercase tracking-widest">Realtor®</span>
                <span className="uppercase tracking-widest">KW Elite Realty</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-6">
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
              <div className="relative w-full max-w-sm">
                <Headshot />
                <div className="mt-8 text-center lg:text-right border-t border-accent pt-6">
                  <p className="text-sm font-semibold text-primary-dark">
                    {SITE.agentName}
                  </p>
                  <p className="text-xs text-accent uppercase tracking-widest font-semibold">
                    Realtor® · {SITE.brokerage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-lg bg-white border-t border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-6">About Stacy</p>
            <h2 className="text-primary-dark mb-10">
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
      <section className="section-lg bg-primary border-t border-border">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent">
            <p className="section-eyebrow mb-6">How Stacy Helps</p>
            <h2 className="text-primary-dark">Service tailored to your next chapter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="card group bg-white">
                  <Icon className="w-6 h-6 text-accent mb-6" />
                  <h3 className="text-primary-dark mb-4 font-semibold">{prop.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed mb-8 font-light">
                    {prop.body}
                  </p>
                  <Link href={prop.href}>
                    <button className="text-accent font-semibold text-sm hover:text-accent-light flex items-center gap-2 uppercase tracking-widest">
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
      <section className="section-lg bg-white border-t border-border">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent">
            <p className="section-eyebrow mb-6">Properties</p>
            <h2 className="text-primary-dark mb-6">Listing previews & client stories</h2>
            <p className="text-text-light max-w-2xl">
              The property cards below are placeholders only and do not represent live MLS or IDX data. Listings will be updated once approved property data is available.
            </p>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* Communities */}
      <section className="section-lg bg-primary border-t border-border">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent">
            <p className="section-eyebrow mb-6">Service Areas</p>
            <h2 className="text-primary-dark mb-6">Local expertise across the Triangle</h2>
            <p className="text-text-light max-w-2xl">
              From the historic streets of Chapel Hill to Cary's family neighborhoods, Stacy represents buyers and sellers across North Carolina's most loved communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMMUNITIES.map((community) => (
              <Link key={community.slug} href={`/communities/${community.slug}`}>
                <div className="card group cursor-pointer bg-white hover:border-accent">
                  <h3 className="text-primary-dark mb-3 group-hover:text-accent transition-colors font-semibold">
                    {community.name}
                  </h3>
                  <p className="text-sm text-text-light font-light">{community.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Teaser */}
      <section className="section-lg bg-white border-t border-border">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent">
            <p className="section-eyebrow mb-6">Exclusive Tools</p>
            <h2 className="text-primary-dark mb-6">Interactive buyer tools, designed for Triangle buyers</h2>
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
