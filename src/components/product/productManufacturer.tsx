import { useState } from "react";
import { Manufacturer } from "../../../sanity.types";
interface ManufacturerFilterProps {
  manufacturers: Manufacturer[]; // Expecting an object with _ref and name
  onFilterChange: (manufacturerRef: string) => void;
}

const ManufacturerFilter: React.FC<ManufacturerFilterProps> = ({
  manufacturers,
  onFilterChange,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const handleFilterClick = (manufacturerRef: string) => {
    setSelectedManufacturer(manufacturerRef);
    onFilterChange(manufacturerRef);
  };

  return (
    <div className="flex space-x-4 my-4">
      <button
        onClick={() => handleFilterClick("")}
        className={`px-4 py-2 rounded ${
          selectedManufacturer === "" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      {manufacturers.map((manufacturer) => (
        <button
          key={manufacturer._id} // Use _ref as the key
          onClick={() => handleFilterClick(manufacturer._id)} // Pass _ref here
          className={`px-4 py-2 rounded ${
            selectedManufacturer === manufacturer._id
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {manufacturer.name} {/* Display the manufacturer's name */}
        </button>
      ))}
    </div>
  );
};

export default ManufacturerFilter;
