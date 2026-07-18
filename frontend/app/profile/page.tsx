"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { TEAMS } from "@/lib/teams";

const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  pt: "Português",
  hi: "हिन्दी",
  de: "Deutsch",
  ja: "日本語",
};

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFavoriteTeam(profile.favorite_team || "");
      setLanguage(profile.preferred_language || "en");
    }
  }, [profile]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.updateMe({ favorite_team: favoriteTeam || undefined, preferred_language: language });
      await refreshProfile();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <RoleGuard allowed={["fan", "volunteer", "organizer", "staff"]}>
      <div className="max-w-md mx-auto card mt-6">
        <h1 className="text-xl font-bold mb-4">Your profile</h1>
        <form onSubmit={save} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Role: <span className="font-medium">{profile?.role}</span>
            </p>
          </div>
          <div>
            <label htmlFor="team" className="block text-sm font-medium mb-1">
              Supporting team
            </label>
            <select id="team" className="input-field" value={favoriteTeam} onChange={(e) => setFavoriteTeam(e.target.value)}>
              <option value="">Prefer not to say</option>
              {TEAMS.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.flag} {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lang" className="block text-sm font-medium mb-1">
              Preferred language
            </label>
            <select id="lang" className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {Object.entries(LANGUAGES).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {saved && (
            <p role="status" className="text-sm text-stadium-green">
              Saved!
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
        {profile?.role === "fan" && (
          <p className="text-xs text-gray-500 mt-4">
            Volunteering or working the event?{" "}
            <a href="/request-role" className="text-stadium-green underline">
              Request an elevated role
            </a>
            .
          </p>
        )}
      </div>
    </RoleGuard>
  );
}
