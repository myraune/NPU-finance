"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string | null;
  major: string | null;
  year: string | null;
  linkedinUrl: string | null;
  imageUrl: string | null;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    bio: "",
    major: "",
    year: "",
    linkedinUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("/api/portal/profile")
      .then((r) => r.json())
      .then((data: Profile) => {
        setProfile(data);
        setForm({
          bio: data.bio ?? "",
          major: data.major ?? "",
          year: data.year ?? "",
          linkedinUrl: data.linkedinUrl ?? "",
          imageUrl: data.imageUrl ?? "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/portal/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setError("Failed to save profile");
      setSaving(false);
      return;
    }

    const updated = await res.json();
    setProfile(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    "w-full bg-surface-1 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/40 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-base pt-24">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-0/50 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/portal" className="flex items-center">
              <img src="/images/logo.png" alt="NPFIS Logo" className="w-8 h-8 object-contain" />
            </Link>
            <span className="text-white/10">|</span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-text-muted font-medium">
              Edit Profile
            </span>
          </div>
          <Link
            href="/portal"
            className="text-[10px] tracking-wider uppercase text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Portal
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
            Profile
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            {profile?.name || "Your Profile"}
          </h1>
          <p className="text-text-secondary text-sm mt-1">{session?.user?.email}</p>
        </div>

        {loading ? (
          <p className="text-text-muted text-sm">Loading...</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Bio */}
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <p className="text-[10px] text-text-muted mt-1 text-right">
                {form.bio.length}/500
              </p>
            </div>

            {/* Major + Year */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-2">
                  Major
                </label>
                <input
                  placeholder="e.g. Finance, Economics"
                  value={form.major}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-2">
                  Year
                </label>
                <select
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-2">
                LinkedIn URL
              </label>
              <input
                placeholder="https://linkedin.com/in/your-profile"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                className={inputClass}
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-2">
                Profile Image URL
              </label>
              <input
                placeholder="https://..."
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className={inputClass}
              />
              {form.imageUrl && (
                <div className="mt-3">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border border-border-subtle"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            {/* Error / Success */}
            {error && (
              <p className="text-negative text-[10px] uppercase tracking-wider">{error}</p>
            )}
            {saved && (
              <p className="text-positive text-[10px] uppercase tracking-wider">
                Profile saved successfully
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-accent text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-accent-light disabled:opacity-50 transition-all duration-300"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
