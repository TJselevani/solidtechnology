import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

const getAllAdvertisements = async () => {
  // Fetch all active advertisements with nested product details
  const ACTIVE_ADVERTISEMENTS_QUERY = defineQuery(`
    *[_type == "advertisement"] | order(title desc){
      ...,
      products[]{
        _key,
        product->{
          _id,
          name,
          price,
          image
        }
      }
    }
  `);

  try {
    const banners = await sanityFetch({
      query: ACTIVE_ADVERTISEMENTS_QUERY,
    });

    return banners.data || [];
  } catch (error) {
    console.error("Error fetching active product banners", error);
    return [];
  }
};

export default getAllAdvertisements;
