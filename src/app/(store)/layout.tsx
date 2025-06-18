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
import Head from "next/head";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGen Computing",
  description: "Highly Flavoured Computing Services and Products",
  icons: "/favicon.ico", // Path to your favicon.ico file
  other: {
    rel: "apple-touch-icon",
    url: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <Head>
          <title>NextGen Computing | High-Performance PCs in Kenya</title>
          <meta
            name="description"
            content="Buy High Quality PCs, gaming rigs, and laptops in Kenya. Discover performance, affordability, and fast delivery with NextGen Computing."
          />
          <meta
            property="og:title"
            content="NextGen Computing | High-Performance PCs"
          />
          <meta
            property="og:description"
            content="High Quality gaming PCs, laptops, and accessories in Kenya."
          />
          <meta
            property="og:image"
            content="https://nextgencomputing.co.ke/og-image.jpg"
          />
          <meta property="og:url" content="https://nextgencomputing.co.ke" />
          <meta name="facebook:card" content="summary_large_image" />
          <meta name="instagram:card" content="summary_large_image" />
          <meta name="twitter:card" content="summary_large_image" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body
          className={`${inter.className} bg-gray-50 text-black dark:bg-custom-black dark:text-black`}
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
