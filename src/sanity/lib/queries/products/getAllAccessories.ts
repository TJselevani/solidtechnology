import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getAllAccessories = async () => {
  const ALL_ACCESSORIES_QUERY = defineQuery(`
        *[_type == "accessory"] | order(name asc)
    `);

  try {
    const accessories = await sanityFetch({ query: ALL_ACCESSORIES_QUERY });
    return accessories.data || [];
  } catch (error) {
    console.error("Error Fetching all accessories", error);
    return [];
  }
};
