"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <span className="rounded-full border border-green-400/40 bg-green-500/10 px-4 py-2 text-sm text-green-300">
          ⚽ FIFA WORLD CUP 2026
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight">
          AI Powered
          <span className="block bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent">
            Smart Stadium Platform
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Monitor crowds, assist fans, manage gates, analyze incidents and
          coordinate volunteers using a modern AI-powered operations platform.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/register" className="btn-primary">
            Get Started
          </Link>

          <Link href="/login" className="btn-secondary">
            Live Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}