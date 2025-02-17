import { BasketIcon } from "@sanity/icons";
import { defineType, defineField, defineArrayMember } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: ["CARD", "M-PESA"],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Stripe Payment Fields (Only visible for CARD payments)
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "CARD",
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "CARD",
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "CARD",
    }),

    // Mpesa Payment Fields (Only visible for M-PESA payments)
    defineField({
      name: "mpesaPaymentDetails",
      title: "Mpesa Payment Details",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "M-PESA",
    }),
    defineField({
      name: "mpesaTrackingId",
      title: "Mpesa Tracking ID",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "M-PESA",
    }),
    defineField({
      name: "mpesaReceiptNumber",
      title: "Mpesa Receipt Number",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "M-PESA",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      hidden: ({ document }) => document?.paymentMethod !== "M-PESA",
    }),

    // Product Details
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Purchased",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity} ${select.currency}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),

    // Pricing Fields
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    // Order Status
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),

    // Order Date
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "customerEmail",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
