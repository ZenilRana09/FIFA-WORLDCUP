"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto card mt-10">
      <h1 className="text-xl font-bold mb-4">Reset your password</h1>
      {sent ? (
        <p role="status" className="text-sm text-stadium-green">
          If an account exists for that email, a reset link has been sent. Check your inbox.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
      <p className="text-sm text-gray-600 mt-4">
        <a href="/login" className="text-stadium-green underline">
          Back to login
        </a>
      </p>
    </div>
  );
}
