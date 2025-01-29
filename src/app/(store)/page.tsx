import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import getAllProductAdverts from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementBanner from "@/components/banners/productsAdvertBanner";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();
  const productAdvertisements = await getAllProductAdverts();

  return (
    <div>
      {/* Render sales offers banner */}
      <BlackFridayBanner />

      <div className="flex flex-row">
        {/* Render each Advert Banner */}
        {productAdvertisements.map((advertisement) => (
          <AdvertisementBanner
            key={advertisement._id}
            advertisement={{
              _id: "",
              _type: "advertisement",
              _createdAt: "",
              _updatedAt: "",
              _rev: "",
              title: advertisement.title ?? "Untitled",
              active: advertisement.active ?? false,
              duration: advertisement.duration ?? 5,
              products:
                advertisement.products?.map((product) => ({
                  _id: product._id ?? "", // Ensure _id is always present
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
