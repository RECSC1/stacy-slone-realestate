import { Fragment, type ReactNode } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/ui-blocks/Section";

type Post = { title: string; category: string; image: string; imageAlt: string; publishedLabel: string; datePublished: string };

export function BlogArticle({ post, children }: { post: Post; children: ReactNode }) {
  return <>
    <Seo />
    <article className="bg-background">
      <header className="relative isolate overflow-hidden bg-primary-dark text-[#fbf6ef]">
        <img src={post.image} alt={post.imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#151310]/80" />
        <div className="container py-14 md:py-20 lg:py-24">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-accent-light hover:text-[#fbf6ef]"><ArrowLeft className="h-4 w-4" /> All blog posts</Link>
          <p className="eyebrow mt-9 text-accent-light">{post.category}</p><h1 className="mt-4 max-w-5xl text-[#fbf6ef]">{post.title}</h1>
          <p className="mt-6 text-sm text-[#fbf6ef]/75">By Stacy Slone, REALTOR® · Published <time dateTime={post.datePublished}>{post.publishedLabel}</time></p>
        </div>
      </header>
      <Section containerClassName="max-w-4xl"><div className="space-y-6 text-foreground [&_a]:font-medium [&_a]:underline [&_a]:decoration-accent/60 [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:text-3xl [&_h3]:mt-9 [&_li]:leading-relaxed [&_p]:text-[1.05rem] [&_p]:leading-8">
        {children}
      </div></Section>
    </article>
  </>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return <ul className="list-disc space-y-4 pl-6">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
}

export function Checklist({ items }: { items: string[] }) {
  return <ul className="grid gap-3 border border-border bg-card p-6 sm:grid-cols-2">{items.map(item => <li className="flex gap-3" key={item}><Check className="mt-1 h-4 w-4 shrink-0 text-accent-dark" /><span>{item}</span></li>)}</ul>;
}

export function CompareTable({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto border border-border" tabIndex={0} aria-label={label}><table className="min-w-[640px] w-full border-collapse text-left text-sm"><caption className="sr-only">{label}</caption><thead className="bg-primary-dark text-primary-foreground"><tr>{headers.map(h => <th scope="col" className="p-4 align-top font-semibold" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr className={i % 2 ? "bg-secondary/30" : "bg-card"} key={row[0]}>{row.map((cell, j) => j === 0 ? <th scope="row" className="w-44 border-t border-border p-4 font-semibold text-foreground" key={j}>{cell}</th> : <td className="border-t border-border p-4 align-top text-muted-foreground" key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <>{faqs.map(f => <Fragment key={f.q}><h3>{f.q}</h3><p>{f.a}</p></Fragment>)}</>;
}

export function Ctas() {
  return <>
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link href="/contact" className="btn-primary inline-flex w-full items-center justify-center gap-2 !no-underline sm:w-auto">Talk it through with Stacy</Link>
      <Link href="/home-valuation" className="btn-outline inline-flex w-full items-center justify-center !no-underline sm:w-auto">Get a home value</Link>
    </div>
    <p><a href="tel:+19199721180">Or call (919) 972-1180</a></p>
  </>;
}

export function Sources({ reviewed, links }: { reviewed: string; links: [string, string][] }) {
  return <aside className="mt-14 border-t border-border pt-8" aria-labelledby="sources-heading"><h2 id="sources-heading" className="!mt-0 !text-2xl">Research sources</h2><p className="text-sm text-muted-foreground">Reviewed {reviewed}:</p><ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">{links.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener">{label}</a></li>)}</ul></aside>;
}

export const Ext = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noopener">{children}</a>;
