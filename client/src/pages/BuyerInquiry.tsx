import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { HERO_IMAGES } from "@/config/images";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button as UIButton } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function BuyerInquiryForm() {
  const [loading, setLoading] = useState(false);
  const buyerInquiry = trpc.leads.buyerInquiry.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      timeline: formData.get("timeline") as string,
      priceRange: formData.get("priceRange") as string,
      interests: formData.get("interests") as string,
      message: formData.get("message") as string,
    };

    try {
      await buyerInquiry.mutateAsync(values);
      toast.success("Thank you! Stacy will review your inquiry and reach out soon.");
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" name="name" type="text" required />
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>
      <div>
        <Label htmlFor="timeline">When are you looking to buy? *</Label>
        <Select name="timeline" required>
          <SelectTrigger id="timeline">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Immediately (0-3 months)">Immediately (0-3 months)</SelectItem>
            <SelectItem value="Soon (3-6 months)">Soon (3-6 months)</SelectItem>
            <SelectItem value="Exploring (6-12 months)">Exploring (6-12 months)</SelectItem>
            <SelectItem value="Future planning (12+ months)">Future planning (12+ months)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="priceRange">Estimated budget range</Label>
        <Select name="priceRange">
          <SelectTrigger id="priceRange">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Under $300k">Under $300k</SelectItem>
            <SelectItem value="$300k - $500k">$300k - $500k</SelectItem>
            <SelectItem value="$500k - $750k">$500k - $750k</SelectItem>
            <SelectItem value="$750k - $1M">$750k - $1M</SelectItem>
            <SelectItem value="$1M+">$1M+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="interests">Areas or neighborhoods you're interested in</Label>
        <Textarea
          id="interests"
          name="interests"
          placeholder="e.g., Raleigh downtown, Cary schools, Durham walkability..."
        />
      </div>
      <div>
        <Label htmlFor="message">Tell us more about what you're looking for</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Home style, must-haves, lifestyle priorities, relocating details..."
        />
      </div>
      <UIButton type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send My Buyer Inquiry"}
      </UIButton>
    </form>
  );
}

export default function BuyerInquiry() {
  return (
    <>
      <Seo
        title="Buyer Inquiry | Stacy Wilson Slone | Triangle NC Realtor"
        description="Start your Triangle NC home search with Stacy Wilson Slone. Get personalized buyer guidance, neighborhood insights, and expert market knowledge."
      />

      <PageHero
        title="Ready to Find Your Next Home?"
        description="Let's start your Triangle real estate journey"
        image={HERO_IMAGES.buy}
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Your Buyer Inquiry" />
          <p className="text-lg text-charcoal/80 mb-8">
            Share a bit about what you're looking for in your next home. Stacy will review your inquiry and reach out with personalized guidance, neighborhood recommendations, and next steps tailored to your goals.
          </p>

          <BuyerInquiryForm />
        </div>
      </Section>

      <Section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">What Happens Next</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">1</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">We Review Your Inquiry</h3>
              <p className="text-charcoal/70">Stacy personally reviews every buyer inquiry to understand your goals and preferences.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">2</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Personalized Guidance</h3>
              <p className="text-charcoal/70">You'll receive tailored neighborhood insights, market context, and next steps based on your situation.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">3</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Start Your Search</h3>
              <p className="text-charcoal/70">Together, we'll explore homes that match your criteria and help you move with confidence.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Explore the Triangle</h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Learn more about the neighborhoods and communities where you might call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/communities">
              <Button variant="outline" className="w-full sm:w-auto">
                Browse Communities
              </Button>
            </Link>
            <Link href="/ai-home-search">
              <Button className="w-full sm:w-auto">
                AI Home Search
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
