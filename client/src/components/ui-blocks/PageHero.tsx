import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: PageHeroProps) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="container py-20 md:py-28">
          {eyebrow && <p className="eyebrow text-background/85">{eyebrow}</p>}
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-background md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/90">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="container py-16 md:py-20">
        {eyebrow && <p className="eyebrow text-primary">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
