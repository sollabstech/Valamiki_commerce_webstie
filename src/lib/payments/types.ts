export type PaymentMethodType = "upi" | "card" | "netbanking" | "wallet" | "cod";

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  supportedMethods: PaymentMethodType[];
  initiate: (params: {
    amount: number;
    orderId: string;
    method: PaymentMethodType;
  }) => Promise<PaymentResult>;
}
