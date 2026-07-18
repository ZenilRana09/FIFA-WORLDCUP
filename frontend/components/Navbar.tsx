"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const { session, role, signOut } = useAuth();

  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#081B33]/70 backdrop-blur-2xl shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-3xl shadow-xl transition duration-300 group-hover:rotate-12 group-hover:scale-110">
            ⚽
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              FIFA WORLD CUP
            </h1>

            <p className="text-sm font-medium text-yellow-400">
              AI SMART STADIUM 2026
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-xl md:flex">
          <Link
            href="/"
            className="font-medium text-slate-200 transition duration-300 hover:text-yellow-400"
          >
            Home
          </Link>

          {session && role && (
            <Link
              href={`/dashboard/${role}`}
              className="font-medium text-slate-200 transition duration-300 hover:text-yellow-400"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/profile"
            className="font-medium text-slate-200 transition duration-300 hover:text-yellow-400"
          >
            Profile
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-lg transition duration-300 hover:border-yellow-400 hover:bg-yellow-400/10"
            aria-label="Toggle Dark Mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {session ? (
            <button
              onClick={signOut}
              className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-red-500/40"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition duration-300 hover:border-yellow-400 hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 px-6 py-3 font-bold text-[#071322] shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-yellow-500/40"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}