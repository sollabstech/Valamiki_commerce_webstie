import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchContent } from "@/components/search/search-content";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
