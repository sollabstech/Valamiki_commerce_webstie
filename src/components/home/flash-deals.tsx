"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/firestore";

function useTimeUntilMidnight() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      setRemaining(midnight.getTime() - now.getTime());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { hours, minutes, seconds };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-primary-900 px-1.5 font-mono text-sm font-bold text-white">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[10px] text-white/70">{label}</span>
    </div>
  );
}

export function FlashDeals({ products }: { products: Product[] }) {
  const { hours, minutes, seconds } = useTimeUntilMidnight();

  if (products.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 p-4 sm:rounded-2xl sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="size-6 fill-primary-900 text-primary-900" />
          <h2 className="font-display text-xl font-extrabold text-primary-900 sm:text-2xl">
            Flash Deals
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary-900/80 sm:text-sm">Ends in</span>
          <div className="flex items-center gap-1">
            <TimeBox value={hours} label="hrs" />
            <span className="text-white/70">:</span>
            <TimeBox value={minutes} label="min" />
            <span className="text-white/70">:</span>
            <TimeBox value={seconds} label="sec" />
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1" style={{ scrollSnapType: "x mandatory" }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[46%] shrink-0 sm:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
