"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import MapView, { Gate } from "@/components/MapView";
import CrowdDashboard from "@/components/CrowdDashboard";
import AnnouncementList from "@/components/AnnouncementList";
import { api } from "@/lib/api";

export default function VolunteerDashboard() {
  const [gates, setGates] = useState<Gate[]>([]);

  useEffect(() => {
    api.listGates().then(setGates).catch(() => {});
  }, []);

  return (
    <RoleGuard allowed={["volunteer"]}>
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>
      <p className="text-sm text-gray-600 mb-4">
        Report crowd density at your assigned zone to help staff respond quickly.
      </p>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <CrowdDashboard canReport={true} />
          <MapView gates={gates} />
        </div>
        <div>
          <AnnouncementList />
        </div>
      </div>
    </RoleGuard>
  );
}
