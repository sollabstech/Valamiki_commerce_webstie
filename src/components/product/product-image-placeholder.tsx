import { categories } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

const gradients: Record<string, string> = {
  grocery: "from-primary-50 to-primary-100",
  stationery: "from-secondary-100 to-secondary-200",
};

export function ProductImagePlaceholder({
  categoryId,
  className,
}: {
  categoryId: string;
  className?: string;
}) {
  const category = categories.find((c) => c.id === categoryId);
  const Icon = category?.icon ?? Package;
  const gradient = gradients[categoryId] ?? "from-primary-50 to-secondary-50";

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <Icon className="size-10 text-primary-700/50" strokeWidth={1.5} />
    </div>
  );
}
