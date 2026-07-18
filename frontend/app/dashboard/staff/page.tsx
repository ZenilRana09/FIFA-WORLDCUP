"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import MapView, { Gate } from "@/components/MapView";
import CrowdDashboard from "@/components/CrowdDashboard";
import AnnouncementList from "@/components/AnnouncementList";
import AnnouncementForm from "@/components/AnnouncementForm";
import { api } from "@/lib/api";

export default function StaffDashboard() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api.listGates().then(setGates).catch(() => {});
  }, []);

  const congested = gates.filter((g) => g.status === "congested");

  return (
    <RoleGuard allowed={["staff"]}>
      <h1 className="text-2xl font-bold mb-4">Venue Staff Dashboard</h1>

      {congested.length > 0 && (
        <div className="card mb-4 border-orange-300 bg-orange-50">
          <p className="font-medium text-orange-800">
            ⚠ {congested.length} gate(s) currently congested: {congested.map((g) => g.name).join(", ")}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <MapView gates={gates} />
          <CrowdDashboard canReport={true} />
        </div>
        <div className="space-y-4">
          <AnnouncementForm onCreated={() => setRefreshKey((k) => k + 1)} />
          <AnnouncementList key={refreshKey} />
        </div>
      </div>
    </RoleGuard>
  );
}
