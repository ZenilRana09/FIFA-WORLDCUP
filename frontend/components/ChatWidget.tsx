"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { api, ChatMessage } from "@/lib/api";

export default function ChatWidget() {
  const { session } = useAuth();

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Welcome! I'm your FIFA AI Assistant. Ask me about gates, accessibility, transport, parking or stadium services.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  if (!session) return null;

  async function send() {
    const text = input.trim();

    if (!text || loading) return;

    const next = [
      ...messages,
      {
        role: "user" as const,
        content: text,
      },
    ];

    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await api.chat(text, next.slice(-6));

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {open && (
        <div
          role="dialog"
          aria-label="AI Assistant"
          className="mb-4 flex h-[34rem] w-[390px] max-w-[95vw] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#081B33]/95 shadow-2xl backdrop-blur-xl"
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#071322] via-[#0B2545] to-[#123D6A] px-6 py-4">

            <div>

              <h2 className="text-lg font-bold text-white">
                🤖 FIFA AI Assistant
              </h2>

              <p className="text-xs text-yellow-300">
                Smart Stadium Support
              </p>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl text-white transition hover:text-yellow-300"
            >
              ✕
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 space-y-4 overflow-y-auto p-5">

            {messages.map((m, index) => (

              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-md ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                    : "border border-white/10 bg-white/10 text-white backdrop-blur-md"
                }`}
              >
                {m.content}
              </div>

            ))}

            {loading && (
              <p className="animate-pulse text-sm text-yellow-300">
                AI is thinking...
              </p>
            )}

            <div ref={endRef} />

          </div>

          {/* Input */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-3 border-t border-white/10 bg-[#071322] p-4"
          >

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field flex-1"
              placeholder="Ask anything..."
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 font-bold text-slate-900 transition hover:-translate-y-1"
            >
              Send
            </button>

          </form>

        </div>
      )}

      {/* Floating Button */}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-3xl text-slate-900 shadow-2xl transition duration-300 hover:scale-110 hover:rotate-12"
      >
        🤖
      </button>

    </div>
  );
}