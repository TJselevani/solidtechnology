import { createMpesaOrderInSanity } from "@/lib/payment/createMpesaOrder";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
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
    } = await req.json();

    if (!amount || !orderNumber || !customerPhone || !paymentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const response = await axios.post(
        "https://api.intasend.com/payments",
        {
          amount,
          currency: "KES",
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.INTA_SEND_PRIVATE_KEY}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }

    // Create order in Sanity
    const order = await createMpesaOrderInSanity({
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
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
