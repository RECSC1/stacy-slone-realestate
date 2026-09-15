import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export interface BlogPost {
  route: string;
  title: string;
  excerpt: string;
  category: string;
  publishedLabel: string;
  image: string;
  imageAlt: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden border border-border bg-card">
      <img src={post.image} alt={post.imageAlt} className="h-64 w-full object-cover" />
      <div className="p-7 md:p-9">
        <p className="eyebrow">{post.category}</p>
        <h2 className="mt-3 text-3xl text-foreground">{post.title}</h2>
        <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
        <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{post.publishedLabel}</p>
        <Link href={post.route} className="mt-6 inline-flex items-center gap-2 font-medium text-accent-dark">
          Read the guide <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
