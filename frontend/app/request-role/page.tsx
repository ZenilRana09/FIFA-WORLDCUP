"use client";

import { useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";

const ROLES = [
  { value: "volunteer", label: "Volunteer" },
  { value: "staff", label: "Venue Staff" },
  { value: "organizer", label: "Organizer / Admin" },
];

export default function RequestRolePage() {
  const { refreshProfile } = useAuth();
  const [role, setRole] = useState("volunteer");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.requestRole(role, code || undefined);
      if (res.status === "approved") {
        setResult("Approved! Your account has been upgraded — reload your dashboard to see the new options.");
        await refreshProfile();
      } else {
        setResult("Request submitted. An organizer will review it shortly.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowed={["fan", "volunteer", "organizer", "staff"]}>
      <div className="max-w-md mx-auto card mt-6">
        <h1 className="text-xl font-bold mb-2">Request an elevated role</h1>
        <p className="text-sm text-gray-600 mb-4">
          Volunteer, staff, and organizer roles are no longer chosen at sign-up
          for security reasons. Enter an invite code for instant access, or
          submit a request for an organizer to approve.
        </p>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Requested role
            </label>
            <select id="role" className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-1">
              Invite code (optional)
            </label>
            <input id="code" className="input-field" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          {result && (
            <p role="status" className="text-sm text-stadium-green">
              {result}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Submitting…" : "Submit request"}
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
