// app/products/[slug]/page.tsx
import { ProductCarousel } from "@/components/product/ProductCarousel";
import DetailsProse from "@/components/product/ProductDetails";
import Gallery from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { searchProductsBySlug } from "@/sanity/lib/queries/search/searchProductsBySlug";
import { searchRelatedProducts } from "@/sanity/lib/queries/search/searchRelatedProduct";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 sec

interface param {
  slug: string;
}

const ProductPage = async ({ params }: { params: Promise<param> }) => {
  const { slug } = await params;
  const product = await searchProductsBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>> Rerendered the product page cache for ${slug}`
  );

  if (!product) {
    return notFound();
  }

  const relatedProducts = await searchRelatedProducts(
    product._id,
    product.name!
  );

  console.log(relatedProducts.length);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Gallery product={product} />
        </div>
        <div>
          <ProductSpecs product={product} />
        </div>
      </div>

      <div>
        <DetailsProse details={product.details} />
      </div>

      <div className="my-8">
        <Suspense>
          <ProductCarousel products={relatedProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductPage;
