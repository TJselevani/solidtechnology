import { Metadata } from "@/actions/createStripeCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";
import stripe from "./stripe";

export async function createStripeOrderInSanity(
  session: Stripe.Checkout.Session
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    clerkUserId: clerkUserId,
    customerName,
    customerEmail: customerEmail,
    paymentMethod: "CARD",
    stripeCustomerId: customer,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    amountDiscount: total_details?.amount_discount
      ? total_details?.amount_discount / 100
      : 0,
    currency,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
