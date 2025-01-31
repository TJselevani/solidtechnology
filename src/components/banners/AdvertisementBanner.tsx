"use client";

import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import getAllAdvertisements from "@/sanity/lib/queries/banners/getProductAdverts";
import { formatPriceFromString } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AdvertisementBannerProps {
  advertisement: Awaited<ReturnType<typeof getAllAdvertisements>>[0];
}

// type pop = Awaited<ReturnType<typeof getAllAdvertisements>>[0];

// ✅ Extracted into a separate component so hooks can be used properly
const AdvertisementBanner = ({ advertisement }: AdvertisementBannerProps) => {
  const products = advertisement.products ?? [];
  const duration = advertisement.duration ?? 5;
  const active = advertisement.active ?? false;
  const title = advertisement.title ?? "Hot this week";

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
          {products.map((product, index) =>
            index === currentIndex ? (
              <motion.div
                key={product.product?._id}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute w-full flex flex-col items-center text-center"
              >
                {product.product?.image && (
                  <Image
                    src={imageUrl(product.product.image).url()}
                    alt={product.product.name || "Product Image"}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                )}
                <h3 className="mt-2 text-xl font-semibold">
                  {product.product?.name}
                </h3>
                <p className="text-lg text-gray-700">
                  ksh{" "}
                  {product.product?.price &&
                    formatPriceFromString(product.product.price.toFixed(2))}
                </p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
