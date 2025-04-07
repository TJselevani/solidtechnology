import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const searchRelatedProducts = async (
  productId: string,
  productName: string
) => {
  // Query to get products from the same category
  const RELATED_ITEMS_BY_CATEGORY_QUERY = defineQuery(`
    *[_type in ["product", "accessory"] && references(*[_type == "category"]._id) && _id != $productId && stock > 0]
    | order(_createdAt desc) [0..10] // Get the first 10 products from the same category
  `);

  // Query to get products from the same manufaturer
  const RELATED_PRODUCTS_BY_MANUFACTURER_QUERY = defineQuery(`
    *[_type == "product" && references(*[_type == "manufacturer"]._id) && _id != $productId && stock > 0]
    | order(_createdAt desc) [0..10] // Get the first 10 products from the same manufacturer
  `);

  // Query to get accessories with the same brand
  const RELATED_ACCESSORIES_BY_BRAND_QUERY = defineQuery(`
    *[_type == "accessory" && references(*[_type == "brand"]._id) && _id != $productId && stock > 0]
    | order(_createdAt desc) [0..10] // Get the first 10 products from the same brand
  `);

  // Query to get products with similar names (starting with the same name)
  const RELATED_PRODUCTS_BY_NAME_QUERY = defineQuery(`
    *[_type == "product" && _id != $productId && stock > 0 && name match $productName + "*"]
    | order(_createdAt desc) [0..10] // Get 10 products with similar names
  `);

  // Query to get accessories with similar names (starting with the same name)
  const RELATED_ACCESSORIES_BY_NAME_QUERY = defineQuery(`
    *[_type == "accessory" && _id != $productId && stock > 0 && name match $productName + "*"]
    | order(_createdAt desc) [0..10] // Get 10 products with similar names
  `);

  try {
    const params: Record<string, string> = {
      productId,
      productName,
    };

    // Fetch related products by category
    const productsByCategory = await sanityFetch({
      query: RELATED_ITEMS_BY_CATEGORY_QUERY,
      params,
    });

    // Fetch related products by manufatcturer
    const productsByManufacturer = await sanityFetch({
      query: RELATED_PRODUCTS_BY_MANUFACTURER_QUERY,
      params,
    });

    // Fetch related products by brand
    const productsByBrand = await sanityFetch({
      query: RELATED_ACCESSORIES_BY_BRAND_QUERY,
      params,
    });

    // Fetch related products by name
    const productsByName = await sanityFetch({
      query: RELATED_PRODUCTS_BY_NAME_QUERY,
      params,
    });

    // Fetch related products by name
    const productsByName2 = await sanityFetch({
      query: RELATED_ACCESSORIES_BY_NAME_QUERY,
      params,
    });

    // Combine all results into one "ensemble"
    const ensemble = [
      ...productsByCategory.data,
      ...productsByManufacturer.data,
      ...productsByBrand.data,
      ...productsByName2.data,
      ...productsByName.data,
    ];

    // Remove duplicates based on product ID
    const uniqueProducts = Array.from(
      new Map(ensemble.map((item) => [item._id, item])).values()
    );

    // Return the final combined products
    return uniqueProducts;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};
