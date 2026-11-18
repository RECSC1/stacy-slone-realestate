import { Link } from "wouter";
import { INHERITED_POST as POST } from "@/config/posts";
import { BlogArticle, Bullets, Checklist, CompareTable, Ctas, Faqs, Sources } from "@/components/BlogArticle";

const CHECKLIST = [
  "Confirm who has legal authority to sign, with the estate attorney.",
  "Ask whether the two-year rule affects your sale.",
  "Call the insurance company about vacancy.",
  "Change the locks and keep the utilities on.",
  "Keep paying the mortgage, if there is one.",
  "Save the deed, tax bill, survey, warranties, HOA documents, and repair records.",
  "Get a real opinion of value, and ask the CPA whether you need a date-of-death appraisal.",
  "Agree on a family plan, in writing.",
  "Decide what to fix and what to leave alone.",
  "Compare a listing and any cash offer on net proceeds.",
];

export default function InheritedHouseDurham() {
  return <BlogArticle post={POST}>
    <p className="text-xl font-medium leading-9">The first question isn't price. It's who has the legal authority to sell. In North Carolina, that depends on whether there's a will, whether an estate has been opened with the Clerk of Superior Court, and how long it's been since your loved one passed. Sort that out with the estate attorney first. While it's in motion, keep the house insured, secured, and maintained, and get a real opinion of value. Most families owe less in tax than they fear, but that's a question for a CPA.</p>
    <p>I've helped a lot of families sell a parent's house in Durham, North Carolina. The calls usually sound the same: "We don't know where to start, my brother lives in Ohio, and the house has been sitting since spring." If that's you, take a breath. This guide walks through what happens first, what happens next, and what you can safely ignore for now.</p>
    <p className="text-sm text-muted-foreground">I'm a REALTOR®, not an attorney or a tax advisor. This is general information to help you ask better questions. Talk to the estate attorney and a CPA before you sign anything.</p>

    <h2>Step 1: Find out who can sign</h2>
    <p>Nothing moves until this is settled, because the title company and the closing attorney won't close without it. The common situations look like this:</p>
    <Bullets items={[
      <><strong>There's a will and an estate has been opened.</strong> The Clerk of Superior Court issues Letters Testamentary to the executor named in the will. The will and the estate attorney will tell you whether the executor can sell on their own or whether the heirs also sign.</>,
      <><strong>There's no will.</strong> North Carolina's intestacy rules decide who inherits. An administrator can be appointed through the Clerk of Superior Court, and the heirs are typically the ones who own the house.</>,
      <><strong>The house was in a trust.</strong> The trustee usually handles the sale under the trust's terms, often without probate for that property.</>,
      <><strong>It's been less than two years since the death.</strong> Under North Carolina law, a sale by heirs during this window can be challenged by the estate's creditors or the personal representative unless certain steps are taken, which often means the personal representative signs too. Title companies watch this closely. Ask the estate attorney how it applies before you list.</>,
    ]} />
    <p>In Durham, estates are handled through the Durham County Clerk of Superior Court, Estates Division. The estate attorney will know the drill.</p>

    <h2>Step 2: Take care of the house while the estate is open</h2>
    <p>An empty house costs money every month and gets riskier the longer it sits. The first few weeks are about protecting it, not selling it.</p>
    <Bullets items={[
      <><strong>Call the insurance company.</strong> Tell them the owner has passed and the house is vacant. Many homeowners policies limit coverage for vacant homes, so ask what you need.</>,
      <><strong>Change the locks</strong> and make a list of who has keys.</>,
      <><strong>Keep the utilities on.</strong> You'll need power and water for showings, inspections, and the appraisal, and you don't want frozen pipes in January.</>,
      <><strong>Keep paying the mortgage, if there is one.</strong> Federal law generally keeps a lender from calling the loan due just because the house passed to a relative, but the payments still have to be made.</>,
      <><strong>Keep up the yard and check on the house regularly,</strong> or have someone do it. An empty house looks empty fast.</>,
      <><strong>Don't throw away paperwork.</strong> Look for the deed, the most recent tax bill, any survey, warranties, HOA documents, and repair records.</>,
    ]} />

    <h2>Step 3: Know what the house is actually worth</h2>
    <p>You need a number for the estate, for the family conversation, and for any tax questions. Online estimates are a starting point at best. They can't see a 1960s kitchen, a crawlspace with water in it, or a brand new roof.</p>
    <p>A walkthrough with someone who knows the neighborhood gives you a realistic range. The CPA may also ask for a formal appraisal of the value at the date of death, which is a separate thing done by a licensed appraiser. Ask early, because it's easier to get while the house is still in its original condition.</p>

    <h2>Step 4: Get the family on the same page</h2>
    <p>This is the step nobody puts on a checklist, and it's the one that stalls the most sales. When several siblings inherit a house together, everyone who owns it usually has to sign. One person who isn't ready can stop the whole thing.</p>
    <Bullets items={[
      "Pick one point person for decisions and communication.",
      "Agree on the plan before listing: sell as-is, make light repairs, or let one sibling buy the others out.",
      "Decide how repair costs and carrying costs will be split and paid back at closing.",
      "Put the plan in writing, even if it's just an email everyone replies \"yes\" to.",
      "If the family truly can't agree, a court can order the sale through what's called a partition proceeding. It's slow and expensive, so treat it as a last resort and talk to an attorney.",
    ]} />

    <h2>Step 5: Understand the tax picture (it's usually better than you think)</h2>
    <p>This is where families worry the most, and it's often where the news is best. A few general points to bring to your CPA:</p>
    <Bullets items={[
      <><strong>North Carolina doesn't have its own estate tax or inheritance tax.</strong> Very large estates can still owe federal estate tax, but most families never come close.</>,
      <><strong>Inherited property usually gets a "step-up" in basis.</strong> For capital gains, the starting value is generally the home's fair market value on the date of death, not what your parents paid decades ago. If you sell close to that value, the taxable gain may be small.</>,
      <><strong>Property taxes keep running.</strong> Durham County still bills the property every year. Durham County Tax Administration can confirm what's owed on the specific address.</>,
    ]} />
    <p>Every estate is different, so get your own CPA's answer before you make decisions based on taxes.</p>

    <h2>Step 6: Decide what to fix, and what to leave alone</h2>
    <p>You don't have to renovate an inherited house to sell it. The goal is to spend money only where buyers will notice it and pay for it.</p>
    <CompareTable label="Scrollable comparison of ways to prepare an inherited house" headers={["Approach", "Makes sense when", "Watch out for"]} rows={[
      ["Sell as-is", "The house needs major work, time is short, or heirs live far away", "You'll likely get a lower price. Buyers still inspect and may negotiate."],
      ["Clean, paint, light repairs", "The house is solid but dated or tired", "Keep it small. Big remodels rarely return what they cost."],
      ["Pre-listing inspection", "Older homes, or no one knows the house's history", "Once you know about a problem, you may need to disclose it, so ask your agent how that works."],
    ]} />
    <p>Some practical notes for older Durham homes: if the house was built before 1978, federal lead-based paint disclosure rules apply. If it's in a local historic district, many exterior changes need city approval before work starts. Check before you hire anyone.</p>
    <p>On paperwork: North Carolina sellers normally complete a Residential Property and Owners' Association Disclosure Statement. The personal representative selling as part of the estate is generally exempt, but heirs who own the house usually are not. Your agent and the estate attorney will tell you which forms apply to you.</p>

    <h2>Step 7: Compare a listing and a cash offer honestly</h2>
    <p>You'll probably get letters, texts, and calls from companies offering cash. Sometimes a cash sale really is the right answer, especially for a house that needs heavy work when the heirs live far away and want it done. The key is to compare what you'd actually walk away with, not the headline number.</p>
    <CompareTable label="Scrollable comparison of a market listing and a cash offer" headers={["Question", "Listing on the market", "Cash offer"]} rows={[
      ["Price", "Usually higher, set by buyer competition", "Usually lower, priced for the buyer's risk and profit"],
      ["Repairs", "Your choice: fix, credit, or sell as-is", "Typically none"],
      ["Timeline", "Weeks to list, plus time under contract", "Often faster"],
      ["Showings", "Yes", "Usually one walkthrough"],
      ["What to compare", "Net proceeds after commission, repairs, and carrying costs", "Net proceeds after any fees, with no surprises at closing"],
    ]} />
    <p>Get a real opinion of market value first. Then you can judge any cash offer with clear eyes instead of guessing.</p>

    <h2>Checklist: before you list an inherited house</h2>
    <Checklist items={CHECKLIST} />

    <h2>Frequently asked questions</h2>
    <Faqs faqs={POST.faqs} />

    <h2>Talk it through before you decide anything</h2>
    <p>I've spent 28 years helping families in Durham, North Carolina, and inherited homes are some of the sales I care about most. You don't need to have it all figured out before you call. We can walk through where things stand, what the house is likely worth, and which order makes sense, with no pressure and no sales pitch.</p>
    <p>If a parent is still living but moving to care, my guide to <Link href="/blog/parent-moving-to-assisted-living-house-durham-nc">a parent's home moving to assisted living</Link> covers that situation step by step.</p>
    <Ctas />

    <Sources reviewed="October 11, 2026" links={[
      ["N.C. General Statutes § 28A-17-12, sale of real property by heirs or devisees", "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_28A/GS_28A-17-12.html"],
      ["N.C. General Statutes Chapter 28A, administration of decedents' estates", "https://www.ncleg.gov/enactedlegislation/statutes/html/bychapter/chapter_28a.html"],
      ["N.C. General Statutes Chapter 47E, Residential Property Disclosure Act", "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_47E.html"],
      ["NC REALTORS®, estate listings and disclosure statements", "https://www.ncrealtors.org/question/estate-listings-and-disclosure-statements/"],
      ["Durham County Tax Administration", "https://dconc.gov/Tax-Administration/Tax-Help"],
      ["Redfin, Durham County housing market", "https://www.redfin.com/county/2038/NC/Durham-County/housing-market"],
    ]} />
  </BlogArticle>;
}
