import type { Incident } from "@/types/incident";

interface LiveFeedProps {
  incidents: Incident[];
}

export default function LiveFeed({
  incidents,
}: LiveFeedProps) {
  const statusColors: Record<string, string> = {
    CRITICAL: "bg-red-500",
    HIGH: "bg-orange-500",
    MEDIUM: "bg-yellow-500",
    LOW: "bg-green-500",
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">
          📡 Live Activity Feed
        </h2>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
          LIVE
        </span>
      </div>

      <div className="space-y-4">
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex gap-4 rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-400"
            >
              <div
                className={`mt-1 h-3 w-3 rounded-full ${
                  statusColors[incident.severity] ?? "bg-slate-500"
                }`}
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">
                    {incident.title}
                  </p>

                  <span className="text-xs text-slate-400">
                    {new Date(incident.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-300">
                  📍 {incident.location}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  🤖 AI Risk: {incident.aiRisk ?? "Pending"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-slate-700 p-6 text-center text-slate-400">
            No live incidents available.
          </div>
        )}
      </div>
    </div>
  );
}