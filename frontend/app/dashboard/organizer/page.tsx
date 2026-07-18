"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import MapView, { Gate } from "@/components/MapView";
import CrowdDashboard from "@/components/CrowdDashboard";
import AnnouncementList from "@/components/AnnouncementList";
import AnnouncementForm from "@/components/AnnouncementForm";
import { api } from "@/lib/api";

export default function OrganizerDashboard() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api.listGates().then(setGates).catch(() => {});
  }, []);

  const stats = {
    totalGates: gates.length,
    congested: gates.filter((g) => g.status === "congested").length,
    accessible: gates.filter((g) => g.accessible).length,
  };

  return (
    <RoleGuard allowed={["organizer"]}>
      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div>

              <p className="mb-2 text-yellow-400 font-semibold tracking-widest">
                FIFA WORLD CUP 2026
              </p>

              <h1 className="text-4xl font-extrabold">
                Organizer Dashboard
              </h1>

              <p className="mt-3 text-slate-300">
                Monitor crowd movement, gate activity and announcements in real time.
              </p>

            </div>

            <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-6 text-center shadow-xl">

              <h2 className="text-5xl font-extrabold text-slate-900">
                {stats.totalGates}
              </h2>

              <p className="font-semibold text-slate-900">
                Active Gates
              </p>

            </div>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400">

            <p className="text-sm uppercase tracking-wider text-slate-400">
              Total Gates
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {stats.totalGates}
            </h2>

          </div>

          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-8 backdrop-blur-xl transition hover:-translate-y-2">

            <p className="text-sm uppercase tracking-wider text-orange-300">
              Congested
            </p>

            <h2 className="mt-3 text-5xl font-bold text-orange-400">
              {stats.congested}
            </h2>

          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 backdrop-blur-xl transition hover:-translate-y-2">

            <p className="text-sm uppercase tracking-wider text-green-300">
              Accessible
            </p>

            <h2 className="mt-3 text-5xl font-bold text-green-400">
              {stats.accessible}
            </h2>

          </div>

        </div>

        {/* Dashboard Layout */}

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="space-y-6 xl:col-span-2">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-5 text-2xl font-bold">
                Stadium Gate Map
              </h2>

              <MapView gates={gates} />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-5 text-2xl font-bold">
                Crowd Analytics
              </h2>

              <CrowdDashboard canReport={true} />
            </div>

          </div>

          <div className="space-y-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              <h2 className="mb-5 text-2xl font-bold">
                Create Announcement
              </h2>

              <AnnouncementForm
                onCreated={() => setRefreshKey((k) => k + 1)}
              />

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              <h2 className="mb-5 text-2xl font-bold">
                Latest Announcements
              </h2>

              <AnnouncementList key={refreshKey} />

            </div>

          </div>

        </div>

      </div>
    </RoleGuard>
  );
}