import React from "react";
import { Product } from "../../../sanity.types";

interface ChildBlock {
  text: string;
}

interface Block {
  _type: string;
  children?: ChildBlock[];
}

interface DetailsProseProps {
  details?: Product["details"]; // Array of detail blocks from Sanity
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
}

const DescriptionProse: React.FC<DetailsProseProps> = ({
  details,
  fallbackText = "No Description Available",
  className = "text-xl text-gray-900",
  containerClassName = "bg-gray-50 rounded p-4",
}) => {
  // If no details or empty array, return fallback
  if (!details || details.length === 0) {
    return <p className={className}>{fallbackText}</p>;
  }

  // Extract text from blocks
  const getBlockText = (block: Block): string => {
    if (block._type === "block" && block.children) {
      return block.children.map((child) => child.text).join(" ") || "";
    }
    return "";
  };

  // Get all specifications as an array of strings
  const specifications = details
    .map((block) => getBlockText(block as Block)) // Ensure type safety
    .filter((text) => text.trim().length > 0);

  return (
    <div className={containerClassName}>
      <h2 className="px-4 py-4 font-semibold text-lg">Device Specifications</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {specifications.map((spec, index) => (
          <li key={index} className={className}>
            {spec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DescriptionProse;

// **************************************************************************************************************

// import React from "react";

// interface DetailsProseProps {
//   details?; // Array of detail blocks from Sanity
//   fallbackText?: string;
//   className?: string;
//   containerClassName?: string;
// }

// const DetailsProse: React.FC<DetailsProseProps> = ({
//   details,
//   fallbackText = "No Description Available",
//   className = "text-xl text-gray-200",
//   containerClassName = "bg-primary p-4 rounded",
// }) => {
//   // If no details or empty array, return fallback
//   if (!details || details.length === 0) {
//     return <p className={className}>{fallbackText}</p>;
//   }

//   // Extract text from blocks
//   const getBlockText = (block) => {
//     if (block._type === "block") {
//       return block.children?.map((child) => child.text).join(" ") || " ";
//     }
//     return "";
//   };

//   // Get all specifications as an array of strings
//   const specifications = details
//     .map((block) => getBlockText(block))
//     .filter((text) => text.trim().length > 0);

//   return (
//     <div className={containerClassName}>
//       <ul className="list-none space-y-2">
//         {specifications.map((spec, index) => (
//           <li key={index} className={`flex items-start ${className}`}>
//             <span className="text-gray-400 mr-2">•</span>
//             <span>{spec}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DetailsProse;

// **************************************************************************************************************

// import React from "react";
// import { PortableText } from "@portabletext/react";

// interface DetailsProseProps {
//   details?: any[]; // Array of detail blocks from Sanity
//   fallbackText?: string;
//   className?: string;
//   columnClassName?: string;
// }

// const DetailsProse: React.FC<DetailsProseProps> = ({
//   details,
//   fallbackText = "No Description Available",
//   className = "w-full text-sm text-gray-700",
//   columnClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
// }) => {
//   // If no details or empty array, return fallback
//   if (!details || details.length === 0) {
//     return <p className={className}>{fallbackText}</p>;
//   }

//   // Function to extract text from a block
//   const getBlockText = (block) => {
//     if (block._type === "block") {
//       return block.children?.map((child) => child.text).join("") || "";
//     }
//     return "";
//   };

//   // Group specifications into categories if possible
//   const createSpecGroups = () => {
//     const specs = details
//       .map((block) => getBlockText(block))
//       .filter((text) => text.trim().length > 0);

//     // If there are fewer than 4 items, no need for advanced grouping
//     if (specs.length < 4) {
//       return [specs];
//     }

//     // Create balanced columns
//     const columns = [];
//     const itemsPerColumn = Math.ceil(specs.length / 3); // For 3 columns at most

//     for (let i = 0; i < specs.length; i += itemsPerColumn) {
//       columns.push(specs.slice(i, i + itemsPerColumn));
//     }

//     return columns;
//   };

//   const specGroups = createSpecGroups();

//   return (
//     <div className={className}>
//       {/* For smaller screens, stack everything */}
//       <div className={columnClassName}>
//         {specGroups.map((group, groupIndex) => (
//           <div key={`group-${groupIndex}`} className="flex flex-col">
//             {group.map((spec, specIndex) => (
//               <div
//                 key={`spec-${groupIndex}-${specIndex}`}
//                 className="mb-2 pb-2 border-b border-gray-100 last:border-0"
//               >
//                 {spec}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // If you prefer to use PortableText instead of the text extraction
//   // return (
//   //   <div className={className}>
//   //     <div className={columnClassName}>
//   //       {/* You would need more complex logic to group PortableText elements */}
//   //       <PortableText value={details} />
//   //     </div>
//   //   </div>
//   // );
// };

// export default DetailsProse;

// **************************************************************************************************************

// import React from "react";
// import { PortableText, PortableTextReactComponents } from "@portabletext/react";
// import { Product } from "../../../sanity.types";

// interface DetailsProseProps {
//   details?: Product["details"]; // Array of detail blocks from Sanity
//   fallbackText?: string;
//   className?: string;
//   containerClassName?: string;
// }

// const DetailsProse: React.FC<DetailsProseProps> = ({
//   details,
//   fallbackText = "No Description Available",
//   className = "text-xl text-gray-p00",
//   containerClassName = "bg-gray-50 rounded",
// }) => {
//   // If no details or empty array, return fallback
//   if (!details || details.length === 0) {
//     return <p className={className}>{fallbackText}</p>;
//   }

//   //  Extract text from blocks
//   const getBlockText = (block) => {
//     if (block._type === "block") {
//       return block.children?.map((child) => child.text).join(" ") || " ";
//     }
//     return "";
//   };

//   // Get all specifications as an array of strings
//   const specifications = details
//     .map((block) => getBlockText(block))
//     .filter((text) => text.trim().length > 0);

//   return (
//     <div className={containerClassName}>
//       <ul className="list-none space-y-2">
//         {specifications.map((spec, index) => (
//           <li key={index} className={`flex items-start ${className}`}>
//             <span className="text-gray-400 mr-2">•</span>
//             <span>{spec}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   // Option 1: Using PortableText to preserve exact formatting
//   // This is the preferred method if your Sanity blocks contain formatting
//   const components: Partial<PortableTextReactComponents> = {
//     block: {
//       normal: ({ children }) => (
//         <div className="whitespace-pre-line">{children}</div>
//       ),
//     },
//   };

//   return (
//     <div className={containerClassName}>
//       <div className={className}>
//         <PortableText value={details} components={components} />
//       </div>
//     </div>
//   );

//   // Option 2: Alternative method using direct text extraction while preserving line breaks
//   // Uncomment this and comment out the return statement above if you prefer this approach

//   /*
//   // Extract text from blocks while preserving line breaks
//   const getText = () => {
//     return details
//       .map(block => {
//         if (block._type === "block") {
//           return block.children?.map(child => child.text).join("");
//         }
//         return "";
//       })
//       .join("\n");
//   };

//   return (
//     <div className={containerClassName}>
//       <pre className={`${className} font-sans whitespace-pre-line`}>
//         {getText() || fallbackText}
//       </pre>
//     </div>
//   );
//   */
// };

// export default DetailsProse;
