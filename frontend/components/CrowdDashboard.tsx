"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { api } from "@/lib/api";

const LEVEL_COLOR: Record<string, string> = {
  low: "bg-green-500/20 text-green-300 border border-green-500/30",
  moderate: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  critical: "bg-red-500/20 text-red-300 border border-red-500/30",
};

const LEVEL_PROGRESS: Record<string, number> = {
  low: 25,
  moderate: 50,
  high: 75,
  critical: 100,
};

const ZONES = [
  "north-plaza",
  "east-stand",
  "west-stand",
  "south-plaza",
];

export default function CrowdDashboard({
  canReport,
}: {
  canReport: boolean;
}) {
  const [reports, setReports] = useState<any[]>([]);
  const [zone, setZone] = useState(ZONES[0]);
  const [level, setLevel] = useState("moderate");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () =>
    api
      .listCrowdReports()
      .then(setReports)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();

    const channel = supabase
      .channel("crowd_reports_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "crowd_reports",
        },
        (payload) =>
          setReports((prev) => [payload.new, ...prev].slice(0, 50))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await api.createCrowdReport(
        zone,
        level,
        note || undefined
      );

      setNote("");
      load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            📊 Live Crowd Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Real-time stadium crowd monitoring.
          </p>

        </div>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">
          LIVE
        </span>

      </div>

      {canReport && (
        <form
          onSubmit={submit}
          className="mb-8 grid gap-4 lg:grid-cols-4"
        >
          <select
            className="input-field"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          >
            {ZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["low", "moderate", "high", "critical"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <input
            className="input-field"
            placeholder="Optional note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-3 font-bold text-slate-900 transition hover:-translate-y-1"
          >
            {submitting ? "Submitting..." : "Report"}
          </button>
        </form>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">

        {reports.length === 0 && (
          <div className="rounded-2xl border border-white/10 p-6 text-center text-slate-400">
            No crowd reports available.
          </div>
        )}

        {reports.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-yellow-400 hover:bg-white/10"
          >

            <div className="mb-3 flex items-center justify-between">

              <div>

                <h3 className="font-semibold capitalize">
                  {r.zone_id}
                </h3>

                {r.note && (
                  <p className="mt-1 text-sm text-slate-400">
                    {r.note}
                  </p>
                )}

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_COLOR[r.density_level]}`}
              >
                {r.density_level.toUpperCase()}
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

              <div
                style={{
                  width: `${LEVEL_PROGRESS[r.density_level]}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}