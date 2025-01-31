import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import getAllProductAdverts from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementView from "@/components/banners/AdvertisementView";
// import { Advertisements } from "@/components/banners/AdvertisementBanner";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 sec

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();
  const advertisements = await getAllProductAdverts();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>> Rerendered the product page cache with ${products.length} products, ${categories.length} categories, ${manufacturers.length} manufacturers and ${advertisements.length} product advertisements `
  );

  return (
    <div>
      <BlackFridayBanner />

      <AdvertisementView advertisements={advertisements} />

      {/* Render all products */}
      <div className="flex flex-col items-center justify-top min-h-screen p-4">
        <ProductsView
          products={products}
          categories={categories}
          manufacturers={manufacturers}
        />
      </div>
    </div>
  );
}
