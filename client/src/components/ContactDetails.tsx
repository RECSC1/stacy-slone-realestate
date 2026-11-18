import { SITE } from "@/config/site";

export function ContactDetails({ className = "" }: { className?: string }) {
  return <address className={`not-italic space-y-2 ${className}`}>
    <p>{SITE.agentName}</p>
    <p>{SITE.brokerageLegalName}</p>
    <p>{SITE.officeAddress}</p>
    <p>{SITE.officeCity}</p>
    <p><a href={SITE.phoneHref}>{SITE.phone}</a></p>
    <p><a href={SITE.emailHref}>{SITE.email}</a></p>
    <p>NC License #{SITE.licenseNumber}</p>
  </address>;
}
