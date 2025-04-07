import { Accessory, Product } from "../../sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper to generate a unique key only for products
export const getBasketItemKey = (item: Product | Accessory): string => {
  if ("cpuType" in item && "cpuGeneration" in item) {
    return `${item._id}-${item.cpuType ?? ""}-${item.cpuGeneration ?? ""}`;
  }
  return item._id;
};

export interface BasketItem {
  product: Product | Accessory;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product | Accessory) => void;
  removeItem: (product: Product | Accessory) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (product: Product | Accessory) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const key = getBasketItemKey(product);

          const existsingItem = state.items.find(
            (item) => getBasketItemKey(item.product) === key
          );

          if (existsingItem) {
            return {
              items: state.items.map((item) =>
                getBasketItemKey(item.product) === key
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),

      removeItem: (product) =>
        set((state) => {
          const key = getBasketItemKey(product);

          return {
            items: state.items.reduce((acc, item) => {
              if (getBasketItemKey(item.product) === key) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [] as BasketItem[]),
          };
        }),

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      getItemCount: (product) => {
        const key = getBasketItemKey(product);
        const item = get().items.find(
          (item) => getBasketItemKey(item.product) === key
        );
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    { name: "basket-store" }
  )
);

export default useBasketStore;
