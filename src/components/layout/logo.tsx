import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="Valmiki"
        width={40}
        height={40}
        className="h-9 w-9 object-contain sm:h-10 sm:w-10"
        priority
      />
      <span className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
        VALMIKI
      </span>
    </Link>
  );
}
