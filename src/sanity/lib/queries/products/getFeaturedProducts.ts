import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getfeaturedProducts = async () => {
  const FEATURED_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc)
    `);

  try {
    const products = await sanityFetch({ query: FEATURED_PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.error("Error Fetching Feaured products", error);
    return [];
  }
};
