"use client";

import React, { useEffect, useState } from "react";
import { Advertisement } from "../../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  advertisement: Advertisement;
}

interface ProductProps {
  _id: string;
  name: string;
  price: number;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
  };
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
    <div className="relative glass w-full max-w-4xl mx-auto overflow-hidden bg-grxy-100 p-6 rounded-lg shadow-lg">
      {/* Banner Title */}
      <h2 className="text-2xl -z font-bold text-center mb-4">{title}</h2>

      {/* Animated Product Display */}
      <div className="relative w-full h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {products.map((product: ProductProps, index: number) =>
            index === currentIndex ? (
              <motion.div
                key={product._id}
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
                    height={400}
                    className="object-cover rounded-lg "
                  />
                )}
                <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
                <p className="text-lg text-gray-700">${product.price}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
