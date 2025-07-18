import "../../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/common/disableDraftMode";
import { VisualEditing } from "next-sanity";
import ThemeProviderWrapper from "@/components/theme/themeProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { WHATSAPP_NUMBER } from "@/constants/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGen Computing | Premium PCs, Laptops & Custom Rigs in Kenya",
  description:
    "Shop high-performance laptops, gaming PCs, custom-built rigs, monitors, and accessories at unbeatable prices in Kenya. Fast delivery, expert support, and top brands—NextGen Computing empowers your tech journey.",
  keywords: [
    "gaming PCs Kenya",
    "laptops Nairobi",
    "custom rigs Kenya",
    "computer hardware Kenya",
    "gaming laptops Kenya",
    "PC parts Nairobi",
    "computer accessories Kenya",
    "Nextgen Computing",
    "Next Gen Computing",
    "nextgencomputing",
  ],
  authors: [{ name: "NextGen Computing" }],
  creator: "NextGen Computing",
  publisher: "NextGen Computing",
  metadataBase: new URL("https://nextgencomputing.co.ke"),
  alternates: {
    canonical: "https://nextgencomputing.co.ke",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://nextgencomputing.co.ke",
    siteName: "NextGen Computing",
    title: "NextGen Computing | Your Trusted Tech Partner in Kenya",
    description:
      "Explore our wide range of tech products including gaming PCs, productivity laptops, accessories, and custom setups. Enjoy fast nationwide shipping, expert advice, and the latest from top global brands.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen Computing - Custom Rigs & Laptops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Computing | Power Up with High-Performance Tech",
    description:
      "Buy premium gaming and productivity computers in Kenya. NextGen Computing delivers top-tier products, reliable support, and custom solutions for every tech enthusiast.",
    images: ["/og-image.jpg"],
    site: "@NextGenComputing",
    creator: "@NextGenComputing",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <head>
          {/* Organization JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "NextGen Computing",
                url: "https://nextgencomputing.co.ke",
                logo: "https://nextgencomputing.co.ke/logo.png",
                description:
                  "Premier computer hardware store in Kenya offering gaming PCs, laptops, custom rigs, and accessories with fast delivery and expert support.",
                sameAs: [
                  "https://facebook.com/nextgencomputing",
                  "https://instagram.com/nextgencomputing",
                  "https://twitter.com/nextgencomputing",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: { WHATSAPP_NUMBER },
                  contactType: "Customer Service",
                  areaServed: "KE",
                  availableLanguage: ["English", "Swahili"],
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Rasumal House, Tom Mboya Street, ROOM 19",
                  addressLocality: "Nairobi",
                  addressRegion: "Nairobi County",
                  postalCode: "00100",
                  addressCountry: "KE",
                },
              }),
            }}
          />
        </head>
        <body
          className={`${inter.className} bg-gray-50 text-black dark:bg-custom-black dark:text-white`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <ThemeProviderWrapper>
            <main>
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProviderWrapper>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
