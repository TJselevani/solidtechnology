import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/salesOffers/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();

  return (
    <div>
      {/* Render sales offers banner */}
      <BlackFridayBanner />

      {/* Render all products */}
      <div className="flex flex-col items-center justify-top min-h-screen bg-custom-black p-4">
        <ProductsView products={products} categories={categories} manufacturers={manufacturers} />
      </div>
    </div>
  );
}
