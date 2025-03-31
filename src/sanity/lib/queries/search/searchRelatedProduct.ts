import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchRelatedProducts = async (
  productId: string,
  productName: string
) => {
  const RELATED_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product" && _id != $productId && stock > 0 
      || categories[]._ref in *[_type == "product" && _id == $productId].categories[]._ref
      || manufacturer._ref in *[_type == "product" && _id == $productId].manufacturer._ref
      || name match $productName + "*"
    ] 
    | order(_createdAt desc) [0..5]
  `);

  try {
    const result = await sanityFetch({
      query: RELATED_PRODUCTS_QUERY,
      params: { productId, productName },
    });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};
