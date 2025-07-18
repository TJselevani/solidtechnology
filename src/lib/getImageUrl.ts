import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

// Converts a single image or an array of Sanity images to URLs
export function getImageUrls(
  source: SanityImageSource | SanityImageSource[] | undefined | null
): string[] {
  if (!source) return [];

  if (Array.isArray(source)) {
    return source.map((img) => builder.image(img).url());
  }

  return [builder.image(source).url()];
}
