import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

const getAllProductAdverts = async () => {
  // Define the query to fetch active product banners and their products
  const ADVERT_BANNER_PRODUCTS_QUERY = defineQuery(`
    *[_type == "advertisement" && active == true]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      active,
      duration,
      products[]->{
        _id,
        name,
        price,
        image {
          asset->{
            _id,
            url
          }
        },
        ramCapacity,
        storage,
        cpuGeneration,
        cpuType,
        screenSize,
        weight,
        batteryLife,
        operatingSystem,
        categories[]->{
          _id,
          title
        }
      }
    }
  `);

  try {
    // Fetch the active product banners using the defined query
    const banners = await sanityFetch({
      query: ADVERT_BANNER_PRODUCTS_QUERY,
    });

    // Return the data or an empty array if no active banners are found
    return banners ? banners.data : [];
  } catch (error) {
    console.error("Error fetching active product banners", error);
    return [];
  }
};

export default getAllProductAdverts;
