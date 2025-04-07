"use client";

import { Product } from "../../../sanity.types";

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

export function ProductSpecsTable({ product }: { product: Product }) {
  // Simple specifications without variants
  // const simpleSpecs = [
  //   { label: "Screen Size", value: product.screenSize },
  //   { label: "Weight", value: product.weight },
  //   { label: "Battery Life", value: product.batteryLife },
  //   { label: "Operating System", value: product.operatingSystem },
  //   { label: "Manufacturer", value: product.manufacturer },
  //   // { label: "stock", value: product.stock },
  // ].filter((spec) => spec.value);

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
    <div className="container mx-auto py-8 flex-col justify-between">
      <div>
        {/* Variant Specifications */}

        <div className="space-y-2">
          {renderVariantOptions(CPU_TYPE_OPTIONS, product.cpuType, "Processor")}
          {renderVariantOptions(
            CPU_GEN_OPTIONS,
            product.cpuGeneration,
            "CPU Generation"
          )}
          {renderVariantOptions(RAM_OPTIONS, product.ramCapacity, "RAM")}
          {renderVariantOptions(STORAGE_OPTIONS, product.storage, "Storage")}
        </div>
      </div>
    </div>
  );
}
