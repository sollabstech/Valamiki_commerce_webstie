"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { mockFaqs } from "@/lib/mock-data";

export function FaqSection() {
  return (
    <section id="faq">
      <SectionHeading title="Frequently asked questions" />
      <Accordion.Root type="single" collapsible className="space-y-2.5">
        {mockFaqs.map((faq, i) => (
          <Accordion.Item
            key={faq.q}
            value={`item-${i}`}
            className="overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-border"
          >
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-ink-900 sm:text-base">
              {faq.q}
              <ChevronDown className="size-4.5 shrink-0 text-ink-500 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden text-sm text-ink-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <p className="px-4 pb-4">{faq.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
