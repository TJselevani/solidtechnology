import { FeaturedProductsView } from "@/components/banners/FeaturedProductsView";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import { Suspense } from "react";

export const dynamic = "force-static";

export const revalidate = 60; // revalidate at most every 60 sec

export default async function Welcome() {
  const products = await getAllProducts();

  return (
    <div>
      <FeaturedProductsView products={products} />
      <Suspense>
        <ProductCarousel products={products} />
      </Suspense>
    </div>
  );
}
