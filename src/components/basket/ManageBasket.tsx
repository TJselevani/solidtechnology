"use client";
import useBasketStore from "@/store/store";
import { Accessory, Product } from "../../../sanity.types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface ManageBasketButtonProps {
  product: Product | Accessory;
  disabled: boolean;
}

export default function ManageBasketButton({
  product,
  disabled,
}: ManageBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [itemCount, setItemCount] = useState(getItemCount(product));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Update item count whenever it changes in the store
    const updateCount = () => setItemCount(getItemCount(product));
    // Assuming you have a way to subscribe to store changes
    const unsubscribe = useBasketStore.subscribe(updateCount);

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [product, getItemCount]);

  if (!isClient) {
    return null; // Return null instead of undefined
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => removeItem(product)}
        disabled={itemCount === 0 || disabled}
        // className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          {" "}
          -{" "}
        </span>
      </Button>

      <span className="w-8 text-center font-semibold">{itemCount}</span>

      <Button
        onClick={() => addItem(product)}
        disabled={disabled}
        // className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        <span
          className={`text-xl font-bold ${disabled ? "text-gray-400" : "text-gray-600"}`}
        >
          {" "}
          +{" "}
        </span>
      </Button>
    </div>
  );
}
