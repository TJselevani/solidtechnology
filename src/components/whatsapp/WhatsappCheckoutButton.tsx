"use client";

import React from "react";
import { WHATSAPP_NUMBER } from "@/constants/constants";
import { FaWhatsapp } from "react-icons/fa";
import { BasketItem } from "@/store/store";
import { formatPriceFromString } from "@/utils/formatPrice";

export const generateWhatsappMessage = (items: BasketItem[]): string => {
  const lines = items.map((item) => {
    const name = item.product.name ?? "Unnamed Product";
    const quantity = item.quantity;
    const unitPrice = item.product.price ?? 0;
    const total = unitPrice * quantity;

    return `🛒 *${name}*\nQty: ${quantity} @ Ksh ${formatPriceFromString(unitPrice.toFixed(2))} each = Ksh ${formatPriceFromString(total.toFixed(2))}`;
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  return [
    "*New Order 🧾*",
    "",
    ...lines,
    "",
    `🧮 *Total: Ksh ${formatPriceFromString(totalAmount.toFixed(2))}*`,
    "",
    "I have confirmed my order. ✅",
  ].join("\n");
};

interface WhatsAppChekoutButtonProps {
  products: BasketItem[];
}

const WhatsAppCheckoutButton = ({ products }: WhatsAppChekoutButtonProps) => {
  const handleClick = () => {
    const phone = WHATSAPP_NUMBER; // Your business WhatsApp number without '+' (e.g., Kenya)
    const message = generateWhatsappMessage(products);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#25D366] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-colors"
    >
      <FaWhatsapp className="w-5 h-5" />
      Checkout via WhatsApp
    </button>
  );
};

export default WhatsAppCheckoutButton;
