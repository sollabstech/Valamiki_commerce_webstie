import { razorpayGateway } from "./razorpay";
import { codGateway } from "./cod";
import type { PaymentGateway, PaymentMethodType } from "./types";

// Add new gateways here (e.g. Stripe, PayU) by implementing PaymentGateway.
export const gateways: PaymentGateway[] = [razorpayGateway, codGateway];

export function getGatewayForMethod(method: PaymentMethodType): PaymentGateway | undefined {
  return gateways.find((g) => g.supportedMethods.includes(method));
}

export * from "./types";
