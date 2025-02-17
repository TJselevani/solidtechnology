import ProductsView from "@/components/product/productsView";
import { getAllCategories } from "@/sanity/lib/queries/products/getAllCategories";
import { getAllManufacturers } from "@/sanity/lib/queries/products/getAllManufacturers";
import { searchProductsByCategory } from "@/sanity/lib/queries/search/searchProductsByCategory";

interface param {
  slug: string;
}

const categoryPage = async ({ params }: { params: Promise<param> }) => {
  const { slug } = await params;
  const products = await searchProductsByCategory(slug);
  const categories = await getAllCategories();
  const manufacturers = await getAllManufacturers();

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          {""} Collection
        </h1>
        <ProductsView
          products={products}
          categories={categories}
          manufacturers={manufacturers}
        />
      </div>
    </div>
  );
};

export default categoryPage;
