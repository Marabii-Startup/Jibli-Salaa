"use client";

import useAdditionalData from "@/components/Form/useAdditionalData";
import MapSelector from "@/components/Map/MapSelector";
import { AddressObject } from "@/interfaces/Map/AddressObject";

export default function FormMapInput() {
  const { addAdditionalData } = useAdditionalData();

  const handleLocationSelect = (loc: AddressObject) => {
    const formData = new FormData();
    formData.append("preferredPickupPlace", JSON.stringify(loc));
    addAdditionalData(formData);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Choose your preferred pickup place
      </h2>
      <MapSelector onLocationSelect={handleLocationSelect} />
    </>
  );
}
