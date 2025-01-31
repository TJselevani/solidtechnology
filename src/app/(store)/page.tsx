import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import getAllProductAdverts from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementBanner from "@/components/banners/productsAdvertBanner";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 sec

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();
  const productAdvertisements = await getAllProductAdverts();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>> Rerendered the product page cache with ${products.length} products, ${categories.length} categories, ${manufacturers.length} manufacturers and ${productAdvertisements.length} product advertisements `
  );

  return (
    <div>
      {/* Render sales offers banner */}
      <BlackFridayBanner />

      <div className="flex-1 mx-auto flex  flex-col sm:flex-row items-center justify-center">
        {/* Render each Advert Banner */}
        {productAdvertisements.map((advertisement) => (
          <AdvertisementBanner
            key={advertisement._id}
            advertisement={{
              _id: advertisement._id,
              _type: advertisement._type,
              _createdAt: advertisement._createdAt,
              _updatedAt: advertisement._updatedAt,
              _rev: advertisement._rev,
              title: advertisement.title ?? "Untitled",
              active: advertisement.active ?? false,
              duration: advertisement.duration ?? 5,
              products:
                advertisement.products?.map((product) => ({
                  _id: product ?? "", // Ensure _id is always present
                  name: product.name ?? "Unknown Product",
                  price: product.price ?? 0,
                  image: product.image
                    ? {
                        asset: {
                          _ref: product.image.asset?.url ?? "",
                          _type: "reference",
                        },
                      }
                    : null,
                  _ref: product._id ?? "",
                  _type: "reference",
                  _weak: false,
                  _key: product._id,
                })) ?? [],
            }}
          />
        ))}
      </div>

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
