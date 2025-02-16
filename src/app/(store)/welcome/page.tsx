import { FeaturedProductsView } from "@/components/banners/FeaturedProductsView";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-static";

export const revalidate = 60; // revalidate at most every 60 sec

export default async function Welcome() {
  const products = await getAllProducts();

  return (
    <div>
      <FeaturedProductsView products={products} />

      {/* Get Started Button */}
      <div className="flex justify-center items-center my-4">
        <Link href="/home">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Get Started
          </button>
        </Link>
      </div>

      <Suspense>
        <ProductCarousel products={products} />
      </Suspense>
    </div>
  );
}
