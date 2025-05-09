import Link from "next/link";
import { GridTileImage } from "../grid/tile";
import { Accessory, Product } from "../../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { searchRelatedProducts } from "@/sanity/lib/queries/search/searchRelatedProduct";

type Items = Awaited<ReturnType<typeof searchRelatedProducts>>[0];
interface CarouselViewProps {
  products: Product[] | Accessory[] | Items[];
}

export async function ProductCarousel({ products }: CarouselViewProps) {
  // Collections that start with `hidden-*` are hidden from the search page.

  if (!products?.length || !products) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = products;

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product._id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.slug?.current}`}
              className="relative h-full w-full"
            >
              {product.image && (
                <GridTileImage
                  alt={product.name!}
                  label={{
                    title: product.name!,
                    amount: product.price!.toString(),
                    currencyCode: "kes",
                  }}
                  src={imageUrl(product.image).url()}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
