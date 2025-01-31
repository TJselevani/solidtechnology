import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

const getAllProductAdverts = async () => {
  // Fetch all fields automatically, including nested product details
  const ADVERT_BANNER_PRODUCTS_QUERY = defineQuery(`
    *[_type == "advertisement" && active == true]{
      ...,
      products[]-> { 
        ...,
        image {
          asset->{
            _id,
            url
          }
        }
      } // ✅ Fetch all product fields automatically
    }
  `);

  try {
    const banners = await sanityFetch({
      query: ADVERT_BANNER_PRODUCTS_QUERY,
    });

    return banners ? banners.data : [];
  } catch (error) {
    console.error("Error fetching active product banners", error);
    return [];
  }
};

export default getAllProductAdverts;
