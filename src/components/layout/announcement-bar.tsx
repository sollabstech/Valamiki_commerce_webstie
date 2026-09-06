import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: Truck, label: "Free delivery in Salem on orders over ₹499" },
  { icon: RotateCcw, label: "7-day easy returns" },
  { icon: ShieldCheck, label: "100% genuine products" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-gold-soft text-on-accent">
      <Container className="flex h-9 items-center justify-center gap-6 overflow-hidden">
        <ul className="flex items-center gap-6 whitespace-nowrap text-[11px] font-semibold tracking-wide sm:text-xs">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-3.5" strokeWidth={2.25} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ").slice(0, 3).join(" ")}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
