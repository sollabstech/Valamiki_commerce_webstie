"use client";

import { ArrowDownUp } from "lucide-react";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

const options: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <div className="relative">
      <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-10 appearance-none rounded-lg border border-border-strong bg-white pl-9 pr-8 text-sm font-medium text-ink-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
