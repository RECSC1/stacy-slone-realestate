import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

function makeSessionId() {
  return `hs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function AIHomeSearch() {
  const sessionId = useRef(makeSessionId());
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = trpc.ai.chat.useMutation({
    onSuccess: (data) =>
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]),
    onError: () =>
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm having trouble right now. Please call Stacy at ${SITE.phone}.`,
        },
      ]),
  });

  const handleSend = (content: string) => {
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    chat.mutate({ messages: next, source: "home-search", sessionId: sessionId.current });
  };

  return (
    <>
      <Seo
        title="AI Home Search — Describe Your Dream Triangle Home"
        description="Use AI Home Search to describe your ideal Triangle NC home in plain language and get personalized guidance from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="AI-Powered"
        title="Describe your dream home"
        description="Tell the AI what you're looking for in plain language — neighborhood feel, must-haves, lifestyle — and get thoughtful, Triangle-specific guidance."
      />

      <Section className="bg-background" containerClassName="max-w-4xl">
        <div className="mb-6 flex items-center gap-3 rounded-none border border-border bg-secondary/50 p-4">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            This AI assistant offers general, qualitative guidance about the
            Triangle and isn't a live MLS feed. For real listings and pricing,
            Stacy will personally curate matches for you.
          </p>
        </div>

        <div className="border border-border bg-card">
          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={chat.isPending}
            height="560px"
            placeholder="e.g. A 3-bed near good parks in Cary with a home office..."
            emptyStateMessage="Describe your ideal Triangle home and lifestyle to get started."
            suggestedPrompts={[
              "I want a walkable neighborhood near downtown Durham under a tight budget",
              "Looking for a quiet family-friendly area in Cary or Apex with parks",
              "First-time buyer wanting a starter home near Raleigh — where should I look?",
            ]}
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/property-alerts"
            className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Set Up Property Alerts
          </a>
          <a
            href="/contact"
            className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:border-primary"
          >
            Talk to Stacy
          </a>
        </div>
      </Section>
    </>
  );
}
