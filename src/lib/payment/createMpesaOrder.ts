import { backendClient } from "@/sanity/lib/backendClient";
import { BasketItem } from "@/store/store";

interface MpesaOrderParams {
  orderNumber: string;
  clerkUserId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  mpesaPaymentDetails: string;
  paymentId: string;
  mpesaReceiptNumber: string;
  phoneNumber: string;
  products: BasketItem[];
  amount: number;
}

export async function createMpesaOrderInSanity({
  orderNumber,
  clerkUserId,
  customerName,
  customerPhone,
  customerEmail,
  mpesaPaymentDetails,
  paymentId,
  mpesaReceiptNumber,
  phoneNumber,
  products,
  amount,
}: MpesaOrderParams) {
  const sanityProducts = products.map((item) => ({
    _key: crypto.randomUUID(),
    product: item.product,
    quantity: item.quantity,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    clerkUserId,
    customerName,
    customerPhone,
    customerEmail,
    paymentMethod: "M-PESA",
    mpesaPaymentDetails: mpesaPaymentDetails,
    mpesaTrackingId: paymentId,
    mpesaReceiptNumber: mpesaReceiptNumber,
    phoneNumber: phoneNumber,
    products: sanityProducts,
    totalPrice: amount,
    amountDiscount: 0,
    currency: "kes",
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
