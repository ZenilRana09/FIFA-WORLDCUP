"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaRobot,
  FaShieldAlt,
  FaFutbol,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    value: "125K+",
    title: "Fans Assisted",
    color: "text-green-400",
  },
  {
    icon: <FaRobot />,
    value: "99.2%",
    title: "AI Accuracy",
    color: "text-blue-400",
  },
  {
    icon: <FaShieldAlt />,
    value: "2,500+",
    title: "Security Alerts",
    color: "text-red-400",
  },
  {
    icon: <FaFutbol />,
    value: "16",
    title: "Host Stadiums",
    color: "text-yellow-400",
  },
];

export default function Stats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:scale-105 transition"
        >
          <div className={`text-4xl ${stat.color}`}>
            {stat.icon}
          </div>

          <h2 className="mt-4 text-3xl font-bold text-white">
            {stat.value}
          </h2>

          <p className="mt-2 text-gray-300">
            {stat.title}
          </p>
        </motion.div>
      ))}
    </section>
  );
}