"use client";

interface Props {
  selected: string;
  onChange: (value: string) => void;
}

const filters = [
  "ALL",
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
];

export default function IncidentFilters({
  selected,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition
            ${
              selected === filter
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}