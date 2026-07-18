"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const ROLES = [
  { value: "fan", label: "⚽ Fan" },
  { value: "volunteer", label: "🤝 Volunteer" },
  { value: "organizer", label: "🏟 Organizer / Admin" },
  { value: "staff", label: "🛡 Venue Staff" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("fan");

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setInfo(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push(`/dashboard/${role}`);
    } else {
      setInfo(
        "Account created successfully! Please verify your email before signing in."
      );
    }
  }

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-6">

      <div className="grid w-full max-w-7xl overflow-hidden rounded-[35px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden flex-col justify-center bg-gradient-to-br from-[#071322] via-[#0A2345] to-[#123D6A] p-14 lg:flex">

          <span className="mb-4 text-sm font-bold tracking-[0.35em] text-yellow-300">
            FIFA WORLD CUP 2026
          </span>

          <h1 className="text-5xl font-extrabold text-white">
            Join Smart Stadium
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create your account to experience AI-powered crowd
            management, live navigation, accessibility assistance,
            announcements and real-time stadium insights.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">⚽</div>
              <h3 className="mt-2 font-bold text-white">
                Smart Navigation
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">🤖</div>
              <h3 className="mt-2 font-bold text-white">
                AI Assistant
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">📊</div>
              <h3 className="mt-2 font-bold text-white">
                Live Analytics
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">🚨</div>
              <h3 className="mt-2 font-bold text-white">
                Emergency Alerts
              </h3>
            </div>

          </div>

        </div>

        {/* Right Panel */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-white">
            Create Account
          </h2>

          <p className="mt-2 text-slate-400">
            Join the FIFA AI Smart Stadium platform.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                className="input-field"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                minLength={6}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Select Role
              </label>

              <select
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>

            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>
            )}

            {info && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 font-bold text-slate-900 shadow-xl transition hover:-translate-y-1 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-yellow-400 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}