import { Seo } from "@/components/Seo";
import { BlogCard, type BlogPost } from "@/components/BlogCard";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";

export const DURHAM_POST: BlogPost = {
  route: "/blog/moving-to-durham-nc",
  title: "Moving to Durham, NC? How to Choose the Right Area for Your Lifestyle, Commute, and Budget",
  excerpt: "Compare Durham areas, housing styles, commute considerations, and property tradeoffs before building your relocation home search.",
  category: "Durham Relocation",
  publishedLabel: "September 14, 2026",
  image: "/images/downtown-durham-skyline-night.webp",
  imageAlt: "Downtown Durham skyline at night with illuminated buildings and waterfront reflections",
};

export default function Blog() {
  return <>
    <Seo title="Triangle NC Real Estate Blog" description="Practical Triangle North Carolina real estate guidance from Stacy Wilson Slone." />
    <PageHero eyebrow="Local guidance" title="Triangle real estate insights" description="Grounded guidance for buying, selling, and relocating across Durham and the greater Triangle." />
    <Section containerClassName="max-w-5xl"><BlogCard post={DURHAM_POST} /></Section>
  </>;
}
