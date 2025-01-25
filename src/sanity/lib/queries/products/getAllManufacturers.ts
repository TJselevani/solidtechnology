import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getAllManufacturers = async () => {
  const ALL_MANUFACTURERS_QUERY = defineQuery(`
    *[_type == "manufacturer"] | order(name asc)
  `);

  try {
    const manufacturers = await sanityFetch({ query: ALL_MANUFACTURERS_QUERY });
    return manufacturers.data || [];
  } catch (error) {
    console.error("Error fetching manufacturers", error);
    return [];
  }
};
