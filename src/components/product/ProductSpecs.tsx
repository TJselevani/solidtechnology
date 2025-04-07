"use client";

import { Product } from "../../../sanity.types";
import { formatPriceFromString } from "@/utils/formatPrice";
import { useState } from "react";
import AddToCart from "../basket/addToCart";
import WhatsAppChatButton from "../whatsapp/WhatsappChatButton";
import FeaturesProse from "./productFeatures";
import { CpuGen, CpuType } from "@/constants/types";
import { ProductSpecsTable } from "./productSpecsTable";

export interface CpuVariant {
  _key: string;
  cpuType: CpuType;
  cpuGeneration: CpuGen;
  price: number;
  stock: number;
}

// Option Constants
const STORAGE_OPTIONS = ["128", "256", "512", "1024", "2048"];
const RAM_OPTIONS = ["4", "8", "12", "16", "32"];

const CPU_GEN_OPTIONS: CpuGen[] = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

export function ProductSpecs({ product }: { product: Product }) {
  const [selectedCpuVariant, setSelectedCpuVariant] =
    useState<CpuVariant | null>(
      product.cpuVariants?.length
        ? (product.cpuVariants[0] as CpuVariant)
        : null
    );

  const currentCpuType = selectedCpuVariant?.cpuType || product.cpuType;
  const currentCpuGen =
    selectedCpuVariant?.cpuGeneration || product.cpuGeneration;
  const currentPrice = selectedCpuVariant?.price || product.price;
  const currentStock = selectedCpuVariant?.stock ?? product.stock ?? 0;

  const isOutOfStock = currentStock <= 0;

  const proseDetails = product.details;

  const simpleSpecs = [
    { label: "Screen Size", value: product.screenSize },
    { label: "Weight", value: product.weight },
    { label: "Battery Life", value: product.batteryLife },
    { label: "Operating System", value: product.operatingSystem },
    { label: "Manufacturer", value: "company" },
    { label: "Type", value: "Device" },
  ].filter((spec) => spec.value);

  const handleCpuVariantSelect = (cpuType?: CpuType, cpuGen?: CpuGen) => {
    const variant = product.cpuVariants?.find(
      (v): v is CpuVariant =>
        v.cpuType === cpuType && v.cpuGeneration === cpuGen
    );

    if (variant) setSelectedCpuVariant(variant);
  };

  const renderVariantOptions = (
    options: string[],
    currentValue: string | undefined,
    label: string,
    onSelect?: (option: string) => void
  ) => (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{label}:</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = currentValue === option;
          const isSelectable = !!onSelect;

          return (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onSelect?.(option)}
              disabled={!isSelectable}
            >
              {label === "Storage" || label === "RAM"
                ? `${option}GB`
                : label === "CPU Generation"
                  ? `Gen ${option}`
                  : option}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderCpuGenOptions = () => {
    if (!product.cpuVariants) {
      return renderVariantOptions(
        CPU_GEN_OPTIONS,
        currentCpuGen,
        "CPU Generation"
      );
    }

    const availableGens = product.cpuVariants
      .filter((v) => v.cpuType === currentCpuType)
      .map((v) => v.cpuGeneration);

    const filteredGenOptions = CPU_GEN_OPTIONS.filter((gen) =>
      availableGens.includes(gen)
    );

    return renderVariantOptions(
      filteredGenOptions,
      currentCpuGen,
      "CPU Generation",
      (gen) => handleCpuVariantSelect(currentCpuType, gen as CpuGen)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-col justify-between">
      <div>
        {/* Name and Price */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="text-3xl font-semibold mb-6">
          ksh {formatPriceFromString(currentPrice!.toFixed(2))}
        </div>

        {!product.features && !product.cpuVariants && (
          <ProductSpecsTable product={product} />
        )}

        {/* Prose Features */}
        {proseDetails && <FeaturesProse details={product.features} />}

        {/* Dynamic Variants */}
        {product.cpuVariants && (
          <div className="space-y-4">
            {/* CPU Type */}
            {renderVariantOptions(
              Array.from(
                new Set(product.cpuVariants?.map((v) => v.cpuType!) ?? [])
              ),
              currentCpuType,
              "Choose a CPU variation",
              (cpuType) => {
                const matchedVariant = product.cpuVariants?.find(
                  (v) => v.cpuType === cpuType
                );
                if (matchedVariant) {
                  handleCpuVariantSelect(
                    cpuType as CpuType,
                    matchedVariant.cpuGeneration
                  );
                }
              }
            )}

            {/* CPU Gen */}
            {renderCpuGenOptions()}

            {/* RAM and Storage */}
            {renderVariantOptions(RAM_OPTIONS, product.ramCapacity, "RAM")}
            {renderVariantOptions(STORAGE_OPTIONS, product.storage, "Storage")}
          </div>
        )}

        {/* Simple Specs */}
        <div className="mt-8">
          <h3 className="font-bold mb-4">Other Specifications:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simpleSpecs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-semibold">{spec.label}:</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp */}
        <div className="mt-8">
          <WhatsAppChatButton
            productName={product.name}
            productId={currentPrice?.toString() || ""}
          />
        </div>

        {/* Add to Cart */}
        <div className="mt-8">
          <AddToCart
            product={{
              ...product,
              price: currentPrice,
              stock: currentStock,
              cpuType: currentCpuType,
              cpuGeneration: currentCpuGen,
            }}
            disabled={isOutOfStock}
          />
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
