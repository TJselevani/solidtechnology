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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-light-background text-black dark:bg-custom-black dark:text-black">
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
