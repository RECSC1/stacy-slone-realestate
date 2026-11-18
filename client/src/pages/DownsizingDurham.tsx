import { Link } from "wouter";
import { DOWNSIZING_POST as POST } from "@/config/posts";
import { BlogArticle, Bullets, Checklist, CompareTable, Ctas, Faqs, Sources } from "@/components/BlogArticle";

const CHECKLIST = [
  "Write down why you're moving, not just that you want something smaller.",
  "Get a realistic value for your current home before you plan anything.",
  "Run the real math: equity freed, new monthly costs, and the cost of selling and buying.",
  "Ask a CPA about the capital gains exclusion before you sell.",
  "Check whether you qualify for North Carolina property tax relief.",
  "Decide the order: buy first or sell first, and how you'll bridge the gap.",
  "Start sorting belongings early, one room at a time.",
  "Line up help: a mover, and a senior move manager or estate sale company if you want it.",
  "Decide what the next home needs: single level, low maintenance, location.",
  "Give yourself more time than you think you need. Rushing is where regret comes from.",
];

export default function DownsizingDurham() {
  return <BlogArticle post={POST}>
    <p className="text-xl font-medium leading-9">Downsizing in Durham, North Carolina works best when you start with the goal, not the square footage. Decide what you want the next few years to feel like, then run the real numbers: the equity a sale would free up, what a smaller home costs today, and the taxes and fees involved. For most homeowners who have lived in their house a while, the tax news is better than they expect, and there may be property tax relief you are not using. Take it one step at a time and it does not have to be stressful.</p>
    <p>In 28 years in Durham, North Carolina, I have helped a lot of people right-size, and it is some of the work I am proudest of. Nobody needs to be rushed out of a home they raised a family in. My job is to make the move calm, clear, and on your timeline. Here is how to think it through.</p>
    <p className="text-sm text-muted-foreground">I'm a REALTOR®, not a tax advisor or an attorney. This is general information to help you ask better questions. Confirm the tax and legal details with a CPA or attorney for your situation.</p>

    <h2>First, get honest about why you're moving</h2>
    <p>Smaller is not the real goal. What is underneath it usually is. When we talk, I ask what you actually want more of, because that decides what home fits, not a number of bedrooms.</p>
    <Bullets items={[
      <><strong>Less to take care of.</strong> No more stairs, big yard, or constant upkeep.</>,
      <><strong>Lower costs.</strong> A smaller home can mean smaller payments, taxes, insurance, and utilities.</>,
      <><strong>Freed-up equity.</strong> Turning part of your home's value into savings or income for the next chapter.</>,
      <><strong>Closer to the people and places that matter.</strong> Family, friends, or the parts of town you love.</>,
    ]} />
    <p>Once we know the why, the rest of the decisions get easier and a lot less emotional.</p>

    <h2>Should you downsize? The real math</h2>
    <p>This is the question almost everyone asks, and it deserves a real answer, not a pep talk. Downsizing makes sense when the move clearly improves your monthly life or frees up money you want to use. It makes less sense when the costs of selling and buying eat up most of what you would gain. The honest way to know is to look at the actual numbers:</p>
    <Bullets items={[
      "What your current home would realistically sell for, minus the mortgage you still owe.",
      "What a home that fits the next chapter costs in today's Durham, North Carolina market.",
      "The costs of the move itself: commission, any repairs, closing costs, and the move.",
      "The change in your monthly costs after the move, which is where the long-term win usually lives.",
    ]} />
    <p>A quick, no-pressure look at your home's value is the fastest way to see whether downsizing pencils out for you. You can <Link href="/home-valuation">start with a home value</Link> and we can talk from there.</p>

    <h2>The tax question almost everyone asks</h2>
    <p>Here is where people worry the most, and where the news is often best. When you sell a home you have lived in, federal rules usually let you exclude a large chunk of the gain from taxes.</p>
    <Bullets items={[
      <><strong>The home-sale exclusion.</strong> If the home has been your primary residence for at least two of the last five years, you can generally exclude up to $250,000 of gain, or $500,000 for a married couple filing jointly.</>,
      <><strong>No separate North Carolina home-sale tax.</strong> North Carolina has no state estate or inheritance tax, and the home-sale exclusion applies to your federal return.</>,
      <><strong>Keep your records.</strong> Improvements you made over the years can raise your cost basis and lower any taxable gain, so dig out those receipts.</>,
    ]} />
    <p>Every situation is different, so take the specifics to a CPA. The <a href="https://www.irs.gov/taxtopics/tc701" target="_blank" rel="noopener">IRS guidance on selling your home</a> is a good primer before that conversation.</p>

    <h2>Property tax relief you might be leaving on the table</h2>
    <p>This one gets missed all the time, and it can genuinely lower your costs whether you move or stay. North Carolina offers property tax relief programs for homeowners who qualify, often by age or income.</p>
    <Bullets items={[
      <><strong>Elderly or Disabled Homestead Exclusion.</strong> For qualifying homeowners who are 65 or older, or totally and permanently disabled, with income under the state limit, this excludes part of your home's value from taxes.</>,
      <><strong>Circuit Breaker Tax Deferment.</strong> Another option that can cap property taxes at a percentage of income for those who qualify.</>,
      <><strong>Disabled Veteran Exclusion.</strong> A separate exclusion for eligible veterans with a service-connected disability.</>,
    ]} />
    <p>These have age, income, and application rules, and you usually have to apply. Check the details with <a href="https://www.dconc.gov/county-departments/departments-f-z/tax-administration" target="_blank" rel="noopener">Durham County Tax Administration</a> and the <a href="https://www.ncdor.gov/taxes-forms/property-tax/property-tax-relief" target="_blank" rel="noopener">North Carolina Department of Revenue</a>.</p>

    <h2>Buy first or sell first? The order that trips people up</h2>
    <p>This is the logistics knot, and there is no single right answer. It depends on your finances and how much uncertainty you can stomach.</p>
    <CompareTable label="Scrollable comparison of selling first versus buying first when downsizing" headers={["Approach", "Works well when", "Plan for"]} rows={[
      ["Sell first", "You want certainty and full buying power", "A short-term place to land between homes, or a rent-back from your buyer"],
      ["Buy first", "You find the right smaller home and want a smooth move", "A way to carry two homes briefly, such as a bridge loan or savings"],
      ["Sell and buy together", "Timing can be coordinated", "Contingencies in both contracts, which take a steady hand to line up"],
    ]} />
    <p>I help clients map this out before they commit to either path, so the move happens in an order that fits your life instead of a scramble.</p>

    <h2>What to do with 30 years of belongings</h2>
    <p>For most people, this is the hardest part, harder than the money or the house. The trick is to start early and not do it alone.</p>
    <Bullets items={[
      "Sort one room at a time into keep, give, sell, and let go.",
      "Start months ahead if you can. A rushed purge is where regret lives.",
      "Use the pros: estate sale companies, donation pickups, and senior move managers handle the heavy lifting.",
      "Decide what truly comes with you to the next home before you shop for it, so you buy the right size.",
    ]} />
    <p>After 28 years here, I have a network of people I trust for this part, from movers to estate sale help, and I am glad to share names.</p>

    <h2>What kind of home fits the next chapter</h2>
    <p>Right-sizing is not only about less space. It is about the right space for how you want to live now. Worth thinking through:</p>
    <Bullets items={[
      <><strong>Single-level living</strong> or a primary suite on the main floor, so stairs are optional.</>,
      <><strong>Low-maintenance options</strong> like townhomes, condos, or newer homes, where an HOA may handle the yard and exterior.</>,
      <><strong>Location over size,</strong> closer to family, healthcare, and the places you actually go.</>,
      <><strong>Age-qualified communities,</strong> if that appeals to you, are one option worth asking about.</>,
    ]} />
    <p>With an HOA home, read the documents closely: dues, what they cover, rules, and reserves. If you are weighing parts of the area, the <Link href="/communities">community guide</Link> is a good place to start.</p>

    <h2>A downsizing checklist</h2>
    <Checklist items={CHECKLIST} />

    <h2>Frequently asked questions</h2>
    <Faqs faqs={POST.faqs} />

    <h2>No pressure, no rush, just a plan</h2>
    <p>Downsizing is a big life change, and you deserve someone who treats it that way. We can go at your pace, look at the numbers together, and figure out the right order and timing before you decide anything. If you are helping a parent through a move instead, my guides to <Link href="/blog/parent-moving-to-assisted-living-house-durham-nc">a parent moving to assisted living</Link> and <Link href="/blog/selling-inherited-house-durham-nc">selling an inherited house</Link> walk through those situations too.</p>
    <Ctas />

    <Sources reviewed="November 18, 2026" links={[
      ["IRS, Topic 701, sale of your home and the capital gains exclusion", "https://www.irs.gov/taxtopics/tc701"],
      ["North Carolina Department of Revenue, property tax relief programs", "https://www.ncdor.gov/taxes-forms/property-tax/property-tax-relief"],
      ["Durham County Tax Administration", "https://www.dconc.gov/county-departments/departments-f-z/tax-administration"],
      ["Consumer Financial Protection Bureau, reverse mortgages and later-life options", "https://www.consumerfinance.gov/consumer-tools/reverse-mortgages/"],
      ["Redfin, Durham County housing market", "https://www.redfin.com/county/2038/NC/Durham-County/housing-market"],
    ]} />
  </BlogArticle>;
}
