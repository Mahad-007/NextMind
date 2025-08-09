"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatClient({ initialCredits }: { initialCredits: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I\'m your chatbot. Ask me anything. Each message costs 1 credit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [credits, setCredits] = useState(initialCredits);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  const canSend = useMemo(() => !isSending && input.trim().length > 0 && credits > 0, [isSending, input, credits]);

  const onSend = async () => {
    if (!canSend) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errText = data?.error ?? "Something went wrong";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${errText}` },
        ]);
        if (typeof data?.credits === "number") setCredits(data.credits);
        return;
      }
      setCredits(data.credits);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }] );
    } catch (e: unknown) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">ChatBot</h1>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Credits: <span className={credits > 0 ? "text-emerald-400" : "text-red-400"}>{credits}</span>
        </div>
      </div>

      <Card className="bg-card/80 backdrop-blur border-foreground/10 shadow-2xl">
        <CardContent className="p-0">
          <div
            ref={containerRef}
            className="h-[65vh] md:h-[70vh] overflow-y-auto p-3 md:p-4 flex flex-col gap-3"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.role === "user"
                    ? "self-end max-w-[85%] rounded-2xl px-4 py-2 bg-primary text-primary-foreground shadow"
                    : "self-start max-w-[85%] rounded-2xl px-4 py-2 bg-secondary text-foreground border border-foreground/10"
                }
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="border-t border-foreground/10 p-2 md:p-3 flex gap-2">
            <Input
              placeholder={credits > 0 ? "Type your message..." : "Out of credits"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isSending || credits <= 0}
              className="text-sm md:text-base"
            />
            <Button onClick={onSend} disabled={!canSend} className="min-w-[84px]">
              {isSending ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

