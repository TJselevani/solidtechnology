"use client";

import React, { useState } from "react";
import { Category, Brand, Accessory } from "../../../sanity.types";
import AccessoriesGrid from "./accessoriesGrid";
import BrandFilter from "../product/productBrand";

interface ProductViewProps {
  accessories: Accessory[];
  categories: Category[];
  brands: Brand[];
}

const AccessoriesView = ({
  accessories,
  categories,
  brands,
}: ProductViewProps) => {
  const [filteredProducts, setFilteredProducts] = useState(accessories);

  const handleFilterChange = (manufacturerRef: string) => {
    if (manufacturerRef === "") {
      setFilteredProducts(accessories); // Show all products
    } else {
      setFilteredProducts(
        accessories.filter(
          (accessory) => accessory.brand?._ref === manufacturerRef
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
      <BrandFilter manufacturers={brands} onFilterChange={handleFilterChange} />

      {/* Products */}
      <div className="w-full flex-1">
        <div>
          <AccessoriesGrid accessories={filteredProducts} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default AccessoriesView;
