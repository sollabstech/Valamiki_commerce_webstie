"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const db = getDb();
      if (!db) throw new Error("DB not available");

      // Check if already subscribed
      const existing = await getDocs(
        query(collection(db, "subscribers"), where("email", "==", email.trim().toLowerCase()))
      );
      if (!existing.empty) {
        toast.info("You're already subscribed!");
        setEmail("");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "subscribers"), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
      });

      toast.success("Subscribed! Watch your inbox for offers.");
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2">
      <div>
        <span className="eyebrow">Stay in the loop</span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-[2.4rem]">
          Get the best deals first
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
          Join our list for flash-deal alerts, new arrivals and members-only
          pricing — straight to your inbox. No spam, unsubscribe any time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
        <div className="relative flex-1 sm:max-w-sm">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-ink-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={loading}
            className="h-12 w-full rounded-md border border-border bg-surface/80 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-500 outline-none transition-colors focus:border-secondary-400 focus:ring-2 focus:ring-secondary-500/25 disabled:opacity-60"
          />
        </div>
        <Button type="submit" size="lg" className="justify-center gap-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent" />
              Subscribing
            </span>
          ) : (
            <>
              <Send className="size-4" /> Subscribe
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
