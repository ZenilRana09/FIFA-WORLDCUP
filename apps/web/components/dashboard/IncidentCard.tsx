import type { Incident } from "@/types/incident";

interface IncidentCardProps {
  incident: Incident;
}

export default function IncidentCard({
  incident,
}: IncidentCardProps) {
  const severityColors: Record<string, string> = {
    CRITICAL: "bg-red-600",
    HIGH: "bg-orange-500",
    MEDIUM: "bg-yellow-500",
    LOW: "bg-green-500",
  };

  const badgeColor =
    severityColors[incident.severity] ?? "bg-slate-600";

  const aiRiskColor =
    incident.aiRisk === "HIGH"
      ? "text-red-400"
      : incident.aiRisk === "MEDIUM"
      ? "text-yellow-400"
      : incident.aiRisk === "LOW"
      ? "text-green-400"
      : "text-slate-300";

  const statusColor =
    incident.status === "RESOLVED"
      ? "text-green-400"
      : incident.status === "IN_PROGRESS"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/80
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        hover:border-cyan-400
        hover:shadow-xl
        hover:shadow-cyan-500/20
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            {incident.title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {incident.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold text-white ${badgeColor}`}
        >
          {incident.severity}
        </span>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        <div>
          <p className="text-xs text-slate-400">
            📍 Location
          </p>
          <p className="font-medium text-white">
            {incident.location}
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            👥 Crowd Density
          </p>
          <p className="font-medium text-white">
            {incident.crowdDensity ?? 0}%
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            🤖 AI Risk
          </p>

          <p className={`font-bold ${aiRiskColor}`}>
            {incident.aiRisk ?? "Pending"}
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            🎯 AI Priority
          </p>

          <p className="font-medium text-white">
            {incident.aiPriority ?? "-"}
          </p>
        </div>


        <div>
          <p className="text-xs text-slate-400">
            📌 Status
          </p>

          <p className={`font-bold ${statusColor}`}>
            {incident.status ?? "OPEN"}
          </p>
        </div>

      </div>


      {/* AI Summary */}
      {incident.aiSummary && (
        <div className="
          mt-6
          rounded-xl
          border
          border-cyan-500/20
          bg-slate-800
          p-4
        ">
          <h4 className="text-sm font-semibold text-cyan-400">
            🤖 AI Summary
          </h4>

          <p className="mt-2 text-sm text-slate-300">
            {incident.aiSummary}
          </p>
        </div>
      )}


      {/* Resolution */}
      {incident.aiResolution && (
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-slate-700
            pt-4
          "
        >
          <span className="text-sm text-slate-400">
            Estimated Resolution
          </span>

          <span
            className="
              rounded-full
              bg-green-500/20
              px-3
              py-1
              text-sm
              font-semibold
              text-green-400
            "
          >
            {incident.aiResolution}
          </span>
        </div>
      )}

    </div>
  );
}