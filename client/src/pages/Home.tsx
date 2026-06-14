import { ArrowRight, Sparkles, Home as HomeIcon, TrendingUp } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { SITE, COMMUNITIES } from "@/config/site";
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
      <Seo
        title="Real Estate Agent Raleigh, Durham, Chapel Hill"
        description="Trusted real estate agent serving Raleigh, Durham, Chapel Hill & Triangle NC. Expert buyer & seller guidance."
        keywords="real estate agent Raleigh, Durham real estate, Chapel Hill homes, Triangle NC realtor, Cary real estate"
      />
      {/* LUXURY HERO - Editorial, refined, Charleston-inspired */}
      <section className="relative overflow-hidden bg-background section-lg border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20 items-stretch">
            {/* Left: Text Content (2 columns) */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-12">
              <div className="space-y-8">
                <p className="section-eyebrow mb-3">
                  {SITE.serviceAreas.join(" · ")}
                </p>
                <h1 className="text-5xl lg:text-6xl font-serif text-primary-dark leading-tight tracking-tight">
                  Choosing The RIGHT Realtor
                  <span className="block text-accent font-light italic mt-4 text-5xl lg:text-6xl">
                    DOES Make A Difference.
                  </span>
                </h1>
                <div className="flex gap-4 items-center">
                  <div className="h-px bg-accent w-20"></div>
                  <div className="h-px bg-accent w-12"></div>
                </div>
                <p className="text-xl text-text-light leading-relaxed max-w-2xl font-light">
                  Trusted, people-first real estate guidance for {SITE.serviceAreas.slice(0, 2).join(" and ")} and the Triangle, rooted in local insight, calm confidence, and genuine care.
                </p>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-10 text-sm font-semibold text-text-light border-t border-accent pt-8 mt-4">
                <span className="uppercase tracking-widest text-xs">Realtor®</span>
                <span className="uppercase tracking-widest text-xs">KW Elite Realty</span>
                <span className="uppercase tracking-widest text-xs">28 Years of Experience</span>
                <span className="uppercase tracking-widest text-xs">673 Total Sales</span>
                <span className="uppercase tracking-widest text-xs">5.0 Rating</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-6 pt-8">
                <Link href="/buyer-inquiry">
                  <button className="btn-primary flex items-center gap-3 px-8 py-4 text-base">
                    Schedule a Consultation <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/ai-home-search">
                  <button className="btn-outline px-8 py-4 text-base">
                    Explore Buyer Tools
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Brand portrait - Anchored to the right edge with luxury framing */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <div className="relative w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0">
                {/* Layered taupe/sand offset panel behind the portrait */}
                <div
                  aria-hidden
                  className="absolute -bottom-6 -right-6 -top-6 left-8 -z-10 bg-secondary/70 border border-accent/30"
                ></div>

                <Headshot />

                {/* Thin accent baseline */}
                <div
                  aria-hidden
                  className="absolute -bottom-3 left-0 right-0 h-px bg-accent"
                ></div>
              </div>

              <p className="mt-10 text-center text-sm italic font-serif text-text-light">
                Serving the Triangle with calm, considered guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-lg bg-background border-t border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-6">About Stacy</p>
            <h2 className="text-primary-dark mb-10">
              Your trusted guide through every step of the Triangle real estate journey.
            </h2>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              With 28 years of experience, Stacy Wilson Slone is a consistent, award-winning Realtor® in the greater Durham area and across the Triangle. At KW Elite Realty, she specializes in helping buyers, sellers, and investors navigate the Raleigh, Durham, Chapel Hill, and Cary markets with confidence and clarity.
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
      <section className="section-lg section-dark">
        <div className="container">
          <div className="mb-16 pb-8 border-b border-accent/40">
            <p className="section-eyebrow mb-6">How Stacy Helps</p>
            <h2>Service tailored to your next chapter</h2>
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
