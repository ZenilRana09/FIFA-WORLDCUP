"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8 || !/\d/.test(password)) {
      setError("Password must be at least 8 characters and include a number.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // When the user arrives here via the emailed reset link, Supabase JS
    // automatically picks up the recovery session from the URL.
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="max-w-md mx-auto card mt-10">
      <h1 className="text-xl font-bold mb-4">Set a new password</h1>
      {done ? (
        <p role="status" className="text-sm text-stadium-green">
          Password updated. Redirecting to login…
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              New password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Saving…" : "Save new password"}
          </button>
        </form>
      )}
    </div>
  );
}
