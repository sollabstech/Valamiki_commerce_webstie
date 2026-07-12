import type { PaymentGateway } from "./types";

/**
 * Razorpay integration point. Once NEXT_PUBLIC_RAZORPAY_KEY_ID and a server
 * order-creation endpoint exist, replace the body of `initiate` with a real
 * Razorpay Checkout call (loading checkout.js and opening `new Razorpay(...)`).
 * Every other part of checkout only depends on the PaymentGateway interface,
 * so no other code needs to change when this goes live.
 */
export const razorpayGateway: PaymentGateway = {
  id: "razorpay",
  name: "Razorpay",
  supportedMethods: ["upi", "card", "netbanking", "wallet"],
  async initiate({ orderId, method }) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { success: true, transactionId: `demo_${method}_${orderId}` };
  },
};
