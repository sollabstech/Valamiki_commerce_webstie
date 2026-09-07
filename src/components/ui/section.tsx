import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/** A full-bleed page band. tone="dark" flips the palette + adds the grid glow. */
export function Section({
  tone = "cream",
  className,
  containerClassName,
  children,
}: {
  tone?: "cream" | "dark" | "surface";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "py-14 sm:py-20",
        tone === "dark" && "section-dark",
        tone === "surface" && "bg-cream-100",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
