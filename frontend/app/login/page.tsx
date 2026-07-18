"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const role = data.user?.user_metadata?.role || "fan";

    router.push(`/dashboard/${role}`);
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-6">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[35px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden flex-col justify-center bg-gradient-to-br from-[#071322] via-[#0A2345] to-[#133B63] p-12 lg:flex">

          <span className="mb-4 text-sm font-bold tracking-[0.3em] text-yellow-300">
            FIFA WORLD CUP 2026
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Access your AI Smart Stadium dashboard and monitor
            crowd intelligence, navigation, announcements and
            live stadium operations.
          </p>

          <div className="mt-10 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-3xl">
              ⚽
            </div>

            <div>

              <h3 className="font-bold text-white">
                AI Smart Stadium
              </h3>

              <p className="text-sm text-slate-400">
                Powered by Artificial Intelligence
              </p>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-white">
            Sign In
          </h2>

          <p className="mt-2 text-slate-400">
            Login to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 font-bold text-slate-900 shadow-xl transition hover:-translate-y-1"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-yellow-400 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}