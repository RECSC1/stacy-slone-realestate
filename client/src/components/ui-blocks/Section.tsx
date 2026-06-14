import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-accent">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
