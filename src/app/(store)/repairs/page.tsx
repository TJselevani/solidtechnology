import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import getAllAdvertisements from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementView from "@/components/banners/AdvertisementView";
import NavigationBar from "@/components/common/NavigationBar";

export const dynamic = "force-static";

export const revalidate = 60;

export default async function Home() {
  const advertisements = await getAllAdvertisements();

  return (
    <div>
      <NavigationBar />

      <BlackFridayBanner />

      <AdvertisementView advertisements={advertisements} />

      {/* Render all repair services */}
      <div className="flex flex-col items-center justify-top min-h-screen p-4"></div>
    </div>
  );
}
