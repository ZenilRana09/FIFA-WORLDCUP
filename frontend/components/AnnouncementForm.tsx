"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function AnnouncementForm({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [audience, setAudience] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await api.createAnnouncement(
        title,
        message,
        severity,
        audience
      );

      setTitle("");
      setMessage("");

      onCreated?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5"
    >

      <div>

        <h2 className="text-2xl font-bold">
          ✍️ New Announcement
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Broadcast updates to fans and staff.
        </p>

      </div>

      <input
        required
        className="input-field"
        placeholder="Announcement title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        required
        rows={4}
        className="input-field"
        placeholder="Write your announcement..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">

        <select
          className="input-field"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>

        <select
          className="input-field"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option value="all">All</option>
          <option value="fan">Fans</option>
          <option value="volunteer">Volunteers</option>
          <option value="organizer">Organizers</option>
          <option value="staff">Staff</option>
        </select>

      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-3 font-bold text-slate-900 shadow-lg transition hover:-translate-y-1"
      >
        {submitting ? "Publishing..." : "📢 Publish Announcement"}
      </button>

    </form>
  );
}