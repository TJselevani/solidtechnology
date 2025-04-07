"use client";

import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Accessory, Product } from "../../../sanity.types";

interface GalleryParam {
  product: Product | Accessory;
}

const Gallery = ({ product }: GalleryParam) => {
  // Initialize with all images (main image + gallery images)
  const allImages = [product.image, ...(product.galleryImages || [])].filter(
    Boolean
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOutOfStock] = useState(product.stock != null && product.stock <= 0);

  // No need for separate mainImage state as we can derive it from currentImageIndex
  const currentImage = allImages[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : allImages.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < allImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Only show navigation if there are multiple images
  const showNavigation = allImages.length > 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        {/* Main Image Display */}
        <div className="relative aspect-square overflow-hidden bg-white rounded-lg shadow-lg">
          {currentImage && (
            <Image
              src={imageUrl(currentImage).url()}
              alt={product.name ?? "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              style={{ objectFit: "contain" }}
              className={`transition-transform duration-300 hover:scale-105 ${
                isOutOfStock ? "opacity-50" : ""
              }`}
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Carousel Navigation */}
        {showNavigation && (
          <div className="flex justify-between mt-2">
            <button
              onClick={handlePrevImage}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Thumbnail Images */}
        {showNavigation && (
          <div className="mt-4 flex gap-2 overflow-x-auto p-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 h-20 rounded-lg shadow-md cursor-pointer 
                  transition-all duration-200 hover:opacity-75
                  ${currentImageIndex === index ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={imageUrl(image!).url()}
                  alt={product.name ?? `Gallery Image ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
