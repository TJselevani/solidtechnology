import getAllAdvertisements from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementBanner from "./AdvertisementBanner";

interface AdvertisementViewProps {
  advertisements: Awaited<ReturnType<typeof getAllAdvertisements>>;
}
const AdvertisementView = ({ advertisements }: AdvertisementViewProps) => {
  console.log(advertisements.length, "advertisements found");

  return (
    <div className="flex-1 mx-auto gap-5 p-8 flex flex-col sm:flex-row items-center justify-center">
      {/* Render each Advert Banner */}

      {advertisements.map((advertisement) => (
        <AdvertisementBanner
          key={advertisement._id}
          advertisement={advertisement}
        />
      ))}
    </div>
  );
};

export default AdvertisementView;
