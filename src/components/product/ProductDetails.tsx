import React from "react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { Product } from "../../../sanity.types";

interface DetailsProseProps {
  details?: Product["details"]; // Array of detail blocks from Sanity
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
}

const DetailsProse: React.FC<DetailsProseProps> = ({
  details,
  fallbackText = "No Description Available",
  className = "text-xl text-gray-p00",
  containerClassName = "bg-gray-50 rounded",
}) => {
  // If no details or empty array, return fallback
  if (!details || details.length === 0) {
    return <p className={className}>{fallbackText}</p>;
  }

  // Option 1: Using PortableText to preserve exact formatting
  // This is the preferred method if your Sanity blocks contain formatting
  const components: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <div className="whitespace-pre-line">{children}</div>
      ),
    },
  };

  return (
    <div className={containerClassName}>
      <div className={className}>
        <PortableText value={details} components={components} />
      </div>
    </div>
  );
};

export default DetailsProse;
