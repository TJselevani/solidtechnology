import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY_BY_NAME = defineQuery(`
        *[_type == "product" && name match $searchParam ] | order(name asc)    
    `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY_BY_NAME,
      params: { searchParam: `${searchParam}*` }, //append wildcard for partial matches 
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching product by name:", error);
    return [];
  }
};
