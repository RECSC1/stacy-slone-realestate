import { useState, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

function makeSessionId() {
  return `cp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function Concierge() {
  const sessionId = useRef(makeSessionId());
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = trpc.ai.chat.useMutation({
    onSuccess: (data) =>
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]),
    onError: () =>
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `I'm having trouble right now. Please call Stacy at ${SITE.phone}.` },
      ]),
  });

  const handleSend = (content: string) => {
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    chat.mutate({ messages: next, source: "concierge", sessionId: sessionId.current });
  };

  return (
    <>
      <Seo
        title="AI Concierge — Triangle NC Real Estate Questions"
        description="Ask the AI Concierge your buyer and seller questions about Triangle North Carolina real estate, available anytime from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="Ask Anything"
        title="Your Triangle real estate concierge"
        description="Buying, selling, relocating, or just exploring? Ask away and get clear, helpful answers about the Triangle market anytime."
      />

      <Section className="bg-background" containerClassName="max-w-4xl">
        <div className="mb-6 flex items-center gap-3 border border-border bg-secondary/50 p-4">
          <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            The concierge offers general guidance about Triangle NC real estate.
            For specific listings, pricing, or advice tailored to your situation,
            Stacy is just a call away at {SITE.phone}.
          </p>
        </div>
        <div className="border border-border bg-card">
          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={chat.isPending}
            height="560px"
            placeholder="Ask about buying, selling, or living in the Triangle..."
            emptyStateMessage={`Hi! I'm ${SITE.agentFirstName}'s AI concierge. What would you like to know about Triangle NC real estate?`}
            suggestedPrompts={[
              "What does the home buying process look like?",
              "How should I prepare my home to sell?",
              "What's the difference between Cary, Apex, and Wake Forest?",
              "What costs should a first-time buyer expect?",
            ]}
          />
        </div>
      </Section>
    </>
  );
}
