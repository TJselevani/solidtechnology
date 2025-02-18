"use client"; // Ensure this runs only on the client side

import "intasend-inlinejs-sdk";
import React from "react";
import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BasketItem } from "@/store/store";

// declare global {
//   interface Window {
//     IntaSend?;
//   }
// }

interface MpesaPaymentParams {
  orderNumber: string;
  clerkUserId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: BasketItem[];
  amount: number;
  onClose?: () => void;
}

const MpesaPayment = ({
  orderNumber,
  // clerkUserId,
  // customerName,
  customerPhone,
  // customerEmail,
  // products,
  amount,
}: MpesaPaymentParams) => {
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.IntaSend) {
  //     const intasend = new window.IntaSend({
  //       publicAPIKey: "ISPubKey_test_f3c529f7-96cb-4d8c-aa1f-d7fb50a9a8f3",
  //       live: false,
  //     });

  //     intasend
  //       .on("COMPLETE", async (response) => {
  //         console.log("COMPLETE:", response);

  //         // Extract transaction details
  //         const {
  //           transaction_id: paymentId,
  //           receipt_number: mpesaReceiptNumber,
  //           phone_number: phoneNumber,
  //           ...mpesaPaymentDetails
  //         } = response.data || response.transaction || {}; // Adjust based on response format

  //         try {
  //           const apiResponse = await fetch("/api/webhook/payments/mpesa", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({
  //               orderNumber,
  //               clerkUserId,
  //               customerName,
  //               customerPhone,
  //               customerEmail,
  //               mpesaPaymentDetails,
  //               paymentId,
  //               mpesaReceiptNumber,
  //               phoneNumber,
  //               products,
  //               amount,
  //             }),
  //           });

  //           // Determine the base URL based on the environment
  //           const isProduction = process.env.NODE_ENV === "production";
  //           const baseUrl = isProduction
  //             ? `https://${process.env.VERCEL_URL}`
  //             : process.env.NEXT_PUBLIC_BASE_URL;
  //           const successUrl = `${baseUrl}/success?session_id={checkout_session_Id}&orderNumber=${orderNumber}`;

  //           if (apiResponse.ok) {
  //             console.log("Payment recorded successfully.");
  //             onClose?.();
  //             window.location.href = successUrl;
  //           } else {
  //             console.error("Payment recording failed.");
  //           }
  //         } catch (error) {
  //           console.error("Error processing payment:", error);
  //         }
  //       })
  //       .on("FAILED", (response) => {
  //         console.log("FAILED", response);
  //       })
  //       .on("IN-PROGRESS", () => {
  //         console.log("IN PROGRESS...");
  //       });
  //   }
  // }, [
  //   orderNumber,
  //   clerkUserId,
  //   customerName,
  //   customerPhone,
  //   customerEmail,
  //   products,
  //   amount,
  //   onClose,
  // ]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold">Pay with M-Pesa</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{customerPhone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-lg text-green-600">
                KES {Number(amount).toLocaleString()}
              </span>
            </div>
          </div>

          <div
            className={`intaSendPayButton w-full bg-green-600 text-white py-3 px-4 rounded-lg
                      font-medium hover:bg-green-700 focus:ring-2 focus:ring-offset-2
                      focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed
                      transition-colors duration-200 flex items-center justify-center gap-2`}
            data-amount={amount}
            data-currency="KES"
          >
            <span>Pay with M-Pesa</span>
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p className="font-medium">Payment Instructions:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Click the payment button above</li>
              <li>Enter your M-Pesa phone number when prompted</li>
              <li>Watch for an M-Pesa prompt on your phone</li>
              <li>Enter your M-Pesa PIN to complete payment</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MpesaPayment;
