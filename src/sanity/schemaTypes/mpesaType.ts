import { defineField, defineType } from "sanity";
import { PresentationIcon } from "@sanity/icons";

export const mpesaPaymentType = defineType({
  name: "mpesaPayment",
  title: "Mpesa Payment Details",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "receiptNumber",
      title: "Mpesa Receipt Number",
      type: "string",
    }),
    defineField({
      name: "trackingId",
      title: "Tracking ID",
      type: "string",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "paymentTimestamp",
      title: "Payment Timestamp",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      receipt: "receiptNumber",
      phone: "phoneNumber",
      timestamp: "paymentTimestamp",
    },
    prepare(selection) {
      const { receipt, phone, timestamp } = selection;
      return {
        title: `Receipt: ${receipt || "No Receipt"}`,
        subtitle: `Phone: ${phone || "Unknown"} - ${timestamp ? new Date(timestamp).toLocaleDateString() : "No Date"}`,
      };
    },
  },
});
