import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  // Define the query with a parameter placeholder
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[ _type == "sale" && isActive == true && couponCode == $couponCode ] | order(validFrom desc)[0]
    `);

  try {
    // Fetch the active sale using the defined query and parameters
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: { couponCode }, // Pass couponCode as a parameter
    });

    // Return the data or null if no active sale is found
    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error("Error fetching active sale by Coupon Code", error);
    return null;
  }
};

export default getActiveSaleByCouponCode;
