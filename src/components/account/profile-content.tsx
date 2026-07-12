"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function ProfileContent() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName: name });
      toast.success("Profile updated");
    } catch {
      toast.error("Couldn't update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-6 sm:py-8">
      <Link href="/account" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-700">
        <ChevronLeft className="size-4" /> Back to Account
      </Link>

      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Profile Settings</h1>

      <form onSubmit={handleSave} className="mt-6 max-w-md rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-11 w-full rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-lg border border-border-strong bg-white px-3.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
            <p className="mt-1 text-xs text-ink-500">Changing email requires re-verification (not enabled in this demo).</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Mobile Number</label>
            <input
              disabled
              value={user?.phoneNumber ?? "Not linked"}
              className="h-11 w-full rounded-lg border border-border bg-cream-100 px-3.5 text-sm text-ink-500"
            />
          </div>
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
