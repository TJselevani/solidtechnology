import ProductsView from "@/components/product/productsView";
import BlackFridayBanner from "@/components/banners/BlackFridayBanner";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { getAllProducts } from "@/sanity/lib/queries/products/getAllProducts";
import getAllAdvertisements from "@/sanity/lib/queries/banners/getProductAdverts";
import AdvertisementView from "@/components/banners/AdvertisementView";
import NavigationBar from "@/components/common/NavigationBar";
import { WHATSAPP_NUMBER } from "@/constants/constants";
import { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "NextGen Computing - Premium Computer Hardware Store Kenya",
  description:
    "Shop quality laptops, desktops, components & accessories. Best prices, fast delivery across Kenya. Intel, AMD, NVIDIA, HP, Dell & more.",
  keywords: [
    "computer hardware Kenya",
    "laptops Nairobi",
    "gaming PCs Kenya",
    "custom rigs Kenya",
    "PC parts Kenya",
    "computer accessories Kenya",
    "Intel Kenya",
    "AMD Kenya",
    "NVIDIA Kenya",
  ],
  openGraph: {
    title: "NextGen Computing - Premium Computer Hardware Store Kenya",
    description:
      "Shop quality laptops, desktops, components & accessories. Best prices, fast delivery across Kenya.",
    url: "https://nextgencomputing.co.ke",
    images: [
      {
        url: "/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen Computing Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Computing - Premium Computer Hardware Store Kenya",
    description:
      "Shop quality laptops, desktops, components & accessories. Best prices, fast delivery across Kenya.",
    images: ["/home-og.jpg"],
  },
};

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();
  const advertisements = await getAllAdvertisements();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>> Rerendered the product page cache with ${products.length} products, ${categories.length} categories, ${manufacturers.length} manufacturers and ${advertisements.length} product advertisements `
  );

  return (
    <div>
      {/* Local Business JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://nextgencomputing.co.ke",
            name: "NextGen Computing",
            description: "Premier computer hardware store in Kenya",
            url: "https://nextgencomputing.co.ke",
            telephone: { WHATSAPP_NUMBER },
            priceRange: "18,000 ksh - 245,000 ksh",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rasumal House, Tom Mboya Street",
              addressLocality: "Nairobi",
              addressRegion: "Nairobi County",
              postalCode: "00100",
              addressCountry: "KE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -1.2921,
              longitude: 36.8219,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "10:00",
                closes: "16:00",
              },
            ],
            sameAs: [
              "https://facebook.com/nextgencomputing",
              "https://instagram.com/nextgencomputing",
            ],
          }),
        }}
      />

      <NavigationBar />
      <BlackFridayBanner />
      <AdvertisementView advertisements={advertisements} />

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
