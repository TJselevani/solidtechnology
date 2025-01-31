"use client";

import React, { useEffect, useState } from "react";
import { Advertisement } from "../../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatPriceFromString } from "@/utils/formatPrice";

interface Props {
  advertisement: Advertisement;
}

const AdvertisementBanner = ({ advertisement }: Props) => {
  const { products = [], duration = 5, active = false, title } = advertisement;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!active || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [active, products.length, duration]);

  if (!active || products.length === 0) return null;

  return (
    <div className="relative mt-4 glass w-full max-w-4xl mx-auto overflow-hidden bg-white p-6 rounded-lg shadow-lg">
      {/* Banner Title */}
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

      {/* Animated Product Display */}
      <div className="relative w-full h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {products.map((product, index: number) =>
            index === currentIndex ? (
              <motion.div
                key={product._ref}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute w-full flex flex-col items-center text-center"
              >
                {product.image?.asset?._ref && (
                  <Image
                    src={imageUrl(product.image.asset._ref).url()}
                    alt={product.name || "Product Image"}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg" // shadow-lg
                  />
                )}
                <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
                <p className="text-lg text-gray-700">ksh{" "}
                          {product.price && formatPriceFromString(product.price?.toFixed(2))}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
