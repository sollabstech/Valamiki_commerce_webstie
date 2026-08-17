"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCatalog } from "@/hooks/use-catalog";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryGrid() {
  const { categories, loading } = useCatalog();

  if (loading || categories.length === 0) return null;

  return (
    <section>
      <SectionHeading title="Shop by Category" subtitle="Everything you need, delivered fast" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={`/category/${category.id}`}
              className="group flex flex-col items-center gap-2.5 rounded-lg bg-surface p-4 shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-medium"
            >
              <span
                className="flex size-14 items-center justify-center rounded-full text-3xl transition-transform group-hover:scale-110 overflow-hidden"
                style={{ backgroundColor: `${category.color}1a` }}
              >
                {category.icon?.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={category.icon} alt={category.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  category.icon || "📦"
                )}
              </span>
              <span className="text-center text-xs font-semibold text-ink-900 sm:text-sm">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
