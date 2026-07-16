import type { Incident } from "@/types/incident";

interface AIRecommendationProps {
  incident?: Incident | null;
}

export default function AIRecommendation({
  incident,
}: AIRecommendationProps) {
  if (!incident) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
        <h2 className="mb-4 text-2xl font-bold text-cyan-400">
          🤖 AI Command Center
        </h2>

        <p className="text-slate-400">
          No AI recommendations available.
        </p>
      </div>
    );
  }

  const riskColor =
    incident.aiRisk === "HIGH"
      ? "text-red-400"
      : incident.aiRisk === "MEDIUM"
      ? "text-yellow-400"
      : incident.aiRisk === "LOW"
      ? "text-green-400"
      : "text-slate-300";

  const actions = Array.isArray(incident.aiActions)
    ? incident.aiActions
    : [];

  return (
    <div
      className="
        rounded-2xl
        border
        border-cyan-500/40
        bg-slate-900/80
        p-6
        shadow-xl
        shadow-cyan-500/10
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">
          🤖 AI Command Center
        </h2>

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
          LIVE
        </span>
      </div>


      <div className="mt-6 space-y-5">

        {/* Incident */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Highest Risk Incident
          </p>

          <h3 className="mt-1 text-xl font-bold text-white">
            {incident.title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            📍 {incident.location}
          </p>
        </div>


        {/* AI Stats */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs text-slate-400">
              AI Risk
            </p>

            <p className={`mt-2 text-lg font-bold ${riskColor}`}>
              {incident.aiRisk ?? "Pending"}
            </p>
          </div>


          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs text-slate-400">
              AI Priority
            </p>

            <p className="mt-2 text-lg font-bold text-yellow-400">
              #{incident.aiPriority ?? "-"}
            </p>
          </div>

        </div>


        {/* AI Summary */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            AI Summary
          </p>

          <div
            className="
              mt-2
              rounded-xl
              bg-slate-800
              p-4
              text-slate-300
            "
          >
            {incident.aiSummary ?? "AI analysis pending..."}
          </div>
        </div>


        {/* Recommended Actions */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Recommended Actions
          </p>

          <div className="mt-3 space-y-3">

            {actions.length > 0 ? (
              actions.map((action: string, index: number) => (
                <div
                  key={index}
                  className="
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-800
                    p-3
                    text-slate-200
                  "
                >
                  ✅ {action}
                </div>
              ))
            ) : (
              <div
                className="
                  rounded-lg
                  bg-slate-800
                  p-3
                  text-slate-400
                "
              >
                No AI actions generated.
              </div>
            )}

          </div>
        </div>


        {/* Resolution */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            bg-green-500/10
            p-4
          "
        >
          <span className="text-slate-300">
            Estimated Resolution
          </span>

          <span className="font-bold text-green-400">
            {incident.aiResolution ?? "Calculating..."}
          </span>
        </div>

      </div>
    </div>
  );
}