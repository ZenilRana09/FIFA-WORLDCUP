"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, ChatMessage } from "@/lib/api";

export default function AssistantPanel({
  title,
  icon,
  mode,
  quickPrompts,
  placeholder,
}: {
  title: string;
  icon: string;
  mode: "transport" | "sustainability";
  quickPrompts: string[];
  placeholder: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async (text: string) => {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await api.chat(text, next.slice(-6), undefined, mode);
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-2">
        {icon} {title}
      </h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {quickPrompts.map((q) => (
          <button key={q} className="btn-secondary text-xs px-2 py-1" onClick={() => ask(q)} disabled={loading}>
            {q}
          </button>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {messages.length > 0 && (
          <motion.div
            className="space-y-2 max-h-64 overflow-y-auto mb-3 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  m.role === "user" ? "bg-stadium-green/10 ml-auto max-w-[85%]" : "bg-gray-50 max-w-[85%]"
                }`}
              >
                {m.content}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2"
      >
        <label htmlFor={`assistant-${mode}`} className="sr-only">
          {placeholder}
        </label>
        <input
          id={`assistant-${mode}`}
          className="input-field text-sm"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary text-sm" disabled={loading}>
          {loading ? "…" : "Ask"}
        </button>
      </form>
    </div>
  );
}
