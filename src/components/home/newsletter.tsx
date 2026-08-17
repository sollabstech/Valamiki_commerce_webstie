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
    <section className="relative overflow-hidden rounded-xl bg-primary-800 px-6 py-10 text-center sm:rounded-2xl sm:py-14">
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_50%_0%,white_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-secondary-500">
          <Mail className="size-5.5 text-primary-900" />
        </span>
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Get offers before anyone else
        </h2>
        <p className="mt-2 text-sm text-white/80">
          Subscribe for flash deal alerts and new arrivals, straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="h-12 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 outline-none focus:border-secondary-400 focus:ring-2 focus:ring-secondary-400/30 disabled:opacity-60"
          />
          <Button type="submit" variant="secondary" size="lg" className="justify-center gap-2" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-primary-900/30 border-t-primary-900" />
                Subscribing...
              </span>
            ) : (
              <><Send className="size-4" /> Subscribe</>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
