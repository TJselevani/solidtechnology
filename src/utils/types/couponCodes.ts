export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS2025: "XMAS2025",
  NY2020: "NY2020",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
