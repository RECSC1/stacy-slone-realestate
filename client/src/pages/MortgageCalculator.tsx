import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxPct, setTaxPct] = useState(0.85);
  const [insurance, setInsurance] = useState(1400);

  const result = useMemo(() => {
    const down = (price * downPct) / 100;
    const principal = Math.max(price - down, 0);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const pi =
      monthlyRate === 0
        ? principal / n
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const monthlyTax = (price * (taxPct / 100)) / 12;
    const monthlyIns = insurance / 12;
    const total = pi + monthlyTax + monthlyIns;
    return { down, principal, pi, monthlyTax, monthlyIns, total };
  }, [price, downPct, rate, term, taxPct, insurance]);

  const field = (
    label: string,
    value: number,
    setter: (n: number) => void,
    opts?: { step?: number; min?: number; max?: number; suffix?: string },
  ) => (
    <div>
      <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground">
        <span>{label}</span>
        <span className="text-muted-foreground">{opts?.suffix}</span>
      </label>
      <input
        type="number"
        value={value}
        step={opts?.step}
        min={opts?.min}
        max={opts?.max}
        onChange={(e) => setter(parseFloat(e.target.value) || 0)}
        className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );

  return (
    <>
      <Seo
        title="Triangle NC Mortgage Calculator"
        description="Estimate your monthly mortgage payment for a Triangle North Carolina home with this simple calculator from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="Plan Your Purchase"
        title="Mortgage calculator"
        description="Estimate a monthly payment to help plan your Triangle home search. For exact figures, connect with a trusted local lender."
      />

      <Section className="bg-background">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-primary" />
              <h2 className="font-serif text-2xl text-foreground">Details</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("Home Price", price, setPrice, { step: 5000, suffix: "$" })}
              {field("Down Payment", downPct, setDownPct, { step: 1, min: 0, max: 100, suffix: "%" })}
              {field("Interest Rate", rate, setRate, { step: 0.1, suffix: "%" })}
              {field("Loan Term", term, setTerm, { step: 5, suffix: "yrs" })}
              {field("Property Tax", taxPct, setTaxPct, { step: 0.05, suffix: "%/yr" })}
              {field("Home Insurance", insurance, setInsurance, { step: 100, suffix: "$/yr" })}
            </div>
          </div>

          <div className="flex flex-col border border-border bg-primary p-8 text-primary-foreground">
            <p className="eyebrow text-primary-foreground/80">
              Estimated Monthly Payment
            </p>
            <p className="mt-3 font-serif text-5xl">{currency(result.total)}</p>
            <div className="mt-8 space-y-3 border-t border-primary-foreground/20 pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Principal &amp; Interest</span>
                <span>{currency(result.pi)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Property Tax</span>
                <span>{currency(result.monthlyTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Insurance</span>
                <span>{currency(result.monthlyIns)}</span>
              </div>
              <div className="flex justify-between border-t border-primary-foreground/20 pt-3">
                <span className="text-primary-foreground/80">Down Payment</span>
                <span>{currency(result.down)}</span>
              </div>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-primary-foreground/70">
              Estimates only and not a loan offer. Actual rates, taxes, insurance,
              HOA dues, and PMI vary. Consult a licensed lender for details.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
