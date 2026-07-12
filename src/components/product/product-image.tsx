import Image from "next/image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt,
  categoryId,
  className,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  categoryId: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return <ProductImagePlaceholder categoryId={categoryId} className={className} />;
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 46vw"}
        className="object-cover"
      />
    </div>
  );
}
