import Link from "next/link";
import { GridTileImage } from "./tile";
import { imageUrl } from "@/lib/imageUrl";
import { Product } from "../../../sanity.types";

export default function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.slug?.current}`}
      >
        {item.image && (
          <GridTileImage
            src={imageUrl(item.image).url()}
            fill
            sizes={
              size === "full"
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            priority={priority}
            alt={item.name as string}
            label={{
              position: size === "full" ? "center" : "bottom",
              title: item.name as string,
              amount: item.price?.toString() as string,
              currencyCode: "kes",
            }}
          />
        )}
      </Link>
    </div>
  );
}
