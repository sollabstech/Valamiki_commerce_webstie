export type Coupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrderValue?: number;
  description: string;
};

export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percent", value: 10, description: "10% off on your first order" },
  { code: "FLAT50", type: "flat", value: 50, minOrderValue: 300, description: "₹50 off on orders above ₹300" },
  { code: "SAVE100", type: "flat", value: 100, minOrderValue: 800, description: "₹100 off on orders above ₹800" },
];

export function findCoupon(code: string) {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}

export function calculateDiscount(coupon: Coupon, subtotal: number) {
  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) return 0;
  if (coupon.type === "percent") return Math.round((subtotal * coupon.value) / 100);
  return Math.min(coupon.value, subtotal);
}

export const GIFT_WRAP_FEE = 25;
export const FREE_DELIVERY_THRESHOLD = 500;
export const DELIVERY_FEE = 40;
