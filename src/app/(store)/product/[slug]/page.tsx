import { AccessorySpecs } from "@/components/accessories/accessoriesSpecs";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import DetailsProse from "@/components/product/ProductDetails";
import Gallery from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { urlFor } from "@/sanity/lib/image";
import { getImageUrls } from "@/lib/getImageUrl";
import { searchItemBySlug } from "@/sanity/lib/queries/search/searchItemBySlug";
import { searchRelatedProducts } from "@/sanity/lib/queries/search/searchRelatedProduct";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 60;

interface param {
  slug: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function portableTextToPlainText(portableText: any[]): string {
  return (
    portableText
      ?.map((block) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        block.children?.map((child: any) => child.text).join(" ")
      )
      .join("\n") ?? ""
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<param>;
}): Promise<Metadata> {
  const product = await searchItemBySlug((await params).slug);

  if (!product) return {};

  const firstImageUrl = product.galleryImages?.[0]?.asset
    ? urlFor(product.galleryImages[0]).url()
    : undefined;

  const plainDescription =
    portableTextToPlainText(product.details!)?.slice(0, 160) ||
    `Buy ${product.name} at NextGen Computing - Kenya's premier computer hardware store. Fast delivery, best prices, expert support.`;

  return {
    title: `${product.name} | NextGen Computing Kenya`,
    description: plainDescription,
    keywords: [
      product.name,
      product.category || "",
      "Kenya",
      "computer hardware",
      "gaming",
      "laptop",
      "PC",
      "Nairobi",
    ].filter((keyword): keyword is string => typeof keyword === "string"),
    alternates: {
      canonical: `https://nextgencomputing.co.ke/products/${(await params).slug}`,
    },
    openGraph: {
      title: `${product.name} | NextGen Computing Kenya`,
      description: plainDescription,
      url: `https://nextgencomputing.co.ke/products/${(await params).slug}`,
      type: "website",
      images: firstImageUrl
        ? [
            {
              url: firstImageUrl,
              width: 800,
              height: 600,
              alt: product.name ?? "Product Image",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | NextGen Computing Kenya`,
      description: plainDescription,
      images: firstImageUrl ? [firstImageUrl] : [],
    },
  };
}

const ProductPage = async ({ params }: { params: Promise<param> }) => {
  const { slug } = await params;
  const product = await searchItemBySlug(slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = await searchRelatedProducts(
    product._id,
    product.name!
  );

  // const mainImageUrl = getImageUrls(product.image)[0];
  const galleryImageUrls = getImageUrls(product.galleryImages);

  const plainDescription =
    portableTextToPlainText(product.details!)?.slice(0, 160) ||
    `Buy ${product.name} at NextGen Computing - Kenya's premier computer hardware store.`;

  return (
    <>
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: plainDescription,
            image: galleryImageUrls,
            brand: {
              "@type": "Brand",
              name: product.category ?? "NextGen Computing",
            },
            manufacturer: {
              "@type": "Organization",
              name: product.category ?? "NextGen Computing",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "KES",
              price: product.price,
              availability:
                product.stock && product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `https://nextgencomputing.co.ke/products/${product.slug}`,
              seller: {
                "@type": "Organization",
                name: "NextGen Computing",
              },
            },
            aggregateRating:
              product.stock && product.stock > 0
                ? {
                    "@type": "AggregateRating",
                    ratingValue: "4.5",
                    reviewCount: "10",
                  }
                : undefined,
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Gallery product={product} />
          </div>
          <div>
            {product._type == "product" ? (
              <ProductSpecs product={product} />
            ) : (
              <AccessorySpecs product={product} />
            )}
          </div>
        </div>

        <div>
          <DetailsProse details={product.details} />
        </div>

        <div className="my-8">
          <h2 className="bold py-4">Related products</h2>
          <Suspense>
            <ProductCarousel products={relatedProducts} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
