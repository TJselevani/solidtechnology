import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchItemBySlug = async (slug: string) => {
  const ITEM_SEARCH_QUERY_BY_SLUG = defineQuery(`
    *[_type in ["product", "accessory"] && slug.current == $slug] 
    | order(name asc) [0]    
  `);

  try {
    const item = await sanityFetch({
      query: ITEM_SEARCH_QUERY_BY_SLUG,
      params: { slug },
    });
    return item.data || null;
  } catch (error) {
    console.error("Error fetching item by Slug", error);
    return null;
  }
};
