import ProductGrid from "@/components/product/productGrid";
import { searchProductsByName } from "@/sanity/lib/queries/search/searchProductsByName";
import React from "react";

interface params {
  query: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: params;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No products found for {query}
          </h1>
          <p>Try searching with different keyword</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
