import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchProductsByCategory = async (categorySlug: string) => {
  const PRODUCT_SEARCH_QUERY_BY_CATEGORY = defineQuery(`
        *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc) 
    `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY_BY_CATEGORY,
      params: { categorySlug },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching product by Category", error);
    return [];
  }
};
