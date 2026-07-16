interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/80
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400
        hover:shadow-xl
        hover:shadow-cyan-500/20
      "
    >
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="flex items-center justify-between">
        <div className="text-5xl">{icon}</div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-400 font-medium">
            LIVE
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-sm uppercase tracking-widest text-slate-400">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}