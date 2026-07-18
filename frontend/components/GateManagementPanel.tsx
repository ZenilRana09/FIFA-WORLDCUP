"use client";

import { useState } from "react";
import { Gate } from "./MapView";
import { api } from "@/lib/api";

const STATUS_OPTIONS = ["open", "congested", "closed"];

export default function GateManagementPanel({ gates, onChanged }: { gates: Gate[]; onChanged: () => void }) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setStatus = async (id: string, status: string) => {
    setBusyId(id);
    setError(null);
    try {
      await api.updateGateStatus(id, status);
      onChanged();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-3">Gate Management</h2>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <ul className="space-y-2">
        {gates.map((g) => (
          <li key={g.id} className="flex items-center justify-between text-sm border rounded-lg p-2">
            <span>
              {g.name} <span className="text-gray-400">({g.zone_id})</span>
            </span>
            <select
              className="input-field w-auto text-xs py-1"
              value={g.status}
              disabled={busyId === g.id}
              onChange={(e) => setStatus(g.id, e.target.value)}
              aria-label={`Status for ${g.name}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
