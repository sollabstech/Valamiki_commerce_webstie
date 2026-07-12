"use client";

export type PriceBand = "all" | "under-100" | "100-300" | "300-500" | "above-500";

export const priceBands: { value: PriceBand; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under-100", label: "Under ₹100" },
  { value: "100-300", label: "₹100 – ₹300" },
  { value: "300-500", label: "₹300 – ₹500" },
  { value: "above-500", label: "Above ₹500" },
];

export function matchesPriceBand(price: number, band: PriceBand) {
  switch (band) {
    case "under-100":
      return price < 100;
    case "100-300":
      return price >= 100 && price <= 300;
    case "300-500":
      return price > 300 && price <= 500;
    case "above-500":
      return price > 500;
    default:
      return true;
  }
}

export function FilterPanel({
  priceBand,
  onPriceBandChange,
  inStockOnly,
  onInStockOnlyChange,
}: {
  priceBand: PriceBand;
  onPriceBandChange: (band: PriceBand) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-900">Price</h3>
        <div className="flex flex-col gap-2">
          {priceBands.map((band) => (
            <label key={band.value} className="flex items-center gap-2.5 text-sm text-ink-700">
              <input
                type="radio"
                name="price-band"
                checked={priceBand === band.value}
                onChange={() => onPriceBandChange(band.value)}
                className="size-4 accent-primary-700"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      <label className="flex items-center gap-2.5 text-sm text-ink-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          className="size-4 accent-primary-700"
        />
        In Stock Only
      </label>
    </div>
  );
}
