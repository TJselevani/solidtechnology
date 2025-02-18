"use client";

import React, { useState } from "react";
import { Product, Category, Manufacturer } from "../../../sanity.types";
import ProductGrid from "./productGrid";
// import CategorySelector from "../category/categorySelector";
import ManufacturerFilter from "./productManufacturer";

interface ProductViewProps {
  products: Product[];
  categories: Category[];
  manufacturers: Manufacturer[];
}

const ProductsView = ({
  products,
  categories,
  manufacturers,
}: ProductViewProps) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (manufacturerRef: string) => {
    if (manufacturerRef === "") {
      setFilteredProducts(products); // Show all products
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product.manufacturer?._ref === manufacturerRef
        )
      );
    }
  };

  console.log(categories.length);

  return (
    <div className="w-full flex flex-col">
      {/* Categories */}
      {/* <div className="w-full sm:w-[200px]">
        <CategorySelector categories={categories} />
      </div> */}

      {/* Render Manufacturer Filter */}
      <ManufacturerFilter
        manufacturers={manufacturers}
        onFilterChange={handleFilterChange}
      />

      {/* Products */}
      <div className="w-full flex-1">
        <div>
          <ProductGrid products={filteredProducts} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
