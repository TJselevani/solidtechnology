import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchProductsBySlug = async (slug: string) => {
  const PRODUCT_SEARCH_QUERY_BY_SLUG = defineQuery(`
        *[_type == "product" && slug.current == $slug] | order(name asc) [0]    
    `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY_BY_SLUG,
      params: { slug },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by Slug", error);
    return null;
  }
};
