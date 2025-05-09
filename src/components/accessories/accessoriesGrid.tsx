"use client";

import { Accessory } from "../../../sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import AccessoriesThumb from "./accessoriesThumb";

const AccessoriesGrid = ({ accessories }: { accessories: Accessory[] }) => {
  if (!accessories?.length) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-2">
        <AnimatePresence>
          {accessories.map((accessory) => (
            <motion.div
              key={accessory._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <div className="w-full max-w-[420px]">
                <AccessoriesThumb accessory={accessory} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccessoriesGrid;
