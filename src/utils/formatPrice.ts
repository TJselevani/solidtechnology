/**
 * Formats a number as a price string with commas for readability.
 * @param price - The price to format.
 * @param currency - Optional currency symbol (e.g., "$", "€").
 * @returns A string representing the formatted price.
 */
export function formatPriceFromInt(
  price: number,
  currency: string = ""
): string {
  // Create an instance of Intl.NumberFormat for formatting
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the number and prepend the currency symbol if provided
  return `${currency}${formatter.format(price)}`;
}
// console.log(formatPrice(1000)); // Output: "1,000.00"
// console.log(formatPrice(2500.5)); // Output: "2,500.50"
// console.log(formatPrice(987654321.99, "€")); // Output: "€987,654,321.99"

/**
 * Formats a string representing a number as a price string with commas for readability.
 * @param priceString - The price as a string to format.
 * @param currency - Optional currency symbol (e.g., "$", "€").
 * @returns A string representing the formatted price, or an error message if input is invalid.
 */
export function formatPriceFromString(
  priceString: string,
  currency: string = ""
): string {
  // Parse the string to a float
  const price = parseFloat(priceString);

  // Check if the parsed price is a valid number
  if (isNaN(price)) {
    return "Invalid price";
  }

  // Create an instance of Intl.NumberFormat for formatting
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the number and prepend the currency symbol if provided
  return `${currency}${formatter.format(price)}`;
}

// // Example usage:
// console.log(formatPriceFromString("1234567.89", "$")); // Output: "$1,234,567.89"
// console.log(formatPriceFromString("1000")); // Output: "1,000.00"
// console.log(formatPriceFromString("2500.5")); // Output: "2,500.50"
// console.log(formatPriceFromString("987654321.99", "€")); // Output: "€987,654,321.99"
// console.log(formatPriceFromString("invalid")); // Output: "Invalid price"
