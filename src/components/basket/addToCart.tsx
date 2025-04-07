"use client";
import useBasketStore from "@/store/store";
import { Accessory, Product } from "../../../sanity.types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, ShoppingCart } from "lucide-react"; // Using Lucide icons

interface AddToCartProps {
  product: Product | Accessory;
  disabled: boolean;
}

export default function AddToCart({ product, disabled }: AddToCartProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [itemCount, setItemCount] = useState(getItemCount(product));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateCount = () => setItemCount(getItemCount(product));
    const unsubscribe = useBasketStore.subscribe(updateCount);
    return () => unsubscribe();
  }, [product, getItemCount]);

  if (!isClient) return null;

  return (
    <div className="flex items-center">
      {/* Minus Button (Separate but Connected) */}
      <Button
        onClick={() => removeItem(product)}
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
        className={`flex-1 h-10 px-6 rounded-full bg-primary text-white flex items-center justify-center 
        ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-primary/90"}`}
      >
        <ShoppingCart size={18} className="mr-2" />
        {itemCount !== 0 ? `Added ${itemCount} to Cart` : "Add To Cart"}
      </Button>
    </div>
  );
}
