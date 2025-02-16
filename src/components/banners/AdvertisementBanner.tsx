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
    <div className="relative mt-4 w-full max-w-4xl mx-auto">
      <div className="glass bg-white rounded-lg shadow-lg p-4 sm:p-6 mx-4 sm:mx-6 lg:mx-auto">
        {/* Banner Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">
          {title}
        </h2>

        {/* Animated Product Display */}
        <div className="relative w-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {products.map((product, index) =>
              index === currentIndex ? (
                <motion.div
                  key={product.product?._id}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute w-full flex flex-col items-center text-center px-4"
                >
                  <div className="relative w-full aspect-[4/3] max-w-md">
                    {product.product?.image && (
                      <Image
                        src={imageUrl(product.product.image).url()}
                        alt={product.product.name || "Product Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain rounded-lg"
                        priority
                      />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold line-clamp-2">
                    {product.product?.name}
                  </h3>
                  <p className="mt-2 text-base sm:text-lg text-gray-700">
                    ksh{" "}
                    {product.product?.price &&
                      formatPriceFromString(product.product.price.toFixed(2))}
                  </p>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-500 w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
