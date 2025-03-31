import { useState } from "react";
import { Brand } from "../../../sanity.types";

interface BrandFilterProps {
  manufacturers: Brand[];
  onFilterChange: (manufacturerRef: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  manufacturers,
  onFilterChange,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const handleFilterClick = (manufacturerRef: string) => {
    setSelectedManufacturer(manufacturerRef);
    onFilterChange(manufacturerRef);
  };

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 my-4">
      <button
        onClick={() => handleFilterClick("")}
        className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors duration-200 ${
          selectedManufacturer === ""
            ? "bg-primary text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      {manufacturers.map((manufacturer) => (
        <button
          key={manufacturer._id}
          onClick={() => handleFilterClick(manufacturer._id)}
          className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition-colors duration-200 ${
            selectedManufacturer === manufacturer._id
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {manufacturer.title}
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
