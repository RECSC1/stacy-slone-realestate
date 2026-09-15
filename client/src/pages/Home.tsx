import { ArrowRight, Sparkles, Home as HomeIcon, TrendingUp } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { SITE, COMMUNITIES } from "@/config/site";
import { HERO_IMAGES } from "@/config/images";
import { Link } from "wouter";

const VALUE_PROPS = [
  {
    number: "01",
    icon: HomeIcon,
    title: "For Buyers",
    body: "From first showing to closing day, get a guide who knows the Triangle's neighborhoods inside and out.",
    href: "/buyer-inquiry",
    cta: "Start your search",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "For Sellers",
    body: "Strategic pricing, polished marketing, and skilled negotiation to position your home to sell.",
    href: "/seller-inquiry",
    cta: "Get your home value",
  },
  {
    number: "03",
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
      <Seo
        title="Real Estate Agent Raleigh, Durham, Chapel Hill"
        description="Trusted real estate agent serving Raleigh, Durham, Chapel Hill & Triangle NC. Expert buyer & seller guidance."
        keywords="real estate agent Raleigh, Durham real estate, Chapel Hill homes, Triangle NC realtor, Cary real estate"
      />
      <section className="hero-skyline relative overflow-hidden">
        <img src={HERO_IMAGES.home!} alt="Downtown Durham skyline at night with illuminated buildings and waterfront reflections" width="1280" height="720" fetchPriority="high" className="hero-skyline__image" />
        <div className="container hero-skyline__content text-background">
          <p className="section-eyebrow text-accent-light">{SITE.serviceAreas.join(" · ")}</p>
          <h1 className="hero-title mt-3">Choosing The RIGHT Realtor<em>DOES Make A Difference.</em></h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/85 sm:text-base">Trusted, people-first real estate guidance for Durham, Hillsborough, and the greater Triangle, rooted in local insight, calm confidence, and genuine care.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/buyer-inquiry"><button className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto">Schedule a Consultation <ArrowRight className="h-4 w-4" /></button></Link>
            <Link href="/ai-home-search"><button className="btn-outline w-full sm:w-auto">Explore Buyer Tools</button></Link>
          </div>
          <div className="hero-credentials mt-5 flex flex-wrap gap-x-7 gap-y-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/80 sm:text-[11px]">
            <span>Realtor®</span><span>KW Elite Realty</span><span>28 Years of Experience</span><span>Award-Winning</span>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-secondary py-12 border-t border-border md:py-14 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-6">About Stacy</p>
            <h2 className="signature-statement text-primary-dark mb-10">
              Your trusted guide through every step of the Triangle real estate journey.
            </h2>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              With 28 years of experience, Stacy Wilson Slone is a consistent, award-winning Realtor® in the greater Durham area and across the Triangle. At KW Elite Realty, she specializes in helping buyers, sellers, and investors navigate Durham, Hillsborough, Mebane, Burlington, Oxford, and surrounding markets with confidence and clarity.
            </p>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              With a people-first approach and deep local knowledge, she combines strategic market expertise with genuine care for her clients' goals — whether you're buying your first home, selling a property, or building wealth through real estate investment.
            </p>
            <p className="text-lg text-text-light leading-relaxed">
              The result is a trusted partnership rooted in transparency, local insight, and a commitment to getting you the best outcome.
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
      <section className="section-lg bg-secondary">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent/40">
            <p className="section-eyebrow mb-6">How Stacy Helps</p>
            <h2 className="signature-statement text-primary-dark">Service tailored to your next chapter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon;
              return (
                <article key={prop.title} className="service-card group">
                  <span className="service-card__number" aria-hidden="true">{prop.number}</span>
                  <Icon className="service-card__icon" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="service-card__title">{prop.title}</h3>
                  <p className="service-card__copy">
                    {prop.body}
                  </p>
                  <Link href={prop.href} className="service-card__link">
                      {prop.cta} <ArrowRight className="service-card__arrow h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Right Realtor Changes The Whole Experience */}
      <section className="section-lg bg-background border-t border-border">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent max-w-3xl">
            <p className="section-eyebrow mb-6">Strategy Before The Search</p>
            <h2 className="text-primary-dark mb-6">
              The right realtor changes the whole experience
            </h2>
            <p className="text-lg text-text-light leading-relaxed font-light">
              Before the search, the showing, the pricing conversation, or the offer,
              there is a better first step: getting clear on what actually matters.
              Stacy helps clients slow down the noise, understand the market, and make
              decisions with more confidence from the beginning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-accent/30 border border-accent/30">
            {[
              {
                title: "For Buyers",
                body: "Get clear on area fit, timing, search strategy, and what to watch before you start chasing listings.",
                href: "/buyer-inquiry",
                cta: "Start A Buyer Conversation",
              },
              {
                title: "For Sellers",
                body: "Talk through pricing, prep, positioning, and the smartest way to bring your home to market.",
                href: "/seller-inquiry",
                cta: "Talk About Selling",
              },
              {
                title: "For Relocation, Land & Investment",
                body: "Explore the more complex moves with better questions, better context, and a steadier plan.",
                href: "/relocation-guide",
                cta: "Explore Specialty Guidance",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col bg-[#faf8f5] p-10"
              >
                <h3 className="font-serif text-2xl text-primary-dark mb-5 leading-snug">
                  {card.title}
                </h3>
                <p className="text-text-light text-sm leading-relaxed font-light mb-8 flex-1">
                  {card.body}
                </p>
                <Link href={card.href}>
                  <button className="text-accent font-semibold text-xs uppercase tracking-widest hover:text-accent-light flex items-center gap-2">
                    {card.cta} <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="section-lg section-dark">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent/40">
            <p className="section-eyebrow mb-6">Service Areas</p>
            <h2 className="mb-6">Local expertise across the Triangle</h2>
            <p className="text-background/70 max-w-2xl">
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
      <section className="section-lg bg-secondary/40 border-t border-border">
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
