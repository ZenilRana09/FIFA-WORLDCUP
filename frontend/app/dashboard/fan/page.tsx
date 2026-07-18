"use client";

import { useEffect, useState } from "react";

import RoleGuard from "@/components/RoleGuard";
import MapView, { Gate } from "@/components/MapView";
import CrowdDashboard from "@/components/CrowdDashboard";
import AnnouncementList from "@/components/AnnouncementList";

import { api } from "@/lib/api";

export default function FanDashboard() {
  const [gates, setGates] = useState<Gate[]>([]);

  useEffect(() => {
    api.listGates().then(setGates).catch(() => {});
  }, []);

  const available = gates.filter((g) => g.status === "open").length;
  const busy = gates.filter((g) => g.status === "busy").length;
  const accessible = gates.filter((g) => g.accessible).length;

  return (
    <RoleGuard allowed={["fan"]}>
      <div className="space-y-8">

        {/* Hero */}

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#071322] via-[#0A2345] to-[#123D6A] p-8 shadow-2xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="mb-2 text-sm font-bold tracking-[0.35em] text-yellow-300">
                FIFA WORLD CUP 2026
              </p>

              <h1 className="text-4xl font-extrabold text-white">
                Fan Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                View live stadium information, crowd conditions,
                navigation assistance and official announcements
                in one place.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-5 text-center backdrop-blur">

              <p className="text-sm text-slate-300">
                Stadium Status
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                LIVE
              </h2>

            </div>

          </div>

        </section>

        {/* Stats */}

        <section className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <p className="text-slate-400">
              🟢 Open Gates
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-400">
              {available}
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <p className="text-slate-400">
              🚦 Busy Gates
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-400">
              {busy}
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <p className="text-slate-400">
              ♿ Accessible Gates
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-400">
              {accessible}
            </h2>

          </div>

        </section>

        {/* Main Content */}

        <section className="grid gap-6 xl:grid-cols-3">

          <div className="space-y-6 xl:col-span-2">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <MapView gates={gates} />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <CrowdDashboard canReport={false} />
            </div>

          </div>

          <div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">

              <h2 className="mb-5 text-2xl font-bold text-white">
                📢 Official Announcements
              </h2>

              <AnnouncementList />

            </div>

          </div>

        </section>

      </div>
    </RoleGuard>
  );
}