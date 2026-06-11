import { Link, useParams } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/ui-blocks/Section";
import { trpc } from "@/lib/trpc";
import NotFound from "./NotFound";

export default function ResourceDetail() {
  const params = useParams();
  const slug = params.slug ?? "";
  const { data: post, isLoading } = trpc.content.postBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!post || !post.published) return <NotFound />;

  return (
    <>
      <Seo title={post.title} description={post.excerpt ?? undefined} />
      <article>
        {post.coverImage && (
          <div className="aspect-[21/9] w-full overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <Section className="bg-background" containerClassName="max-w-3xl">
          <Link
            href="/resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All resources
          </Link>
          <h1 className="font-serif text-4xl leading-tight text-foreground">
            {post.title}
          </h1>
          {post.createdAt && (
            <p className="mt-3 text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <div className="prose prose-stone mt-8 max-w-none text-foreground">
            <Streamdown>{post.body ?? ""}</Streamdown>
          </div>
        </Section>
      </article>
    </>
  );
}
