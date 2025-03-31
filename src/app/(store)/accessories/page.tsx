import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import getAllAdvertisements from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementView from "@/components/banners/AdvertisementView";
import NavigationBar from "@/components/common/NavigationBar";
import { getAllAccessories } from "@/sanity/lib/queries/products/getAllAccessories";
import AccessoriesView from "@/components/accessories/accessoriesView";
import { getAllBrands } from "@/sanity/lib/queries/products/getAllBrands";

export const dynamic = "force-static";

export const revalidate = 60;

export default async function Home() {
  const accessories = await getAllAccessories();
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  const advertisements = await getAllAdvertisements();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>> Rerendered the product page cache with ${accessories.length} accessories, ${categories.length} categories, ${brands.length} manufacturers and ${advertisements.length} product advertisements `
  );

  return (
    <div>
      <NavigationBar />

      <BlackFridayBanner />

      <AdvertisementView advertisements={advertisements} />

      {/* Render all products */}
      <div className="flex flex-col items-center justify-top min-h-screen p-4">
        <AccessoriesView
          accessories={accessories}
          categories={categories}
          brands={brands}
        />
      </div>
    </div>
  );
}
