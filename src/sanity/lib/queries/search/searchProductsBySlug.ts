import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchProductsBySlug = async (slug: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[_type == "product" && slug.current == $slug] | order(name asc) [0]    
    `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { slug }, //append wildcard for partial matches
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching product by ID", error);
  }
};
