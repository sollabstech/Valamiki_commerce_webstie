import { Truck, ShieldCheck, RotateCcw, Headset, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: Truck, title: "Same-day delivery", sub: "Across Salem" },
  { icon: ShieldCheck, title: "100% genuine", sub: "Trusted brands" },
  { icon: RotateCcw, title: "Easy returns", sub: "7-day window" },
  { icon: Headset, title: "WhatsApp support", sub: "Quick replies" },
  { icon: Lock, title: "Secure checkout", sub: "Protected payments" },
];

export function TrustBar() {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-10">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-xl border border-border bg-surface/95 px-6 py-6 shadow-elevated backdrop-blur sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-500/12 text-secondary-600 ring-1 ring-secondary-500/20">
                <Icon className="size-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink-900">{title}</span>
                <span className="block text-xs text-ink-500">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
