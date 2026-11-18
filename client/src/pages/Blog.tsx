import { Seo } from "@/components/Seo";
import { BlogCard, type BlogPost } from "@/components/BlogCard";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";

import { BLOG_POSTS } from "@/config/posts";
export { DURHAM_POST } from "@/config/posts";

export default function Blog() {
  return <>
    <Seo title="Triangle NC Real Estate Blog" description="Practical Triangle North Carolina real estate guidance from Stacy Slone, REALTOR®." />
    <PageHero eyebrow="Local guidance" title="Triangle real estate insights" description="Grounded guidance for buying, selling, and relocating across Durham and the greater Triangle." />
    <Section containerClassName="max-w-5xl">{BLOG_POSTS.map(post => <BlogCard key={post.route} post={post} />)}</Section>
  </>;
}
