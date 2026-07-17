import type { Incident } from "@/types/incident";

type Props = {
  incidents: Incident[];
};

const positions: Record<string, string> = {
  "Gate A": "left-[18%] top-[70%]",
  "Gate B": "right-[18%] top-[70%]",
  "Gate C": "left-[18%] top-[20%]",
  "Gate D": "right-[18%] top-[20%]",
  "VIP Entrance": "left-1/2 top-[12%] -translate-x-1/2",
  "Medical": "left-[50%] top-[78%] -translate-x-1/2",
};

function markerColor(severity: string) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-500";
    case "HIGH":
      return "bg-orange-500";
    case "MEDIUM":
      return "bg-yellow-400";
    default:
      return "bg-green-500";
  }
}

export default function StadiumMap({ incidents }: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl font-bold">🏟 Stadium Map</h2>

      <div className="relative h-[350px] rounded-xl border border-gray-700 bg-gray-800">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`absolute ${
              positions[incident.location] ??
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full ${markerColor(
                incident.severity
              )} animate-pulse`}
              title={`${incident.location} • ${incident.severity}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span>🔴 Critical</span>
        <span>🟠 High</span>
        <span>🟡 Medium</span>
        <span>🟢 Low</span>
      </div>
    </div>
  );
}