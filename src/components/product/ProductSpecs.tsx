"use client";

import { Product } from "../../../sanity.types";
import { formatPriceFromString } from "@/utils/formatPrice";
import { useState } from "react";
import AddToCart from "../basket/addToCart";
import WhatsAppChatButton from "../whatsapp/WhatsappChatButton";
import DescriptionProse from "./productDescription";

// Define variant options
const STORAGE_OPTIONS = ["128", "256", "512", "1024", "2048"];
const RAM_OPTIONS = ["4", "8", "12", "16", "32"];
const CPU_TYPE_OPTIONS = [
  "Pentium",
  "celeron",
  "core i3",
  "core i5",
  "core i7",
  "core i9",
];
const CPU_GEN_OPTIONS = ["3", "4", "5", "6", "7", "8", "10", "11", "12", "13"];

export function ProductSpecs({ product }: { product: Product }) {
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

  const proseDetails = product.details;

  // Render variant option buttons
  const renderVariantOptions = (
    options: string[],
    currentValue: string | undefined,
    label: string
  ) => (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{label}:</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div
            key={option}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentValue === option
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {label === "Storage"
              ? `${option}GB`
              : label === "RAM"
                ? `${option}GB`
                : label === "CPU Generation"
                  ? `Gen ${option}`
                  : option}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 flex-col justify-between">
      <div>
        {/* Product Name and Price */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="text-3xl font-semibold mb-6">
          ksh {formatPriceFromString(product.price!.toFixed(2))}
        </div>

        {proseDetails && <DescriptionProse details={product.description} />}

        {/* Variant Specifications */}
        {!proseDetails && (
          <div className="space-y-2">
            {renderVariantOptions(
              CPU_TYPE_OPTIONS,
              product.cpuType,
              "Processor"
            )}
            {renderVariantOptions(
              CPU_GEN_OPTIONS,
              product.cpuGeneration,
              "CPU Generation"
            )}
            {renderVariantOptions(RAM_OPTIONS, product.ramCapacity, "RAM")}
            {renderVariantOptions(STORAGE_OPTIONS, product.storage, "Storage")}
          </div>
        )}

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
