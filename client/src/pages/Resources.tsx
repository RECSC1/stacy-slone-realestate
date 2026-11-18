import { Link } from "wouter";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

const GUIDES = [
  { t: "First-Time Buyer's Guide", b: "What to expect from pre-approval to closing in the Triangle.", href: "/ai-home-search" },
  { t: "Seller's Prep Checklist", b: "Simple steps to help your Triangle home show its best.", href: "/home-valuation" },
  { t: "Relocation to the Triangle", b: "Getting to know Durham, NC, Hillsborough, Chapel Hill, Raleigh, and beyond.", href: "/communities" },
];

const DOWNLOADABLE_GUIDES = [
  {
    title: "Buyer's Guide",
    description: "Complete guide to buying your first home in the Triangle, from pre-approval to closing.",
    cta: "Get Buyer's Guide",
    href: "/buyer-inquiry",
  },
  {
    title: "Seller's Guide",
    description: "Strategic tips for pricing, marketing, and selling your Triangle home for top dollar.",
    cta: "Get Seller's Guide",
    href: "/seller-inquiry",
  },
  {
    title: "Relocation Guide",
    description: "Everything you need to know about relocating to Durham, NC, Chapel Hill, Raleigh, and beyond.",
    cta: "Get Relocation Guide",
    href: "/relocation-guide",
  },
  {
    title: "Investment Guide",
    description: "Strategic insights for building wealth through real estate investment in the Triangle.",
    cta: "Get Investment Guide",
    href: "/land-investment",
  },
];

export default function Resources() {
  const { data: posts, isLoading } = trpc.content.publishedPosts.useQuery();

  return (
    <>
      <Seo
        title="Triangle NC Real Estate Resources & Guides"
        description="Real estate guides, tips, and resources for buying and selling in the Triangle NC from Stacy Slone, REALTOR®, KW Elite Realty."
      />
      <PageHero
        eyebrow="Learn & Plan"
        title="Resources & guides"
        description="Helpful guidance for buying, selling, and relocating in the Triangle, plus articles from Stacy as they're published."
      />

      {/* Evergreen guide entry points */}
      <Section className="bg-background">
        <div className="grid gap-6 md:grid-cols-3">
          {GUIDES.map((g) => (
            <Link
              key={g.t}
              href={g.href}
              className="group flex flex-col border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <BookOpen className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-xl text-foreground">{g.t}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {g.b}
              </p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Downloadable Guides Section */}
      <Section className="bg-cream py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-charcoal mb-3">Downloadable Guides</h2>
            <p className="text-lg text-charcoal/70">Get expert guidance tailored to your real estate goals. Request your free guide today.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {DOWNLOADABLE_GUIDES.map((guide) => (
              <Card key={guide.title} className="p-6 border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Download className="h-6 w-6 text-sage" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-charcoal mb-2">{guide.title}</h3>
                    <p className="text-charcoal/70 text-sm mb-4">{guide.description}</p>
                    <Link href={guide.href}>
                      <Button variant="default" size="sm">
                        {guide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Blog posts */}
      <Section className="bg-secondary/50">
        <h2 className="font-serif text-3xl text-foreground">From the blog</h2>
        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-64 animate-pulse border border-border bg-background" />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/resources/${p.slug}`}
                  className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  {p.coverImage && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl text-foreground">{p.title}</h3>
                    {p.excerpt && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-background px-8 py-14 text-center">
              <p className="font-serif text-2xl text-foreground">
                Articles coming soon
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Stacy is preparing helpful articles on buying, selling, and
                Triangle living. Check back soon, or reach out with a question in
                the meantime.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Ask Stacy a Question
              </Link>
            </div>
          )}
        </div>
        </Section>
    </>
  );
}
