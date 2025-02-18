"use client";
import useBasketStore from "@/store/store";
import { Product } from "../../../sanity.types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, ShoppingCart } from "lucide-react"; // Using Lucide icons

interface AddToCartProps {
  product: Product;
  disabled: boolean;
}

export default function AddToCart({ product, disabled }: AddToCartProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [itemCount, setItemCount] = useState(getItemCount(product._id));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateCount = () => setItemCount(getItemCount(product._id));
    const unsubscribe = useBasketStore.subscribe(updateCount);
    return () => unsubscribe();
  }, [product._id, getItemCount]);

  if (!isClient) return null;

  return (
    <div className="flex items-center">
      {/* Minus Button (Separate but Connected) */}
      <Button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`w-10 h-10 rounded-full border-r bg-gray-300 
          ${itemCount === 0 ? "cursor-not-allowed text-gray-500" : "hover:bg-gray-400"}`}
      >
        <Minus size={18} />
      </Button>

      {/* Add to Cart Button */}

      <Button
        onClick={() => addItem(product)}
        disabled={disabled}
        className={`flex-1 h-10 px-6 rounded-full bg-blue-600 text-white flex items-center justify-center 
        ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"}`}
      >
        <ShoppingCart size={18} className="mr-2" />
        {itemCount !== 0 ? `Added ${itemCount} to Cart` : "Add To Cart"}
      </Button>
    </div>
  );
}
