import type { Incident } from "@/types/incident";

import Header from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import IncidentCard from "../components/dashboard/IncidentCard";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import LiveFeed from "../components/dashboard/LiveFeed";
import StadiumMap from "../components/dashboard/StadiumMap";
import Analytics from "../components/dashboard/Analytics";
import RealtimeProvider from "../components/dashboard/RealtimeProvider";

import { getIncidents } from "../lib/api";

export default async function Home() {
  const response = await getIncidents();

  const incidents: Incident[] = Array.isArray(response?.data)
    ? response.data
    : [];

  const criticalIncidents = incidents.filter(
    (incident) => incident.severity === "CRITICAL"
  );

  const averageCrowd =
    incidents.length === 0
      ? 0
      : Math.round(
          incidents.reduce(
            (sum, incident) => sum + (incident.crowdDensity ?? 0),
            0
          ) / incidents.length
        );

  const aiAnalyzed = incidents.filter(
    (incident) => incident.aiRisk
  ).length;

  const highestRiskIncident =
    incidents.find((incident) => incident.aiRisk) ?? null;

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      {/* Socket.IO Connection */}
      <RealtimeProvider />

      <div className="mx-auto max-w-7xl">
        <Header />

        {/* KPI Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Incidents"
            value={String(incidents.length)}
            icon="🚨"
          />

          <StatCard
            title="Critical Alerts"
            value={String(criticalIncidents.length)}
            icon="⚠️"
          />

          <StatCard
            title="Average Crowd"
            value={`${averageCrowd}%`}
            icon="👥"
          />

          <StatCard
            title="AI Analyzed"
            value={String(aiAnalyzed)}
            icon="🤖"
          />

          <StatCard
            title="Security Teams"
            value="18"
            icon="👮"
          />

          <StatCard
            title="Medical Teams"
            value="6"
            icon="🚑"
          />

          <StatCard
            title="CCTV Cameras"
            value="248"
            icon="🎥"
          />

          <StatCard
            title="Response Time"
            value="3.2m"
            icon="⏱️"
          />
        </div>

        {/* Command Center */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <LiveFeed incidents={incidents} />

          <StadiumMap incidents={incidents} />

          <AIRecommendation incident={highestRiskIncident} />
        </div>

        {/* Live Incidents */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">
            🚨 Live Incidents
          </h2>

          <div className="grid gap-6">
            {incidents.length > 0 ? (
              incidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                />
              ))
            ) : (
              <div className="rounded-lg border border-gray-700 p-6 text-center text-gray-400">
                No incidents available.
              </div>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-12">
          <Analytics incidents={incidents} />
        </div>
      </div>
    </main>
  );
}