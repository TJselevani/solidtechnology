import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchRelatedProducts = async (
  productId: string,
  productName: string
) => {
  // Split product name into keywords for better matching
  const keywords = productName.split(/\s+/).filter((k) => k.length > 2);

  // Construct dynamic keyword match conditions
  const keywordConditions = keywords
    .map((_, i) => `name match $keyword${i} + "*"`)
    .join(" || ");

  const RELATED_PRODUCTS_QUERY = defineQuery(`
    *[
      _type in ["product", "accessory"] &&
      _id != $productId &&
      stock > 0 &&
      (
        categories[]._ref in *[_type == "product" && _id == $productId].categories[]._ref ||
        manufacturer._ref in *[_type == "product" && _id == $productId].manufacturer._ref ||
        name match $productName + "*" 
        ${keywordConditions ? `|| ${keywordConditions}` : ""}
      )
    ] 
    | order(_createdAt desc) [0..5]
  `);

  try {
    // Construct params with productName and keywords
    const params: Record<string, string> = { productId, productName };
    keywords.forEach((keyword, index) => {
      params[`keyword${index}`] = keyword;
    });

    const result = await sanityFetch({ query: RELATED_PRODUCTS_QUERY, params });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

// import { defineQuery } from "next-sanity";
// import { sanityFetch } from "../../live";

// export const searchRelatedProducts = async (
//   productId: string,
//   productName: string
// ) => {
//   // Split the product name into keywords for better matching
//   const keywords = productName.split(/\s+/).filter((k) => k.length > 2);

//   const RELATED_PRODUCTS_QUERY = defineQuery(`
//     *[_type == "product" && _id != $productId && stock > 0 && (
//       categories[]._ref in *[_type == "product" && _id == $productId].categories[]._ref
//       || manufacturer._ref in *[_type == "product" && _id == $productId].manufacturer._ref
//       || name match $productName + "*"
//       ${keywords.length > 0 ? "|| " + keywords.map((_, i) => `name match $keyword${i} + "*"`).join(" || ") : ""}
//     )]
//     | order(_createdAt desc) [0..5]
//   `);

//   try {
//     // Create params object with proper typing
//     const params: {
//       productId: string;
//       productName: string;
//       [key: string]: string; // This allows for dynamic properties
//     } = {
//       productId,
//       productName,
//     };

//     // Add individual keywords to params
//     keywords.forEach((keyword, index) => {
//       params[`keyword${index}`] = keyword;
//     });

//     const result = await sanityFetch({
//       query: RELATED_PRODUCTS_QUERY,
//       params,
//     });
//     return result.data || [];
//   } catch (error) {
//     console.error("Error fetching related products:", error);
//     return [];
//   }
// };
