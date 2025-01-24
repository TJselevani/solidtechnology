import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getAllOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const ALL_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      products[]{
        ...,
        product->
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.error("Error fetching all orders", error);
    return [];
  }
};
