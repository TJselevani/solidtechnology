"use server";

import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  phoneNumber: string;
  deliveryAddress?: {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

// Define IntaSend API response types
type IntaSendPaymentStatus = "COMPLETE" | "FAILED" | "PENDING";

interface IntaSendPaymentResponse {
  invoice_id: string;
  tracking_id: string;
  payment_status: IntaSendPaymentStatus;
  payment_method: "M-PESA";
  receiver_details: {
    phone_number: string;
    email: string;
    name: string;
  };
  amount: {
    currency: string;
    amount: number;
  };
  timestamp: string;
}

// Configuration type
interface MpesaConfig {
  publicKey: string;
  secretKey: string;
  environment: "sandbox" | "live";
  callbackUrl: string;
}

export async function createMpesaCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Validate items have prices
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price! * item.quantity,
      0
    );

    // Get base URL for callbacks
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL;

    // Configure IntaSend
    const config: MpesaConfig = {
      publicKey: process.env.INTASEND_PUBLIC_KEY!,
      secretKey: process.env.INTASEND_SECRET_KEY!,
      environment: isProduction ? "live" : "sandbox",
      callbackUrl: `${baseUrl}/api/webhook/payments/mpesa`,
    };

    // Prepare payment request payload
    const paymentPayload = {
      currency: "KES",
      amount: totalAmount,
      payment_method: "M-PESA",
      phone_number: metadata.phoneNumber,
      email: metadata.customerEmail,
      customer: {
        first_name: metadata.customerName.split(" ")[0],
        last_name: metadata.customerName.split(" ").slice(1).join(" "),
        email: metadata.customerEmail,
        phone_number: metadata.phoneNumber,
      },
      merchant_reference: metadata.orderNumber,
      callback_url: config.callbackUrl,
      metadata: {
        order_number: metadata.orderNumber,
        clerk_user_id: metadata.clerkUserId,
        items: items.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        delivery_address: metadata.deliveryAddress,
      },
    };

    // Make request to IntaSend API
    const response = await fetch(
      "https://sandbox.intasend.com/api/v1/payments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.secretKey}`,
          "X-API-Key": config.publicKey,
        },
        body: JSON.stringify(paymentPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Payment initiation failed: ${errorData.message}`);
    }

    const paymentResponse: IntaSendPaymentResponse = await response.json();

    return {
      trackingId: paymentResponse.tracking_id,
      status: paymentResponse.payment_status,
      orderNumber: metadata.orderNumber,
    };
  } catch (error) {
    console.error("Mpesa payment creation failed:", error);
    throw error;
  }
}
