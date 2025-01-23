// import { Button } from "@/components/ui/button";
import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/salesOffers/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <BlackFridayBanner />

      {/* Render all products */}
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
