import React from "react";
import { CreditCard, Phone } from "lucide-react";
import { getAllOrders } from "@/sanity/lib/queries/orders/getAllOrders";

interface PaymentDetailsProps {
  order: Awaited<ReturnType<typeof getAllOrders>>[0];
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  if (order.paymentMethod === "CARD") {
    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900">Card Payment Details</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Transaction ID:</span>{" "}
                <span className="font-mono">{order.stripePaymentIntentId}</span>
              </p>
              {order.stripeCustomerId && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Customer ID:</span>{" "}
                  <span className="font-mono">{order.stripeCustomerId}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (order.paymentMethod === "M-PESA") {
    return (
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-green-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-medium text-green-900">
              M-PESA Payment Details
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Receipt Number:</span>{" "}
                <span className="font-mono">{order.mpesaReceiptNumber}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone Number:</span>{" "}
                {order.phoneNumber}
              </p>
              {order.mpesaTrackingId && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tracking ID:</span>{" "}
                  <span className="font-mono">{order.mpesaTrackingId}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentDetails;
