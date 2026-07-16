type Incident = {
  id: string;
  location: string;
  crowdDensity?: number;
  aiRisk?: string | null;
};

type Props = {
  incidents: Incident[];
};

const gates = [
  "Gate A",
  "Gate B",
  "Gate C",
  "Gate D",
];

export default function StadiumMap({ incidents }: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🏟 Stadium Live Map
        </h2>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs">
          Live AI
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {gates.map((gate) => {
          const incident = incidents.find(
            (i) =>
              i.location.toLowerCase() === gate.toLowerCase()
          );

          let color = "bg-green-600";
          let status = "Normal";

          if (incident?.aiRisk === "HIGH") {
            color = "bg-red-600";
            status = "High Risk";
          } else if (incident) {
            color = "bg-yellow-500";
            status = "Crowded";
          }

          return (
            <div
              key={gate}
              className={`${color} rounded-xl p-6 transition hover:scale-105`}
            >
              <h3 className="text-lg font-bold">{gate}</h3>

              <p className="mt-2 text-sm">
                Crowd
              </p>

              <div className="text-3xl font-bold">
                {incident?.crowdDensity ?? 0}%
              </div>

              <div className="mt-4 rounded-full bg-black/20 px-3 py-1 text-center text-sm">
                {status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}