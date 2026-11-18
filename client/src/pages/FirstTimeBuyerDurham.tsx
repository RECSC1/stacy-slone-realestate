import { Link } from "wouter";
import { FIRST_TIME_BUYER_POST as POST } from "@/config/posts";
import { BlogArticle, Bullets, Checklist, CompareTable, Ctas, Faqs, Sources } from "@/components/BlogArticle";

const CHECKLIST = [
  "Pull your credit and know your three scores before anyone else does.",
  "Add up a comfortable total monthly payment, not just a price.",
  "Save for the down payment plus closing costs, the due diligence fee, and inspections.",
  "Get a real pre-approval, not just an online estimate.",
  "Ask your lender about FHA, VA, USDA, and NC Housing Finance Agency down payment help.",
  "Separate your must-haves from your nice-to-haves before you tour.",
  "Line up an inspector and know what a due diligence period is for.",
  "Verify taxes, HOA, insurance, and flood status for the specific address.",
  "Keep your finances steady: no new debt or big purchases until after closing.",
  "Pick an agent who explains things and never rushes you.",
];

export default function FirstTimeBuyerDurham() {
  return <BlogArticle post={POST}>
    <p className="text-xl font-medium leading-9">Buying your first home in Durham, North Carolina comes down to three things in the right order: know what you can comfortably afford each month, get pre-approved before you fall for a house, and understand how North Carolina contracts work, especially the due diligence fee. Do those first and the rest gets a lot less scary. You probably need less money up front than you think, and there is real help for first-time buyers if you ask for it.</p>
    <p>I have spent 28 years helping people buy homes in Durham, North Carolina, and first-time buyers are honestly my favorite. You ask the best questions, you are not jaded yet, and the moment you get the keys never gets old for me. This guide walks through what to do first, what surprises people, and what you can safely ignore for now.</p>
    <p className="text-sm text-muted-foreground">I'm a REALTOR®, not a lender or an attorney. This is general information to help you ask better questions. Your lender and closing attorney will confirm the numbers and rules for your situation.</p>

    <h2>Start with the monthly payment, not the price tag</h2>
    <p>The sticker price of a house is not what you live with. The monthly payment is. Before you look at a single listing, figure out a number you can pay every month without holding your breath. That payment includes four things people forget to add up:</p>
    <Bullets items={[
      <><strong>Principal and interest</strong> on the loan itself.</>,
      <><strong>Property taxes,</strong> billed by Durham County on the specific address.</>,
      <><strong>Homeowners insurance,</strong> and private mortgage insurance if your down payment is under 20 percent.</>,
      <><strong>HOA dues,</strong> if the home has them, which many townhomes and newer neighborhoods do.</>,
    ]} />
    <p>Play with the numbers on the <Link href="/mortgage-calculator">mortgage calculator</Link> until a payment feels comfortable, then work backward to a price range. A lender will give you the exact figures, but going in with your own comfort number keeps you in control.</p>

    <h2>What "first-time buyer" really means, and the help you may qualify for</h2>
    <p>Here is good news most people do not know: for most programs, a first-time buyer is simply someone who has not owned a primary home in the past three years. You may qualify even if you owned a home a while back. And there is more help out there than buyers assume.</p>
    <Bullets items={[
      <><strong>North Carolina Housing Finance Agency.</strong> The state offers down payment assistance and a mortgage tax credit for eligible buyers through programs like NC Home Advantage. It is worth a look before you rule anything out.</>,
      <><strong>City of Durham homebuyer assistance.</strong> The City has offered down payment and closing-cost help for income-eligible buyers. Funding and rules change, so confirm what is open when you are ready.</>,
      <><strong>Loan types that lower the bar.</strong> FHA loans allow 3.5 percent down, some conventional loans allow 3 percent, and VA and USDA loans can be zero down for those who qualify.</>,
    ]} />
    <p>Programs and funding change often, so treat this as a starting point and verify the current terms with your lender and the <a href="https://www.nchfa.com/" target="_blank" rel="noopener">NC Housing Finance Agency</a>.</p>

    <h2>Get pre-approved before you fall in love with a house</h2>
    <p>A pre-approval is a lender looking at your real numbers and telling you what they will actually lend, in writing. It is different from an online pre-qualification, and in a market like Durham, North Carolina, sellers take your offer far more seriously with one. It also saves you heartbreak, because you learn your true range before you tour a house you cannot have.</p>
    <p>Talk to more than one lender. Rates and fees vary, and a good loan officer will explain your options instead of pushing one product. If you need a name, I work with lenders I trust and I am glad to share a few.</p>

    <h2>The North Carolina part that surprises everyone: due diligence and earnest money</h2>
    <p>North Carolina does contracts a little differently, and this is the piece that catches first-time buyers off guard. When your offer is accepted, you typically agree to two amounts:</p>
    <CompareTable label="Scrollable comparison of the due diligence fee and earnest money deposit in North Carolina" headers={["What it is", "Due diligence fee", "Earnest money deposit"]} rows={[
      ["Paid to", "The seller, usually right away", "Held in an escrow account"],
      ["What it buys", "Your right to inspect and investigate during the due diligence period", "Shows the seller you are serious"],
      ["If you buy the home", "Credited to you at closing", "Credited to you at closing"],
      ["If you walk away during due diligence", "Generally not refunded", "Generally refunded to you"],
    ]} />
    <p>During the due diligence period, you do your homework: inspections, appraisal, loan, and any questions about the property. If something serious turns up, you can renegotiate or walk away, usually getting your earnest money back but not the due diligence fee. Your agent helps you choose amounts that make your offer competitive without putting more at risk than you need to. The <a href="https://www.ncrec.gov/" target="_blank" rel="noopener">North Carolina Real Estate Commission</a> publishes consumer guides on how the standard contract works.</p>

    <h2>What to look at in a Durham home, and what to ignore</h2>
    <p>Fall in love with the layout and the light, sure. But buy the bones. The things that cost real money later are not the ones that show up in photos.</p>
    <Bullets items={[
      <><strong>Have it inspected, always.</strong> Roof, foundation or crawlspace, HVAC, electrical, plumbing, and water intrusion matter more than paint colors. Older Durham homes especially deserve a careful look.</>,
      <><strong>Check the real monthly cost by address.</strong> Verify property taxes with <a href="https://www.dconc.gov/county-departments/departments-f-z/tax-administration" target="_blank" rel="noopener">Durham County Tax Administration</a>, and get an actual insurance quote rather than a guess.</>,
      <><strong>Read the HOA documents</strong> if there is an association: dues, rules, what they cover, and any planned assessments.</>,
      <><strong>Confirm flood status for the parcel,</strong> not the general area, and ask about drainage.</>,
    ]} />
    <p>If you are still deciding which part of town fits you, my guide to <Link href="/blog/moving-to-durham-nc">choosing the right area in Durham, North Carolina</Link> compares neighborhoods, commutes, and housing styles, and the <Link href="/communities/durham">Durham community page</Link> is a good overview.</p>

    <h2>The money you need beyond the down payment</h2>
    <p>The down payment gets all the attention, but it is not the whole number. Plan for these too, so closing day has no surprises:</p>
    <Bullets items={[
      "Closing costs, often a few percent of the price, for lender fees, attorney, title, and prepaids.",
      "The due diligence fee and earnest money, paid before closing.",
      "Home inspection and any specialty inspections you choose.",
      "The appraisal, usually paid during the process.",
      "Moving costs and a small cushion for the first repairs or furnishings.",
    ]} />
    <p>Your lender will give you a written estimate of the cash you need to close. Ask for it early so you can plan, not scramble.</p>

    <h2>Your first-home game plan</h2>
    <Checklist items={CHECKLIST} />

    <h2>Frequently asked questions</h2>
    <Faqs faqs={POST.faqs} />

    <h2>Let's figure out your first home together</h2>
    <p>You do not need to have any of this memorized before we talk. That is my job. We can walk through what you can comfortably afford, what help you might qualify for, and what to look for in a Durham, North Carolina home, with no pressure and no rush. When you are ready, <Link href="/buy">tell me what you're looking for</Link> and we will start from there.</p>
    <Ctas />

    <Sources reviewed="November 18, 2026" links={[
      ["North Carolina Housing Finance Agency, buyer programs", "https://www.nchfa.com/home-buyers"],
      ["Consumer Financial Protection Bureau, buying a house", "https://www.consumerfinance.gov/owning-a-home/"],
      ["North Carolina Real Estate Commission, consumer resources", "https://www.ncrec.gov/"],
      ["City of Durham, Community Development homebuyer assistance", "https://www.durhamnc.gov/700/Community-Development"],
      ["Durham County Tax Administration", "https://www.dconc.gov/county-departments/departments-f-z/tax-administration"],
      ["Redfin, Durham County housing market", "https://www.redfin.com/county/2038/NC/Durham-County/housing-market"],
    ]} />
  </BlogArticle>;
}
