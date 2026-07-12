import type { PaymentGateway } from "./types";

export const codGateway: PaymentGateway = {
  id: "cod",
  name: "Cash on Delivery",
  supportedMethods: ["cod"],
  async initiate() {
    return { success: true };
  },
};
