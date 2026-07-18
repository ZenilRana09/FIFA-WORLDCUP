"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const SEVERITY_STYLE: Record<string, string> = {
  info: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  critical: "bg-red-500/20 text-red-300 border border-red-500/30",
};

const ICONS: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  critical: "🚨",
};

export default function AnnouncementList() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.listAnnouncements().then(setItems).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            📢 Announcements
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest stadium updates.
          </p>
        </div>

        <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-semibold text-yellow-300">
          {items.length}
        </span>

      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {!error && items.length === 0 && (
        <div className="rounded-2xl border border-white/10 p-6 text-center text-slate-400">
          No announcements yet.
        </div>
      )}

      <div className="space-y-4">

        {items.map((a) => (

          <div
            key={a.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-yellow-400 hover:bg-white/10"
          >

            <div className="mb-3 flex items-center justify-between">

              <h3 className="font-semibold">
                {ICONS[a.severity]} {a.title}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${SEVERITY_STYLE[a.severity]}`}
              >
                {a.severity.toUpperCase()}
              </span>

            </div>

            <p className="leading-7 text-slate-300">
              {a.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}