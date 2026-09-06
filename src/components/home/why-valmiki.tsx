import { Sparkles, IndianRupee, Clock, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const points = [
  {
    icon: Sparkles,
    title: "Hand-picked quality",
    body: "Every product on the shelf is one we'd buy for our own home.",
  },
  {
    icon: IndianRupee,
    title: "Honest pricing",
    body: "Fair, everyday prices — no inflated MRPs, no surprises at checkout.",
  },
  {
    icon: Clock,
    title: "Delivered same day",
    body: "Order by evening and get it the same day, right across Salem.",
  },
  {
    icon: HeartHandshake,
    title: "Local & personal",
    body: "A real shop with real people. Message us on WhatsApp any time.",
  },
];

export function WhyValmiki() {
  return (
    <div>
      <SectionHeading
        eyebrow="Why Valmiki"
        title="Everyday shopping, done right"
        subtitle="The neighbourhood store you trust — now a tap away."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface p-6 shadow-soft transition-colors hover:border-secondary-500/45"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary-500/12 text-secondary-500 ring-1 ring-secondary-500/25">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
