import { Link } from "wouter";
import { ASSISTED_LIVING_POST as POST } from "@/config/posts";
import { BlogArticle, Bullets, Checklist, CompareTable, Ctas, Faqs, Sources } from "@/components/BlogArticle";

const CHECKLIST = [
  "Confirm who can legally sign, and get the documents to the closing attorney.",
  "If using a power of attorney, confirm it covers real estate and is recorded with the register of deeds.",
  "Talk to an elder law attorney if Medicaid is or might be involved.",
  "Ask a CPA about capital gains and the care facility rule.",
  "Decide the order: move first, sell first, or hold.",
  "Call the insurance agent about vacancy coverage.",
  "Budget for a few months of carrying costs.",
  "Save the deed, tax bill, survey, warranties, HOA documents, and repair records.",
  "Set a cleanout deadline and line up estate sale or move help.",
  "Get a real opinion of value before deciding on repairs or offers.",
];

export default function AssistedLivingHouseDurham() {
  return <BlogArticle post={POST}>
    <p className="text-xl font-medium leading-9">Start with who can legally sign. If your parent can still make their own decisions, they sign. If not, you'll usually need a durable power of attorney that covers real estate, and in North Carolina it has to be recorded with the register of deeds before anyone uses it to sell the house. Then decide the order: many families move Mom or Dad first and sell the house empty, which makes prep and showings easier but means a few months of carrying costs. If Medicaid is part of the plan, talk to an elder law attorney before you list.</p>
    <p>I get this call a lot. It's usually a son or daughter, sometimes living three states away, with a full-time job, a parent who just moved into assisted living, and a house in Durham, North Carolina that suddenly needs a plan. Nobody warns you how many decisions show up at once. This guide walks through them in the order they actually need to happen.</p>
    <p className="text-sm text-muted-foreground">I'm a REALTOR®, not an attorney or a tax advisor. This is general information to help you ask the right questions. For anything legal or tax-related, loop in the right professional before you sign.</p>

    <h2>Step 1: Figure out who can legally sign</h2>
    <p>Before price, before repairs, before anyone calls a moving company, answer one question: who has the legal authority to sell this house? Title companies and closing attorneys won't close without a clear answer, and sorting it out late is the most common reason these sales stall.</p>
    <Bullets items={[
      <><strong>Your parent can still sign.</strong> If Mom or Dad owns the home and can understand and make their own decisions, they sign the listing agreement and the closing documents. Everyone else helps, but the owner decides.</>,
      <><strong>There's a durable power of attorney.</strong> A financial power of attorney that covers real estate lets the agent named in it sign for your parent. In North Carolina, the power of attorney, or a certified copy, has to be registered with the register of deeds before a deed signed under it can be recorded. Get a copy to the closing attorney early so there are no surprises at the closing table.</>,
      <><strong>A health care power of attorney isn't enough.</strong> It covers medical decisions, not selling property. You need the financial one.</>,
      <><strong>There's no power of attorney, and your parent can't sign.</strong> This usually means a guardianship proceeding through the Clerk of Superior Court, and the court generally has to approve selling the home. It takes time, so start the conversation with an attorney as soon as you see it coming.</>,
      <><strong>A spouse still lives in the home or co-owns it.</strong> Everyone on the deed signs. Talk through the plan with the spouse first, because it's their home too.</>,
    ]} />

    <h2>Step 2: Decide the order: move first, or sell first</h2>
    <p>There's no universally right answer here. It depends on your parent's health, the move-in date at the community, your family's finances, and how much the house needs. Here's how I explain the tradeoffs.</p>
    <CompareTable label="Scrollable comparison of move first, sell first, or keep the house" headers={["Option", "Why families choose it", "What to watch"]} rows={[
      ["Move first, then sell the house empty", "Easier to clear out, repair, clean, and show. No one has to leave for every showing.", "Taxes, insurance, utilities, and upkeep keep running while it's vacant. Check your insurance policy on vacancy."],
      ["Sell while your parent still lives there", "Proceeds can be ready closer to move-in. One move instead of a limbo period.", "Showings can be stressful for an older owner. Timing the closing and the move takes coordination."],
      ["Keep it for now, or rent it", "Buys time for a family decision, or keeps the house in the family.", "Someone has to manage it. Talk to a CPA before renting, since it can change the tax picture on a later sale."],
    ]} />
    <p>If you're not sure yet, get a real opinion of value first. It's much easier to choose a path when you know what the house is likely worth and what it needs.</p>

    <h2>Step 3: Settle the money questions before you list</h2>
    <p>These are the questions that trip families up after the sign is already in the yard. Get answers from the right professional now.</p>
    <Bullets items={[
      <><strong>Carrying costs.</strong> An empty house still has property taxes, insurance, utilities, lawn care, and HVAC to keep running. Budget for a few months. Durham County Tax Administration can confirm the tax picture for the specific address.</>,
      <><strong>Insurance on a vacant home.</strong> Many homeowners policies limit coverage once a house sits empty for a stretch of time. Call the insurance agent before your parent moves out, not after.</>,
      <><strong>Capital gains.</strong> Many homeowners can exclude up to $250,000 of gain, or $500,000 for a married couple, when they sell a primary residence. There's also a provision for owners who move into a licensed care facility: if they become unable to care for themselves and lived in the home for at least one year of the five years before the sale, time in the facility can count toward the residency requirement. Ask a CPA how it applies to your parent.</>,
      <><strong>Medicaid.</strong> Selling the house turns it into cash, which can affect Medicaid eligibility. Giving the house or the money to family members can also create problems under Medicaid's look-back rules. If Medicaid might pay for care now or later, talk to an elder law attorney before you list, and before anyone gifts anything.</>,
      <><strong>Who gets the proceeds.</strong> The money belongs to your parent, not the family. It usually goes to their account or wherever their attorney or agent under the power of attorney directs, and it often pays for care.</>,
    ]} />

    <h2>Step 4: Handle the stuff without losing a year</h2>
    <p>The house is rarely the hardest part. Forty years of belongings is. A few things that help:</p>
    <Bullets items={[
      "Let your parent choose what comes to the new place first, then let family pick.",
      "Set a deadline. Open-ended cleanouts stretch for months.",
      "Bring in an estate sale or senior move company for the rest. It's often faster and kinder than doing it all yourselves.",
      "Save the paperwork before anything gets tossed: the deed, the most recent tax bill, any survey, warranties, HOA documents, and repair or renovation records.",
      "Photograph the rooms that matter to your family before they're emptied. You'll be glad you did.",
    ]} />

    <h2>Step 5: Get the house ready, but only where it pays</h2>
    <p>You don't need to renovate your parent's house to sell it. You need to know what buyers will notice and what they won't. In an older Durham home, a pre-listing inspection can be money well spent. It shows you the roof, crawlspace, electrical, and plumbing issues before a buyer finds them, so you can decide whether to fix, disclose, or price for them.</p>
    <Bullets items={[
      "Fix safety issues and anything that would scare off a lender.",
      "Clean, paint where it's tired, brighten the lighting, and tidy the yard.",
      "Skip big remodels. They rarely return what they cost.",
      "Selling as-is is a legitimate choice, especially when the timeline is tight or the house needs major work.",
    ]} />
    <p>About cash offers: you'll probably get letters and calls. A cash offer can be the right answer when the house needs heavy work or time is short. Just compare what you'd actually walk away with, not the headline number. Know the house's market value first so you can judge any offer with clear eyes.</p>

    <h2>When the family lives out of state</h2>
    <p>A lot of the families I help are coordinating from somewhere else. It works, as long as a few things are in place.</p>
    <Bullets items={[
      "Name one decision-maker. Group texts are great for updates and terrible for decisions.",
      "Pick one local point person for the keys, vendors, and walk-throughs, or let your agent coordinate access.",
      "Ask for video walk-throughs before and after work is done.",
      "Ask the closing attorney early about signing documents remotely or by mail, so nobody has to fly in for closing unless they want to.",
    ]} />

    <h2>Checklist: before you list your parent's house</h2>
    <Checklist items={CHECKLIST} />

    <h2>Frequently asked questions</h2>
    <Faqs faqs={POST.faqs} />

    <h2>Talk it through first</h2>
    <p>I've spent 28 years helping families in Durham, North Carolina, including a lot of families handling a parent's home. You don't need to have everything figured out before you call. We can walk through where things stand, what the house is likely worth, and what order makes sense, with no pressure and no sales pitch.</p>
    <Ctas />
    <p>If the house has already passed to you, my guide to <Link href="/blog/selling-inherited-house-durham-nc">selling an inherited house in Durham, North Carolina</Link> covers that situation. For more on the area, see Stacy's <Link href="/communities/durham">Durham community page</Link>.</p>

    <Sources reviewed="September 25, 2026" links={[
      ["N.C. General Statutes § 47-28, powers of attorney and registration", "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_47/GS_47-28.html"],
      ["N.C. Judicial Branch, guardianship", "https://www.nccourts.gov/help-topics/guardianship/guardianship"],
      ["N.C. General Statutes Chapter 35A, Article 14, sale of a ward's estate", "https://www.ncleg.net/EnactedLegislation/Statutes/PDF/ByArticle/Chapter_35A/Article_14.pdf"],
      ["26 U.S.C. § 121, exclusion of gain from sale of principal residence", "https://codes.findlaw.com/us/title-26-internal-revenue-code/26-usc-sect-121/"],
      ["Durham County Tax Administration", "https://dconc.gov/Tax-Administration/Tax-Help"],
      ["Redfin, Durham County housing market", "https://www.redfin.com/county/2038/NC/Durham-County/housing-market"],
    ]} />
  </BlogArticle>;
}
