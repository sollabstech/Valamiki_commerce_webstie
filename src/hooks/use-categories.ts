"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/firestore/categories";
import type { Category } from "@/types/firestore";

// Module-level cache so the header, mobile menu, etc. share one fetch.
let cache: Category[] | null = null;
let inflight: Promise<Category[]> | null = null;

/** Live, active Firestore categories (id + name), cached across components. */
export function useCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>(cache ?? []);

  useEffect(() => {
    if (!inflight) {
      inflight = fetchCategories()
        .then((c) => {
          cache = c;
          return c;
        })
        .catch(() => cache ?? []);
    }
    let alive = true;
    inflight.then((c) => {
      if (alive) setCategories(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  return categories;
}
