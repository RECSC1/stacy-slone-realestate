import { MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { HERO_IMAGES } from "@/config/images";

const LANDMARKS = [
  { t: "Research Triangle Park", b: "One of the largest research parks in the country and a major regional employment hub anchoring the Triangle economy." },
  { t: "NC State, Duke & UNC", b: "Three major universities give the region its energy, culture, healthcare, and sports — a defining feature of Triangle life." },
  { t: "William B. Umstead State Park", b: "Thousands of acres of forest, trails, and lakes between Raleigh, Cary, and Durham for hiking and the outdoors." },
  { t: "Downtown Cary Park", b: "A signature new public park that has become a centerpiece of life in Cary." },
  { t: "American Tobacco District", b: "Durham's celebrated adaptive-reuse district blending history, dining, and the Durham Performing Arts Center." },
  { t: "Franklin Street, Chapel Hill", b: "The lively heart of this classic college town, lined with shops, restaurants, and UNC tradition." },
  { t: "RDU International Airport", b: "Centrally located and well-connected, making travel easy from anywhere in the Triangle." },
  { t: "Eno River & Greenways", b: "An extensive network of rivers, greenways, and trails threads through the region's communities." },
];

export default function LocalLandmarks() {
  return (
    <>
      <Seo
        title="Triangle NC Local Landmarks & Highlights"
        description="Get to know the Triangle North Carolina — landmarks, parks, universities, and culture — with Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        image={HERO_IMAGES.localLandmarks}
        imageAlt="Triangle North Carolina landscape"
        eyebrow="Get to Know the Area"
        title="Triangle landmarks & highlights"
        description="From research and universities to parks and culture, here's what makes the Triangle a special place to call home."
      />

      <Section className="bg-background">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LANDMARKS.map((l) => (
            <div key={l.t} className="border border-border bg-card p-7">
              <MapPin className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-xl text-foreground">{l.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {l.b}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
