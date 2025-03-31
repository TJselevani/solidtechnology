"use client";

import { Product } from "../../../sanity.types";
import { formatPriceFromString } from "@/utils/formatPrice";
import { useState } from "react";
import AddToCart from "../basket/addToCart";
import WhatsAppChatButton from "../whatsapp/WhatsappChatButton";
import DescriptionProse from "../product/productDescription";

export function AccessorySpecs({ product }: { product: Product }) {
  const [isOutOfStock] = useState(product.stock != null && product.stock <= 0);

  // Simple specifications without variants
  const simpleSpecs = [
    { label: "Screen Size", value: product.screenSize },
    { label: "Weight", value: product.weight },
    { label: "Battery Life", value: product.batteryLife },
    { label: "Operating System", value: product.operatingSystem },
    { label: "Manufacturer", value: "Company" },
    { label: "Type", value: "Device" },
  ].filter((spec) => spec.value); // Only show specs that have values

  let proseDetails = product.details;

  if (!proseDetails) proseDetails = product.description;

  return (
    <div className="container mx-auto px-4 py-8 flex-col justify-between">
      <div>
        {/* Product Name and Price */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="text-3xl font-semibold mb-6">
          ksh {formatPriceFromString(product.price!.toFixed(2))}
        </div>

        {proseDetails && <DescriptionProse details={product.description} />}

        {/* Simple Specifications */}
        <div className="mt-8">
          <h3 className="font-bold mb-4">Other Specifications:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simpleSpecs.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <span className="font-semibold">{spec.label}:</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <WhatsAppChatButton
            productName={product.name}
            productId={product.price?.toString()}
          />
        </div>

        {/* Add to Basket */}
        <div className="mt-8">
          <AddToCart product={product} disabled={isOutOfStock} />
          {isOutOfStock && (
            <p className="text-red-500 mt-2">
              This product is currently out of stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
