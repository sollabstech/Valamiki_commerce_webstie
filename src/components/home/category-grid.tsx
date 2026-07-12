"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/config/nav";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryGrid() {
  return (
    <section>
      <SectionHeading title="Shop by Category" subtitle="Everything you need, delivered fast" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {categories.map((category, i) => {
          const Icon = category.icon;
          return (
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
                  className="flex size-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}1a` }}
                >
                  <Icon className="size-6.5" style={{ color: category.color }} strokeWidth={1.75} />
                </span>
                <span className="text-center text-xs font-semibold text-ink-900 sm:text-sm">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
