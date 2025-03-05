"use client";

import React from "react";
import { WHATSAPP_NUMBER } from "@/constants/constants";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppChatButtonProps {
  productName?: string;
  productId?: string;
  buttonText?: string;
  className?: string;
  iconSize?: number;
}

const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  productName = "",
  productId = "",
  buttonText = "Chat on WhatsApp",
  className = "",
  iconSize = 24,
}) => {
  const generateMessage = () => {
    if (productName && productId) {
      return encodeURIComponent(
        `Hello, I'm interested in ordering the product: ${productName} (ID: ${productId})`
      );
    } else if (productName) {
      return encodeURIComponent(
        `Hello, I'm interested in ordering the product: ${productName}`
      );
    }
    return encodeURIComponent("Hello, I'm interested in your products");
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateMessage()}`;

  const handleClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded transition-colors ${className}`}
    >
      <FaWhatsapp color="green" size={iconSize} />
      <span className="font-medium">{buttonText}</span>
    </button>
  );
};

export default WhatsAppChatButton;
