import { useState, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

function makeSessionId() {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const sessionId = useRef(makeSessionId());
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    },
    onError: (error) => {
      console.error("[ConciergeWidget] chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I can still help point you in the right direction. Share what you're looking for — a city or area anywhere in North Carolina, your timeline, and budget — and Stacy will follow up. You can also reach her directly at ${SITE.phone}.`,
        },
      ]);
    },
  });

  const handleSend = (content: string) => {
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    chat.mutate({
      messages: next,
      source: "concierge",
      sessionId: sessionId.current,
    });
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Concierge chat"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 active:scale-95",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm animate-fade-up overflow-hidden border border-border bg-card shadow-2xl sm:w-96">
          <div className="bg-primary px-5 py-4 text-primary-foreground">
            <p className="font-serif text-lg">AI Concierge</p>
            <p className="text-xs opacity-90">
              Ask about buying or selling anywhere in North Carolina
            </p>
          </div>
          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={chat.isPending}
            height="420px"
            placeholder="Ask a question..."
            emptyStateMessage={`Hi! I'm ${SITE.agentFirstName}'s AI concierge. How can I help with your North Carolina real estate questions?`}
            suggestedPrompts={[
              "How does the home buying process work?",
              "What should I do to prep my home to sell?",
              "Tell me about living in Wilmington vs Raleigh",
            ]}
          />
        </div>
      )}
    </>
  );
}
