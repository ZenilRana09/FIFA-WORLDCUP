"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import type { Incident } from "@/types/incident";

interface AnalyticsProps {
  incidents: Incident[];
}

export default function Analytics({ incidents }: AnalyticsProps) {
  const severityData = [
    {
      name: "Critical",
      value: incidents.filter(i => i.severity === "CRITICAL").length,
    },
    {
      name: "High",
      value: incidents.filter(i => i.severity === "HIGH").length,
    },
    {
      name: "Medium",
      value: incidents.filter(i => i.severity === "MEDIUM").length,
    },
    {
      name: "Low",
      value: incidents.filter(i => i.severity === "LOW").length,
    },
  ];

  const gateData = incidents.map((incident) => ({
    gate: incident.location,
    crowd: incident.crowdDensity ?? 0,
  }));

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pie Chart */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-bold text-cyan-400">
          📊 Incident Severity
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {severityData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-bold text-cyan-400">
          👥 Crowd Density by Gate
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gateData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="gate" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="crowd"
                fill="#06b6d4"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}