// app/products/[slug]/page.tsx
import { ProductDescription } from "@/components/product/ProductDescription";
import Gallery from "@/components/product/ProductGallery";
import { searchProductsBySlug } from "@/sanity/lib/queries/search/searchProductsBySlug";
import { notFound } from "next/navigation";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        {/*  Added grid layout */}
        <div>
          <Gallery product={product} />
        </div>
        <div>
          <ProductDescription product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
