import { Product } from "../../../sanity.types";
import ThreeItemGridItem from "../grid/three-items";

interface FeaturedProductsViewProps {
  products: Product[];
}

export async function FeaturedProductsView({
  products,
}: FeaturedProductsViewProps) {
  if (!products) return null;
  const firstProduct = products[0];
  const secondProduct = products[1];
  const thirdProduct = products[2];

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
