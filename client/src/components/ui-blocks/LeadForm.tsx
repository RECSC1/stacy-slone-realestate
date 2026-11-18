import { useState, useRef, ReactNode } from "react";
import { submitInquiry } from "@/lib/netlify-forms";
import { FORM_ENDPOINT, type FormName } from "@/config/forms";
import { NetlifyFields } from "@/components/NetlifyFields";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SITE } from "@/config/site";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  colSpan?: 1 | 2;
}

interface LeadFormProps {
  fields: FieldDef[];
  submitLabel: string;
  formName: FormName;
  errorMessage?: string;
  successTitle?: string;
  successMessage?: string;
  disclaimer?: ReactNode;
}

export function LeadForm({
  fields,
  submitLabel,
  formName,
  errorMessage = `Something went wrong sending your request. Please try again, or call Stacy directly at ${SITE.phone}.`,
  successTitle = "Thank you!",
  successMessage = "Your message has been received. Stacy will be in touch shortly.",
  disclaimer,
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const inFlight = useRef(false);

  const setField = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    setIsError(false);
    const nextErrors: Record<string, string> = {};
    for (const f of fields) {
      if (f.required && !values[f.name]?.trim()) {
        nextErrors[f.name] = `${f.label} is required`;
      }
      if (
        f.type === "email" &&
        values[f.name] &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[f.name])
      ) {
        nextErrors[f.name] = "Please enter a valid email";
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    try {
      inFlight.current = true;
      setIsSubmitting(true);
      const botField = new FormData(e.currentTarget).get('bot-field');
      await submitInquiry(formName, {...values, 'bot-field': String(botField ?? '')});
      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center border border-border bg-card px-8 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={1.5} />
        <p className="mt-4 font-serif text-2xl text-foreground">
          {successTitle}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      <NetlifyFields name={formName} />
      {fields.map((f) => (
        <div
          key={f.name}
          className={f.colSpan === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}
        >
          <label htmlFor={`${formName}-${f.name}`} className="mb-1.5 block text-sm font-medium text-foreground">
            {f.label}
            {f.required && <span className="text-primary"> *</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              id={`${formName}-${f.name}`} name={f.name} required={f.required}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder}
              rows={4}
              className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          ) : f.type === "select" ? (
            <select
              id={`${formName}-${f.name}`} name={f.name} required={f.required}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            >
              <option value="">Select...</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`${formName}-${f.name}`} name={f.name} required={f.required}
              type={f.type ?? "text"}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              placeholder={f.placeholder}
              className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          )}
          {errors[f.name] && (
            <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
          )}
        </div>
      ))}

      {disclaimer && (
        <div className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">
          {disclaimer}
        </div>
      )}

      {isError && (
        <div
          role="alert"
          className="border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive sm:col-span-2"
        >
          {errorMessage}
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.99] disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
