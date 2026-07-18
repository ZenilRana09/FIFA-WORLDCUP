"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

export default function OpsIntelligencePanel({
  onSuggestAnnouncement,
}: {
  onSuggestAnnouncement?: (text: string) => void;
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [actions, setActions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.opsSummary();
      setSummary(res.summary);
      setActions(res.suggested_actions);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <motion.div
      className="card border-l-4 border-stadium-green"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">🧠 Operational Intelligence</h2>
        <button className="btn-secondary text-xs px-2 py-1" onClick={load} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {summary && <p className="text-sm text-gray-700 mb-3">{summary}</p>}
      {actions.length > 0 && (
        <ul className="space-y-2">
          {actions.map((a, i) => (
            <li key={i} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
              <span>{a}</span>
              {onSuggestAnnouncement && (
                <button
                  className="text-xs text-stadium-green underline shrink-0 ml-2"
                  onClick={() => onSuggestAnnouncement(a)}
                >
                  Draft announcement
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-400 mt-3">
        AI-generated suggestions — a human organizer must review and post any
        announcement before fans see it.
      </p>
    </motion.div>
  );
}
