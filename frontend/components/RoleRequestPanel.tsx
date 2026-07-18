"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function RoleRequestPanel() {
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => api.listRoleRequests("pending").then(setRequests).catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const decide = async (id: string, approve: boolean) => {
    setBusyId(id);
    try {
      await api.decideRoleRequest(id, approve);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-3">Pending Role Requests</h2>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {requests.length === 0 && !error && (
        <p className="text-sm text-gray-500">No pending requests.</p>
      )}
      <ul className="space-y-2">
        {requests.map((r) => (
          <li key={r.id} className="flex items-center justify-between border rounded-lg p-2 text-sm">
            <div>
              <span className="font-medium capitalize">{r.requested_role}</span>
              <span className="text-gray-500"> — user {r.user_id.slice(0, 8)}…</span>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-primary text-xs px-2 py-1"
                disabled={busyId === r.id}
                onClick={() => decide(r.id, true)}
              >
                Approve
              </button>
              <button
                className="btn-secondary text-xs px-2 py-1"
                disabled={busyId === r.id}
                onClick={() => decide(r.id, false)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
