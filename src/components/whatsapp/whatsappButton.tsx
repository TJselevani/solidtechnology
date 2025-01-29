import React from "react";

interface WhatsAppButtonProps {
  productName: string;
  productPrice: string;
  phoneNumber: string; // Recipient's phone number
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  productPrice,
  phoneNumber,
}) => {
  const handleBuyClick = async () => {
    const message = `I want to buy ${productName} for Ksh ${productPrice}`;

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <button
      onClick={handleBuyClick}
      className="bg-green-500 text-white font-bold py-2 px-4 rounded"
    >
      Buy
    </button>
  );
};

export default WhatsAppButton;
