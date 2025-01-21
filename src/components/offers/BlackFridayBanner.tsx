import { COUPON_CODES } from "@/sanity/lib/salesOffers/couponCodes";
import getActiveSaleByCouponCode from "@/sanity/lib/salesOffers/getActiveSaleByCouponCode";
import React from "react";

export default async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if(!sale?.isActive){
    return null;
  }
  return <div>Black Friday Manner</div>;
}
