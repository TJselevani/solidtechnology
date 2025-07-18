import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: `https://nextgencomputing.co.ke/products/${product.slug?.current}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://nextgencomputing.co.ke",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://nextgencomputing.co.ke/products",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productUrls,
  ];
}
