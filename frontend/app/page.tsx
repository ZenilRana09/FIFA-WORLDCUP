"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const features = [
  {
    icon: "🧭",
    title: "Smart Navigation",
    description:
      "AI powered routing helps every fan reach seats, gates and facilities effortlessly.",
  },
  {
    icon: "👥",
    title: "Crowd Intelligence",
    description:
      "Real-time crowd prediction prevents congestion and improves safety.",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "Instant multilingual support for visitors, volunteers and stadium staff.",
  },
  {
    icon: "🚨",
    title: "Emergency Response",
    description:
      "Detect incidents early and recommend the fastest response strategy.",
  },
];

const stats = [
  {
    value: "80K+",
    label: "Stadium Capacity",
  },
  {
    value: "99.9%",
    label: "System Uptime",
  },
  {
    value: "<2s",
    label: "AI Response",
  },
  {
    value: "24/7",
    label: "Monitoring",
  },
];

export default function Home() {
  const { session, role } = useAuth();

  return (
    <div className="space-y-20">

      {/* HERO */}

      <section className="relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 px-10 py-20 backdrop-blur-xl">

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[150px]" />

        <div className="relative z-10">

          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-300">
            ⚽ FIFA WORLD CUP 2026 • AI SMART STADIUM
          </span>

          <h1 className="mt-8 max-w-4xl text-6xl font-extrabold leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
              {" "}Smart Stadium{" "}
            </span>
            Management
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            AI-powered crowd analytics, multilingual assistance,
            predictive monitoring and intelligent operations built for
            FIFA World Cup 2026.
          </p>

          {!session ? (
            <div className="mt-10 flex gap-5">

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-slate-900 shadow-xl transition hover:-translate-y-1"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
              >
                Login
              </Link>

            </div>
          ) : (
            <div className="mt-10">

              <Link
                href={`/dashboard/${role}`}
                className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-slate-900 shadow-xl transition hover:-translate-y-1"
              >
                Open Dashboard
              </Link>

            </div>
          )}

        </div>

      </section>

      {/* STATS */}

      <section className="grid gap-6 md:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400"
          >

            <h2 className="text-4xl font-extrabold text-yellow-400">
              {item.value}
            </h2>

            <p className="mt-3 text-slate-300">
              {item.label}
            </p>

          </div>

        ))}

      </section>

      {/* FEATURES */}

      <section>

        <div className="mb-10 text-center">

          <h2 className="text-4xl font-bold">
            Intelligent Stadium Features
          </h2>

          <p className="mt-3 text-slate-400">
            Everything needed to operate a next-generation FIFA stadium.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-3 hover:border-yellow-400"
            >

              <div className="mb-6 text-5xl transition duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}