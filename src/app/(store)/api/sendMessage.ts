import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { phoneNumber, message } = await req.json();

    // Set up WhatsApp Cloud API URL and headers
    const url = `https://graph.facebook.com/v16.0/${process.env.PHONE_NUMBER_ID}/messages`;
    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Prepare the data payload
    const data = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "text",
      text: { body: message },
    };

    // Send the message using axios
    const response = await axios.post(url, data, { headers });

    // Return success response
    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return NextResponse.json(
      { success: false, error: error || "Failed to send message" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import whatsappAPI from "nextjs-whatsapp-cloud-api";

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the JSON body from the request
//     const { phoneNumber, message } = await req.json();

//     // Validate input data
//     if (!phoneNumber || !message) {
//       return NextResponse.json(
//         { error: "Phone number and message are required." },
//         { status: 400 }
//       );
//     }

//     // Send the message using WhatsApp Cloud API
//     const response = await whatsappAPI.sendMessage({
//       phone: phoneNumber,
//       message,
//     });

//     // Return a successful response
//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error("Error sending WhatsApp message:", error);

//     // Return an error response
//     return NextResponse.json(
//       { error: error || "Failed to send message." },
//       { status: 500 }
//     );
//   }
// }
