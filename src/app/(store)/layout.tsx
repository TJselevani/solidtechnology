// app/layout.tsx
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
import SEOHead from "@/components/common/SEOHead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "NextGen Computing | Highly Flavoured Computing Services and Products in Kenya",
  description:
    "Buy High Quality PCs, Monitors, gaming rigs, Phones and laptops in Kenya. Discover performance, affordability, and fast delivery with NextGen Computing.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "NextGen Computing | High-Performance Technology",
    description:
      "High Quality gaming PCs, Monitors, laptops, Phones and accessories in Kenya.",
    url: "https://nextgencomputing.co.ke",
    images: [
      {
        url: "https://nextgencomputing.co.ke/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen Computing Hero Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Computing | High-Performance Technology",
    description:
      "High Quality gaming PCs, Monitors, laptops, Phones and accessories in Kenya.",
    images: ["https://nextgencomputing.co.ke/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nextgencomputing.co.ke", // or dynamic per-page
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
        <SEOHead />
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
