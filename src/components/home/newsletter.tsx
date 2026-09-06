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
    <section className="relative overflow-hidden rounded-2xl bg-gradient-navy px-6 py-10 text-center shadow-elevated ring-1 ring-secondary-500/30 sm:py-14">
      <div className="pointer-events-none absolute inset-2 rounded-[1.1rem] ring-1 ring-inset ring-secondary-500/20" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_50%_0%,white_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-secondary-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 size-52 rounded-full bg-primary-400/25 blur-3xl" />
      <div className="relative mx-auto max-w-md">
        <span className="gloss mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-gold shadow-gold ring-1 ring-white/40">
          <Mail className="relative z-[2] size-5.5 text-primary-900" />
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
