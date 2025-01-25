import "../../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/common/disableDraftMode";
import { VisualEditing } from "next-sanity";
// import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ClerkProvider dynamic>
        <html lang="en">
          <body className="bg-custom-black text-black dark:bg-custom-black dark:text-white">
            {" "}
            {/* Adjust text color for dark mode */}
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
            <main>
              <Header />
              {children}
              <Footer />
            </main>
            <SanityLive />
          </body>
        </html>
      </ClerkProvider>
    // </ThemeProvider>
  );
}
