"use client";

import { motion } from "framer-motion";
import { findTeam } from "@/lib/teams";

export default function TeamBanner({ teamCode }: { teamCode?: string | null }) {
  const team = findTeam(teamCode);
  if (!team) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-4 mb-4 flex items-center gap-3 text-white shadow-sm"
      style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
    >
      <span className="text-4xl" aria-hidden="true">
        {team.flag}
      </span>
      <div>
        <p className="font-semibold drop-shadow">Supporting {team.name}</p>
        <p className="text-xs opacity-90 drop-shadow">
          Enjoy the tournament! Change your team anytime from your profile.
        </p>
      </div>
    </motion.div>
  );
}
