import { WHATSAPP_NUMBER } from "@/constants/constants";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappIcon = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const handleClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div onClick={handleClick}>
      <FaWhatsapp color="green" size={30} />
    </div>
  );
};

export default WhatsappIcon;
