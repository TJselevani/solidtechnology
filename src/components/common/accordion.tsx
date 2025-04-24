"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-xl mt-4 mb-4 shadow-sm bg-white dark:bg-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-semibold"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-gray-700 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}
